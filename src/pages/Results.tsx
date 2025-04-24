
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

interface BotAnalysisResult {
  accountId: string;
  platform: "instagram" | "tiktok";
  totalFollowers: number;
  botFollowers: number;
  botPercentage: number;
  riskLevel: "low" | "medium" | "high";
  suspiciousAccounts: {
    username: string;
    botProbability: number;
    createdDate: string;
    activityScore: number;
  }[];
}

const Results = () => {
  const [result, setResult] = useState<BotAnalysisResult | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Get analysis result from sessionStorage
    const savedResult = sessionStorage.getItem("analysisResult");
    if (savedResult) {
      try {
        setResult(JSON.parse(savedResult));
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load analysis results",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    } else {
      // No result found, redirect back to dashboard
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, toast]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-lg">Loading analysis results...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary">Analysis Results</h1>
            <p className="text-muted-foreground">
              {result.platform === "instagram" ? "Instagram" : "TikTok"} account: {result.accountId}
            </p>
          </div>
          <Button onClick={() => navigate("/dashboard")} className="mt-4 md:mt-0">
            New Analysis
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Bot Followers</CardTitle>
              <CardDescription>
                Bot followers as percentage of total followers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {result.botPercentage.toFixed(1)}%
              </div>
              <Progress value={result.botPercentage} className="mt-2" />
              <div className="mt-4 text-sm text-muted-foreground">
                {result.botFollowers.toLocaleString()} out of {result.totalFollowers.toLocaleString()} total followers
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>Overall account risk level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`text-4xl font-bold capitalize ${getRiskColor(result.riskLevel)}`}>
                {result.riskLevel}
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                {result.riskLevel === "high" 
                  ? "Your account has a high percentage of bot followers which may affect engagement metrics."
                  : result.riskLevel === "medium"
                    ? "Your account has a moderate number of bot followers."
                    : "Your account appears to have a low number of bot followers."}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Account Stats</CardTitle>
              <CardDescription>Follower statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Followers</span>
                  <span className="font-medium">{result.totalFollowers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bot Followers</span>
                  <span className="font-medium">{result.botFollowers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Real Followers</span>
                  <span className="font-medium">{(result.totalFollowers - result.botFollowers).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Suspicious Accounts</CardTitle>
            <CardDescription>
              Accounts with high probability of being bots
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Username</th>
                    <th className="text-left py-3 px-4 font-medium">Bot Probability</th>
                    <th className="text-left py-3 px-4 font-medium">Created Date</th>
                    <th className="text-left py-3 px-4 font-medium">Activity Score</th>
                  </tr>
                </thead>
                <tbody>
                  {result.suspiciousAccounts.map((account, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4">{account.username}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span className={account.botProbability > 75 ? "text-red-500" : account.botProbability > 50 ? "text-yellow-500" : "text-green-500"}>
                            {account.botProbability.toFixed(1)}%
                          </span>
                          <div className="ml-2 w-16 bg-secondary rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${account.botProbability > 75 ? "bg-red-500" : account.botProbability > 50 ? "bg-yellow-500" : "bg-green-500"}`}
                              style={{ width: `${account.botProbability}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{account.createdDate}</td>
                      <td className="py-3 px-4">{account.activityScore.toFixed(1)}/10</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              These accounts have been flagged based on various signals including activity patterns, profile characteristics, and engagement metrics.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Results;
