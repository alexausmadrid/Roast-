import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState, User } from '@/types';
import { mockUsers } from '@/constants/mockData';

const useAuthStore = create<AuthState & {
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
}>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Find user with matching email (mock authentication)
          const user = mockUsers.find(u => u.email === email);
          
          if (!user) {
            throw new Error("Invalid email or password");
          }
          
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : "An error occurred", 
            isLoading: false 
          });
        }
      },
      
      signup: async (username: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check if email already exists
          if (mockUsers.some(u => u.email === email)) {
            throw new Error("Email already in use");
          }
          
          // Create new user (in a real app, this would be an API call)
          const newUser: User = {
            id: String(mockUsers.length + 1),
            username,
            email,
            avatar: `https://ui-avatars.com/api/?name=${username}&background=random`,
          };
          
          set({ user: newUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : "An error occurred", 
            isLoading: false 
          });
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : "An error occurred", 
            isLoading: false 
          });
        }
      },
      
      updateUser: async (userData: Partial<User>) => {
        set({ isLoading: true });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set(state => ({
            user: state.user ? { ...state.user, ...userData } : null,
            isLoading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : "An error occurred", 
            isLoading: false 
          });
        }
      },
    }),
    {
      name: 'roastmaster-auth',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;