import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { LoadingContext } from "@/context/LoadingContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MOCK_PODCASTS } from "@/mocks";
import PodcastDetailsCard from "@/components/podcast/PodcastDetailsCard";

const queryClient = new QueryClient();

jest.mock("../../../services/itunes.service", () => ({
  useTopPodcasts: () => ({
    data: MOCK_PODCASTS,
    isFetching: false,
  }),
}));

describe("PodcastDetailsCard", () => {
  it("should render the podcast details correctly", async () => {
    let loading = true;
    const setLoadingState = jest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <LoadingContext.Provider value={{ setLoadingState, loading }}>
          <PodcastDetailsCard podcastId="9876543210" />
        </LoadingContext.Provider>
      </QueryClientProvider>
    );

    const [podcast] = MOCK_PODCASTS;
    
    expect(screen.getByAltText(`${podcast.name}`)).toBeInTheDocument();
    expect(screen.getByText(podcast.name)).toBeInTheDocument();
    expect(screen.getByText(podcast.artist)).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });
});
