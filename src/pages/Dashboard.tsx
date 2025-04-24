
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { analyzeSocialAccount } from "../services/apiService";

const Dashboard = () => {
  const [accountId, setAccountId] = useState("");
  const [platform, setPlatform] = useState<"instagram" | "tiktok">("instagram");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountId) {
      toast({
        title: "Error",
        description: "Please enter a social media account ID",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const result = await analyzeSocialAccount(accountId, platform);
      
      // Store the result in sessionStorage to pass to results page
      sessionStorage.setItem("analysisResult", JSON.stringify(result));
      
      navigate("/results");
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-primary mb-6">Account Analysis</h1>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Analyze Social Media Account</CardTitle>
              <CardDescription>
                Enter the account ID and platform to detect bot followers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAnalyze} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="account-id">Account ID</Label>
                  <Input
                    id="account-id"
                    placeholder="Enter TikTok or Instagram account ID"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <RadioGroup value={platform} onValueChange={(value) => setPlatform(value as "instagram" | "tiktok")} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="instagram" id="instagram" />
                      <Label htmlFor="instagram">Instagram</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tiktok" id="tiktok" />
                      <Label htmlFor="tiktok">TikTok</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Analyzing..." : "Analyze Account"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How it works</CardTitle>
              <CardDescription>
                Our bot detection system analyzes followers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <p>
                  <span className="font-medium">1. Enter Account ID</span>
                  <br />
                  Provide the username of the TikTok or Instagram account you want to analyze.
                </p>
                <p>
                  <span className="font-medium">2. Choose Platform</span>
                  <br />
                  Select whether the account is on Instagram or TikTok.
                </p>
                <p>
                  <span className="font-medium">3. Get Results</span>
                  <br />
                  Our system will analyze the followers and provide detailed bot detection statistics.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
