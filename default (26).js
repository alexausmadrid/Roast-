export interface User {
    id: string;
    username: string;
    avatar: string;
    email: string;
  }
  
  export interface Group {
    id: string;
    name: string;
    members: string[];
    createdBy: string;
    createdAt: string;
    score: number;
    lastActive: string;
  }
  
  export interface Roast {
    id: string;
    userId: string;
    groupId: string;
    situationId: string;
    content: string;
    votes: string[];
    createdAt: string;
  }
  
  export interface Challenge {
    id: string;
    situationId: string;
    groupId: string;
    createdAt: string;
    expiresAt: string;
    roasts: string[];
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface AppState {
    groups: Group[];
    challenges: Challenge[];
    roasts: Roast[];
    situations: string[];
    currentGroup: string | null;
    currentChallenge: string | null;
  }