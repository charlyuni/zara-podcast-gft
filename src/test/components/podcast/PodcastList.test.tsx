import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useTopPodcasts } from "@/services/itunes.service";
import { LoadingContext } from "@/context/LoadingContext";
import { MOCK_PODCASTS } from "@/mocks";
import { PodcastCard } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; 
import { PodcastList } from "@/components/podcast/PodcastList";

jest.mock("../../../services/itunes.service", () => ({
  useTopPodcasts: jest.fn(),
}));

// Mock de useRouter para el App Router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(), 
}));

const mockSetResults = jest.fn();
const setLoadingState = jest.fn();
const mockRouterPush = jest.fn(); 

const renderComponent = (filter = "") => {
  let loading = true;

  render(
    <LoadingContext.Provider value={{ setLoadingState, loading }}>
      <PodcastList filter={filter} setResults={mockSetResults} />
    </LoadingContext.Provider>
  );
};

describe("PodcastList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush, // Mock de router.push
    });
  });

  test("renders correctly with data", () => {
    (useTopPodcasts as jest.Mock).mockReturnValue({
      data: MOCK_PODCASTS,
      isFetching: false,
    } as UseQueryResult<PodcastCard[], Error>);

    renderComponent();

    // Verifica que los podcasts se rendericen
    MOCK_PODCASTS.forEach((podcast) => {
      expect(screen.getByText(podcast.name.toUpperCase())).toBeInTheDocument();
      expect(screen.getByText(`Author: ${podcast.artist}`)).toBeInTheDocument();
    });

    // Verifica que setResults haya sido llamado con el número correcto de podcasts
    expect(mockSetResults).toHaveBeenCalledWith(MOCK_PODCASTS.length);
  });

  test("shows loading state correctly", () => {
    (useTopPodcasts as jest.Mock).mockReturnValue({
      data: undefined,
      isFetching: true,
    } as UseQueryResult<PodcastCard[], Error>);

    renderComponent();

    // Verifica que setLoadingState se llame con true
    expect(setLoadingState).toHaveBeenCalledWith(true);

    // Verifica que el componente no se renderiza durante la carga
    expect(screen.queryByText(MOCK_PODCASTS[0].name)).not.toBeInTheDocument();
  });

  test("renders no podcasts when data is empty", () => {
    (useTopPodcasts as jest.Mock).mockReturnValue({
      data: [] as PodcastCard[],
      isFetching: false,
    } as UseQueryResult<PodcastCard[], Error>);

    renderComponent();

    // Verifica que no se renderice ningún podcast
    expect(screen.queryByText(MOCK_PODCASTS[0].name)).not.toBeInTheDocument();

    // Verifica que setResults haya sido llamado con 0
    expect(mockSetResults).toHaveBeenCalledWith(0);
  });

  test("filters podcasts by name and artist", () => {
    (useTopPodcasts as jest.Mock).mockReturnValue({
      data: MOCK_PODCASTS,
      isFetching: false,
    } as UseQueryResult<PodcastCard[], Error>);

    renderComponent("chronicles");

    // Verifica que el podcast con "chronicles" en su nombre se renderice
    const filteredPodcasts = MOCK_PODCASTS.filter((podcast) =>
      podcast.name.toLowerCase().includes("chronicles")
    );

    filteredPodcasts.forEach((podcast) => {
      expect(screen.getByText(podcast.name.toUpperCase())).toBeInTheDocument();
    });

    // Verifica que setResults haya sido llamado con el número correcto de podcasts filtrados
    expect(mockSetResults).toHaveBeenCalledWith(filteredPodcasts.length);
  });

  test("updates results count when filtered", () => {
    (useTopPodcasts as jest.Mock).mockReturnValue({
      data: MOCK_PODCASTS,
      isFetching: false,
    } as UseQueryResult<PodcastCard[], Error>);

    renderComponent("developer");

    // Verifica que solo los podcasts filtrados por "developer" se rendericen
    const filteredPodcasts = MOCK_PODCASTS.filter(
      (podcast) =>
        podcast.name.toLowerCase().includes("developer") ||
        podcast.artist.toLowerCase().includes("developer")
    );

    filteredPodcasts.forEach((podcast) => {
      expect(screen.getByText(podcast.name.toUpperCase())).toBeInTheDocument();
    });

    // Verifica que setResults haya sido llamado con el número correcto de resultados filtrados
    expect(mockSetResults).toHaveBeenCalledWith(filteredPodcasts.length);
  });

  test("does not render when no data and loading", () => {
    (useTopPodcasts as jest.Mock).mockReturnValue({
      data: undefined,
      isFetching: true,
    } as UseQueryResult<PodcastCard[], Error>);

    renderComponent();

    // Verifica que el componente no se renderice durante la carga
    expect(screen.queryByText(MOCK_PODCASTS[0]?.name)).not.toBeInTheDocument();
    expect(setLoadingState).toHaveBeenCalledWith(true);
  });
});
