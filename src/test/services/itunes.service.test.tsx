import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import {
  fetchPodcastEpisodes,
  fetchTopPodcasts,
  usePodcastEpisodes,
} from "@/services/itunes.service";
import { MOCK_PODCAST_EPISODES } from "@/mocks";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("itunes.service", () => {
  const originalConsoleError = console.error;

  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  describe("fetchPodcastEpisodes", () => {
    test("should fetch podcast episodes and return the extracted data", async () => {
      const id = "12345";
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          results: MOCK_PODCAST_EPISODES,
        }),
      };

      global.fetch = jest.fn().mockResolvedValueOnce(mockResponse);
      const { result } = renderHook(() => usePodcastEpisodes(id), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(global.fetch).toHaveBeenCalledWith(
        `https://api.allorigins.win/raw?url=https%3A%2F%2Fitunes.apple.com%2Flookup%3Fid%3D12345%26media%3Dpodcast%26entity%3DpodcastEpisode%26limit%3D20`
      );

      expect(result.current.data).toEqual(MOCK_PODCAST_EPISODES);
    });

    test("should handle network errors gracefully", async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: "Not Found",
        json: jest.fn().mockResolvedValue({}),
      };
      global.fetch = jest.fn().mockResolvedValueOnce(mockResponse);

      await expect(fetchTopPodcasts()).rejects.toThrow(
        "Network response was not ok."
      );
    });

    test("should return an empty array when there are no episodes", async () => {
      const id = "12345";
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          results: [],
        }),
      };

      global.fetch = jest.fn().mockResolvedValueOnce(mockResponse);

      const episodes = await fetchPodcastEpisodes(id);
      expect(episodes).toEqual([]);
    });
  });

  describe("fetchTopPodcasts", () => {
    test("should fetch top podcasts and return the extracted data", async () => {
      const mockPodcasts = [
        {
          id: { attributes: { "im:id": "123" } },
          "im:name": { label: "Test Podcast" },
          "im:artist": { label: "Test Artist" },
          "im:image": [{ label: "image_url" }],
          summary: { label: "A great podcast" },
        },
      ];
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          feed: { entry: mockPodcasts },
        }),
      };

      global.fetch = jest.fn().mockResolvedValueOnce(mockResponse);

      const result = await fetchTopPodcasts();

      expect(global.fetch).toHaveBeenCalledWith(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(
          `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`
        )}`
      );

      expect(result).toEqual([
        {
          id: "123",
          name: "Test Podcast",
          artist: "Test Artist",
          imageUrl: "image_url",
          summary: "A great podcast",
        },
      ]);
    });

    test("should handle network errors gracefully", async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      await expect(fetchTopPodcasts()).rejects.toThrow(
        "Cannot read properties of undefined (reading 'ok')"
      );
    });

    test("should return an empty array when there are no podcasts", async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          feed: { entry: [] },
        }),
      };

      global.fetch = jest.fn().mockResolvedValueOnce(mockResponse);

      const podcasts = await fetchTopPodcasts();
      expect(podcasts).toEqual([]);
    });
  });
});
