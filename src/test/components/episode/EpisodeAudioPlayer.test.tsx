import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MOCK_PODCAST_EPISODES } from "@/mocks"; // Importa tus mocks
import { LoadingContext } from "@/context/LoadingContext";
import { usePodcastEpisodes } from "@/services/itunes.service"; // Importa el hook que vas a mockear
import EpisodeAudioPlayer from "@/components/episode/EpisodeAudioPlayer";

const queryClient = new QueryClient();

jest.mock("../../../services/itunes.service", () => ({
    usePodcastEpisodes: jest.fn(),
}));

const [mockPodcastEpisode] = MOCK_PODCAST_EPISODES;

describe("EpisodeAudioPlayer", () => {
  const mockPodcastId = "12345";

  test("renders episode details when data is available", () => {
    (usePodcastEpisodes as jest.Mock).mockReturnValue({
      data: MOCK_PODCAST_EPISODES,
      isFetching: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <LoadingContext.Provider value={{ setLoadingState: jest.fn(), loading: true }}>
          <EpisodeAudioPlayer
            podcastId={mockPodcastId}
            episodeId={mockPodcastEpisode.trackId.toString()}
          />
        </LoadingContext.Provider>
      </QueryClientProvider>
    );

    expect(screen.getByText(mockPodcastEpisode.trackName)).toBeInTheDocument();

    const regex = new RegExp(mockPodcastEpisode.description.substring(0, 50));
    expect(screen.getByText(regex)).toBeInTheDocument();

    const source = screen.getByTestId("episode-source");
    expect(source.getAttribute("src")).toEqual(expect.stringContaining("Coding_Chronicles_101.mp3"));
  });

  test("does not render episode details when data is not available", () => {
    (usePodcastEpisodes as jest.Mock).mockReturnValue({
      data: [],
      isFetching: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <LoadingContext.Provider value={{ setLoadingState: jest.fn(), loading: true }}>
          <EpisodeAudioPlayer podcastId={mockPodcastId} episodeId={"99999"} />
        </LoadingContext.Provider>
      </QueryClientProvider>
    );

    expect(screen.queryByText(mockPodcastEpisode.trackName)).toBeNull();
    expect(screen.queryByTestId("episode-audio-player")).toBeNull();
  });
});
