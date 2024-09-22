import { Episode, Podcast, PodcastCard } from "@/types";
import {
  ONE_DAY_IN_MS,
  getPodcastDetailUrl,
  getTopPodcastsUrl,
  withCORSProxy,
} from "./urls";
import { useQuery } from "@tanstack/react-query";
import { fetchWithRetry } from "@/utils/fetchWithRetry";

const extractEpisodeData = (episodes: Episode[]) =>
  episodes.map(
    ({
      description,
      episodeUrl,
      kind,
      releaseDate,
      trackId,
      trackName,
      trackTimeMillis,
    }) => ({
      description,
      episodeUrl,
      kind,
      releaseDate,
      trackId,
      trackName,
      trackTimeMillis,
    })
  );

const extractPodcastData = (podcasts: Podcast[]): PodcastCard[] => {
  return podcasts.map((podcast: Podcast) => ({
    id: podcast.id.attributes["im:id"],
    name: podcast["im:name"]?.label ?? "",
    artist: podcast["im:artist"]?.label ?? "",
    imageUrl: podcast["im:image"][0]?.label ?? "",
    summary: podcast.summary?.label ?? "",
  }));
};

export const fetchTopPodcasts = async () => {
  try {
    const response = await fetchWithRetry(withCORSProxy(getTopPodcastsUrl()));

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return extractPodcastData(data.feed.entry);
  } catch (error) {
    console.error("Error fetching top podcasts:", error);
    throw error;
  }
};

export const fetchPodcastEpisodes = async (id: string) => {
  try {
    const response = await fetchWithRetry(
      withCORSProxy(getPodcastDetailUrl({ id }))
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const responseJson = await response.json();
    const filteredEpisodes = responseJson.results.filter(
      (episode: Episode) => episode.kind === "podcast-episode"
    );
    return extractEpisodeData(filteredEpisodes);
  } catch (error) {
    console.error("Error fetching podcast episodes:", error);
    throw error;
  }
};

export const usePodcastEpisodes = (podcastId: string) => {
  return useQuery<Episode[]>({
    queryKey: ["getPodcastEpisodes", podcastId],
    queryFn: () => fetchPodcastEpisodes(podcastId),
    staleTime: ONE_DAY_IN_MS,
    retry: 2,
  });
};

export const useTopPodcasts = () => {
  return useQuery<PodcastCard[]>({
    queryKey: ["getTopPodcasts"],
    queryFn: fetchTopPodcasts,
    staleTime: ONE_DAY_IN_MS,
    retry: 2,
  });
};
