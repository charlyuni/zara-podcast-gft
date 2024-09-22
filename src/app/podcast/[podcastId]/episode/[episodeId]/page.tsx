import EpisodeAudioPlayer from "@/components/episode/EpisodeAudioPlayer";
import PodcastDetailsCard from "@/components/podcast/PodcastDetailsCard";
import React from "react";

type EpisodeProps = {
  params: { podcastId: string; episodeId: string };
};

const EpisodePage = ({ params: { podcastId, episodeId } }: EpisodeProps) => {
  return (
    <div className="flex flex-row mt-5">
      <PodcastDetailsCard podcastId={podcastId} />
      <EpisodeAudioPlayer podcastId={podcastId} episodeId={episodeId} />
    </div>
  );
};

export default EpisodePage;
