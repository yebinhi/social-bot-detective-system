
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Check } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

const Subscription = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      toast("Please login to subscribe", {
        description: "You need to be logged in to access subscription features",
      });
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSubscription = async (plan: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would call a Stripe checkout session creation API
      toast.success(`Subscription process started for ${plan} plan`, {
        description: "You'll be redirected to the payment page shortly.",
      });
      
      // Simulate redirect to payment page
      setTimeout(() => {
        toast("Payment successful!", { 
          description: "Thank you for subscribing to Social Bot Detective." 
        });
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Subscription failed", { 
        description: "There was an error processing your subscription request." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary">Choose Your Plan</h1>
          <p className="mt-4 text-muted-foreground">
            Upgrade to unlock advanced bot detection features
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Basic Plan */}
          <Card className="flex flex-col border-2 hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle>Basic</CardTitle>
              <CardDescription>For personal use</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$9.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>Up to 5 account scans per month</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>Basic bot detection</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>Email reports</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleSubscription("Basic")}
                disabled={isLoading}
              >
                Subscribe to Basic
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="flex flex-col border-2 border-primary relative hover:shadow-lg transition-all">
            <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
              Popular
            </div>
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <CardDescription>For professionals</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$24.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>Unlimited account scans</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>Advanced bot detection algorithms</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>Detailed analytics dashboard</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleSubscription("Premium")}
                disabled={isLoading}
              >
                Subscribe to Premium
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="flex flex-col border-2 hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For businesses</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$49.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>Unlimited team accounts</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>Enterprise-grade API access</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>Custom bot detection rules</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  <span>Advanced security features</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleSubscription("Enterprise")}
                disabled={isLoading}
              >
                Subscribe to Enterprise
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
