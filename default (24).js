import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppState, Challenge, Group, Roast } from '@/types';
import { mockGroups, mockChallenges, mockRoasts, mockSituations } from '@/constants/mockData';

const useAppStore = create<AppState & {
  setCurrentGroup: (groupId: string | null) => void;
  setCurrentChallenge: (challengeId: string | null) => void;
  addGroup: (group: Group) => void;
  joinGroup: (groupId: string, userId: string) => void;
  leaveGroup: (groupId: string, userId: string) => void;
  addRoast: (roast: Omit<Roast, 'id' | 'createdAt'>) => string;
  voteForRoast: (roastId: string, userId: string) => void;
  createChallenge: (groupId: string) => string;
  resetStore: () => void;
}>()(
  persist(
    (set, get) => ({
      groups: mockGroups,
      challenges: mockChallenges,
      roasts: mockRoasts,
      situations: mockSituations,
      currentGroup: null,
      currentChallenge: null,

      setCurrentGroup: (groupId) => {
        set({ currentGroup: groupId });
      },

      setCurrentChallenge: (challengeId) => {
        set({ currentChallenge: challengeId });
      },

      addGroup: (group) => {
        set((state) => ({
          groups: [...state.groups, group],
        }));
      },

      joinGroup: (groupId, userId) => {
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId
              ? { ...group, members: [...group.members, userId] }
              : group
          ),
        }));
      },

      leaveGroup: (groupId, userId) => {
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId
              ? { ...group, members: group.members.filter((id) => id !== userId) }
              : group
          ),
        }));
      },

      addRoast: (roastData) => {
        const newRoast: Roast = {
          id: String(Date.now()),
          createdAt: new Date().toISOString(),
          votes: [],
          ...roastData,
        };

        set((state) => ({
          roasts: [...state.roasts, newRoast],
          challenges: state.challenges.map((challenge) =>
            challenge.id === roastData.situationId
              ? { ...challenge, roasts: [...challenge.roasts, newRoast.id] }
              : challenge
          ),
        }));

        return newRoast.id;
      },

      voteForRoast: (roastId, userId) => {
        set((state) => ({
          roasts: state.roasts.map((roast) =>
            roast.id === roastId
              ? {
                  ...roast,
                  votes: roast.votes.includes(userId)
                    ? roast.votes
                    : [...roast.votes, userId],
                }
              : roast
          ),
        }));
      },

      createChallenge: (groupId) => {
        const { situations } = get();
        const randomSituation = situations[Math.floor(Math.random() * situations.length)];
        
        const newChallenge: Challenge = {
          id: String(Date.now()),
          situationId: randomSituation,
          groupId,
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
          roasts: [],
        };

        set((state) => ({
          challenges: [...state.challenges, newChallenge],
        }));

        return newChallenge.id;
      },

      resetStore: () => {
        set({
          groups: mockGroups,
          challenges: mockChallenges,
          roasts: mockRoasts,
          situations: mockSituations,
          currentGroup: null,
          currentChallenge: null,
        });
      },
    }),
    {
      name: 'roastmaster-app',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAppStore;