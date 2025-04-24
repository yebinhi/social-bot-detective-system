
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

// Simulated API calls
export const analyzeSocialAccount = async (accountId: string, platform: "instagram" | "tiktok"): Promise<BotAnalysisResult> => {
  // In a real app, this would be an API call to your FastAPI backend
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate random data for demo
  const totalFollowers = Math.floor(Math.random() * 10000) + 1000;
  const botFollowers = Math.floor(Math.random() * (totalFollowers / 2));
  const botPercentage = (botFollowers / totalFollowers) * 100;
  
  // Generate random suspicious accounts
  const suspiciousAccounts = Array.from({ length: Math.floor(Math.random() * 5) + 3 }, (_, i) => ({
    username: `suspicious_user_${i + 1}`,
    botProbability: Math.random() * 100,
    createdDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
    activityScore: Math.random() * 10
  }));
  
  const riskLevel = botPercentage > 30 ? "high" : botPercentage > 15 ? "medium" : "low";
  
  return {
    accountId,
    platform,
    totalFollowers,
    botFollowers,
    botPercentage,
    riskLevel,
    suspiciousAccounts
  };
};
