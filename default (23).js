export const mockUsers = [
    {
      id: '1',
      username: 'Alex',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      email: 'alex@example.com',
    },
    {
      id: '2',
      username: 'Taylor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      email: 'taylor@example.com',
    },
    {
      id: '3',
      username: 'Jordan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      email: 'jordan@example.com',
    },
    {
      id: '4',
      username: 'Casey',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      email: 'casey@example.com',
    },
    {
      id: '5',
      username: 'Morgan',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      email: 'morgan@example.com',
    },
  ];
  
  export const mockGroups = [
    {
      id: '1',
      name: 'Savage Squad',
      members: ['1', '2', '3', '4'],
      createdBy: '1',
      createdAt: new Date().toISOString(),
      score: 30,
      lastActive: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Roast Masters',
      members: ['2', '3', '4', '5'],
      createdBy: '2',
      createdAt: new Date().toISOString(),
      score: 70,
      lastActive: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Comedy Club',
      members: ['1', '2', '3', '4', '5'],
      createdBy: '3',
      createdAt: new Date(Date.now() - 86400000).toISOString(), // yesterday
      score: 14,
      lastActive: new Date(Date.now() - 86400000).toISOString(),
    },
  ];
  
  export const mockSituations = [
    "When your friend shows up wearing the same outfit they've worn for 5 days straight",
    "When someone takes a selfie with every meal they eat",
    "When your friend says they're 'on their way' but you know they haven't left home yet",
    "When someone brings a guitar to a party and starts playing 'Wonderwall'",
    "When your friend claims they're a fitness guru after going to the gym once",
    "When someone talks about their crypto investments for the 100th time",
    "When your friend posts motivational quotes but never follows their own advice",
    "When someone watches one episode of a show and suddenly becomes an expert",
    "When your friend cancels plans last minute for the third time this month",
    "When someone uses a filter that makes them look nothing like themselves",
  ];
  
  export const mockRoasts = [
    {
      id: '1',
      userId: '1',
      groupId: '1',
      situationId: '1',
      content: "I thought your clothes were developing separation anxiety, but now I see they're in a committed relationship with your body odor.",
      votes: ['3', '4'],
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      userId: '2',
      groupId: '1',
      situationId: '1',
      content: "Is your washing machine broken or is this a new strategy to be recognized from a distance?",
      votes: ['1'],
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      userId: '3',
      groupId: '1',
      situationId: '1',
      content: "Your outfit is so consistent it should run for office.",
      votes: [],
      createdAt: new Date().toISOString(),
    },
  ];
  
  export const mockChallenges = [
    {
      id: '1',
      situationId: '1',
      groupId: '1',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
      roasts: ['1', '2', '3'],
    },
  ];