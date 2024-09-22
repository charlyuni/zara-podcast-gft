import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { usePodcastEpisodes } from "@/services/itunes.service";
import { LoadingContext } from "@/context/LoadingContext";
import { MOCK_PODCAST_EPISODES } from "@/mocks";
import EpisodesList from "@/components/episode/EpisodesList";

jest.mock("../../../services/itunes.service", () => ({
  usePodcastEpisodes: jest.fn(),
}));

const setLoadingState = jest.fn();

const renderComponent = (podcastId: string) => {
  const loading = true;
  render(
    <LoadingContext.Provider value={{ setLoadingState, loading }}>
      <EpisodesList podcastId={podcastId} />
    </LoadingContext.Provider>
  );
};

describe("EpisodesList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with episodes", () => {
    (usePodcastEpisodes as jest.Mock).mockReturnValue({
      data: MOCK_PODCAST_EPISODES,
      isFetching: false,
    });

    renderComponent("12345");

    expect(screen.getByText(`Items: ${MOCK_PODCAST_EPISODES.length}`)).toBeInTheDocument();

    MOCK_PODCAST_EPISODES.forEach((episode) => {
      expect(screen.getByText(episode.trackName)).toBeInTheDocument();
    });

    expect(setLoadingState).toHaveBeenCalledWith(false);
  });

  test("renders null when there are no episodes", () => {
    (usePodcastEpisodes as jest.Mock).mockReturnValue({
      data: [],
      isFetching: false,
    });

    renderComponent("12345");

    expect(screen.queryByTestId("generic-list")).not.toBeInTheDocument();
    expect(setLoadingState).toHaveBeenCalledWith(false);
  });

  test("sets loading state when fetching episodes", () => {
    (usePodcastEpisodes as jest.Mock).mockReturnValue({
      data: [],
      isFetching: true,
    });

    renderComponent("12345");

    expect(setLoadingState).toHaveBeenCalledWith(true);
    expect(screen.queryByTestId("generic-list")).not.toBeInTheDocument();
  });
});
