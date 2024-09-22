const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const CORS_PROXY = process.env.NEXT_PUBLIC_CORS_PROXY;
export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const getTopPodcastsUrl = ({
  limit = 100,
  genre = 1310,
}: { limit?: number; genre?: number } = {}): string =>
  `${BASE_URL}us/rss/toppodcasts/limit=${limit}/genre=${genre}/json`;

export const getPodcastDetailUrl = ({
  id,
  limit = 20,
}: {
  id: string;
  limit?: number;
}): string =>
  `${BASE_URL}lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=${limit}`;

export const withCORSProxy = (url: string) =>
  `${CORS_PROXY}${encodeURIComponent(url)}`;
