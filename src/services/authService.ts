
interface User {
  email: string;
  id: string;
}

// Simulated user database - made persistent through localStorage
let users: { email: string; password: string; id: string }[] = [];

// Load existing users from localStorage on initialization
try {
  const storedUsers = localStorage.getItem("authUsers");
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }
} catch (error) {
  console.error("Failed to load users from localStorage:", error);
}

// Helper function to save users to localStorage
const saveUsers = () => {
  try {
    localStorage.setItem("authUsers", JSON.stringify(users));
  } catch (error) {
    console.error("Failed to save users to localStorage:", error);
  }
};

export const register = async (email: string, password: string): Promise<User> => {
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    throw new Error("User already exists");
  }
  
  // In a real app, we would call an API here
  const newUser = { email, password, id: Math.random().toString(36).substring(2, 15) };
  users.push(newUser);
  saveUsers(); // Save to localStorage
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const login = async (email: string, password: string): Promise<User> => {
  // In a real app, we would call an API here
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error("Invalid credentials");
  }
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const logout = (): void => {
  // In a real app, we would call an API here
  // Just clear local storage in the AuthContext
};
