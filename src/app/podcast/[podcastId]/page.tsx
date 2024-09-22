"use client";

import EpisodesList from "@/components/episode/EpisodesList";
import PodcastDetailsCard from "@/components/podcast/PodcastDetailsCard";
import React from "react";

type PodcastProps = {
  params: { podcastId: string };
};

const PodcastPage = ({ params: { podcastId } }: PodcastProps) => {
  return (
    <div className="flex flex-row mt-5">
      <PodcastDetailsCard podcastId={podcastId} />
      <EpisodesList podcastId={podcastId} />
    </div>
  );
};

export default PodcastPage;
