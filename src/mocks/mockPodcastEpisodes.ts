import { Episode } from "@/types";

export const MOCK_PODCAST_EPISODES: Episode[] = [
    {
      trackId: 1000123456789,
      trackName: 'Episode 101 | "The Rise of AI"',
      trackTimeMillis: 13400000,
      description:
        'In this episode, Alex and Taylor discuss the rapid advancements in AI technology, its impact on the software industry, and what the future holds for developers and tech enthusiasts.',
      episodeUrl:
        'https://traffic.libsyn.com/secure/codingchronicles/Coding_Chronicles_101.mp3?dest-id=1234567',
      kind: 'podcast-episode',
      releaseDate: '2024-01-01T08:00:00Z',
    },
    {
      trackId: 1000987654321,
      trackName: 'Episode 102 | "Breaking into Tech"',
      trackTimeMillis: undefined,
      description:
        'Taylor interviews several industry veterans to uncover the secrets to successfully breaking into the tech industry. They discuss career paths, important skills, and the importance of networking.',
      episodeUrl:
        'https://traffic.libsyn.com/secure/codingchronicles/Coding_Chronicles_102.mp3?dest-id=1234567',
      kind: 'podcast-episode',
      releaseDate: '2024-01-08T08:00:00Z',
    },
];
