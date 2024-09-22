import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { MOCK_PODCASTS } from "@/mocks";
import PodcastItem from "@/components/podcast/PodcastItem";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const [podcast] = MOCK_PODCASTS;

describe("PodcastItem Component", () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders podcast item correctly", () => {
    render(
      <PodcastItem
        id={podcast.id}
        name={podcast.name}
        artist={podcast.artist}
        imageUrl={podcast.imageUrl}
      />
    );

    expect(screen.getByText(podcast.name.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(`Author: ${podcast.artist}`)).toBeInTheDocument();

    const image = screen.getByAltText(podcast.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(podcast.imageUrl))
    );
  });

  test("renders default image when imageUrl is not provided", () => {
    render(
      <PodcastItem
        id={podcast.id}
        name={podcast.name}
        artist={podcast.artist}
        imageUrl="" // Omitir imageUrl
      />
    );

    const image = screen.getByAltText(podcast.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("default-image.webp")
    );
  });

  test("renders correctly when name is empty", () => {
    render(
      <PodcastItem
        id={podcast.id}
        name=""
        artist={podcast.artist}
        imageUrl={podcast.imageUrl}
      />
    );

    const artistElement = screen.getByText(`Author: ${podcast.artist}`);
    expect(artistElement).toBeInTheDocument();
  });

  test("renders correctly when artist is empty", () => {
    render(
      <PodcastItem
        id={podcast.id}
        name={podcast.name}
        artist=""
        imageUrl={podcast.imageUrl}
      />
    );

    const nameElement = screen.getByText(podcast.name.toUpperCase());
    expect(nameElement).toBeInTheDocument();
    expect(screen.getByText("Author:")).toBeInTheDocument();
  });

  test("executes showPodcastDetails when clicked", () => {
    render(
      <PodcastItem
        id={podcast.id}
        name={podcast.name}
        artist={podcast.artist}
        imageUrl={podcast.imageUrl}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(mockRouterPush).toHaveBeenCalledWith(`/podcast/${podcast.id}`);
  });

  test("renders default image when imageUrl is undefined", () => {
    const podcastWithoutImage = { ...podcast, imageUrl: undefined };
    render(
      <PodcastItem
        id={podcastWithoutImage.id}
        name={podcastWithoutImage.name}
        artist={podcastWithoutImage.artist}
        imageUrl={
          podcastWithoutImage.imageUrl
            ? podcastWithoutImage.imageUrl
            : "/image/default-image.webp"
        }
      />
    );

    const image = screen.getByAltText(podcastWithoutImage.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("default-image.webp")
    );
  });
});
