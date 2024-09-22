"use client";

import { useContext, useEffect, useState, useCallback } from "react";
import { LoadingContext } from "@/context/LoadingContext";
import Image from "next/image";
import Link from "next/link";
import { useTopPodcasts } from "@/services/itunes.service";
import { PodcastCard } from "@/types";

type PodcastDetailsProps = {
  podcastId: string;
};

const PodcastDetailsCard: React.FC<PodcastDetailsProps> = ({ podcastId }) => {
  const { data, isFetching } = useTopPodcasts();
  const { setLoadingState } = useContext(LoadingContext);
  const [displayPodcast, setDisplayPodcast] = useState<
    PodcastCard | undefined
  >();

  const getPodcastDetails = useCallback(
    (data: PodcastCard[], podcastId: string) =>
      data.find((podcast) => podcast.id === podcastId),
    []
  );

  useEffect(() => {
    if (data) {
      const podcastDetails = getPodcastDetails(data, podcastId);
      setDisplayPodcast(podcastDetails);
    }
  }, [data, podcastId, getPodcastDetails]);

  useEffect(() => {
    setLoadingState(isFetching);
  }, [isFetching, setLoadingState]);

  if (!displayPodcast) return null;

  return (
    <div data-testid="podcast-details-card">
      <div className="shadow-lg shadow-black-500/20 card flex flex-col text-xs w-64">
        <Link href={`/podcast/${podcastId}`}>
          <Image
            className="rounded-md py-4"
            src={displayPodcast.imageUrl}
            alt={`${displayPodcast.name}`}
            width={200}
            height={200}
          />
        </Link>
        <div className="border-t-2 py-4">
          <Link href={`/podcast/${podcastId}`}>
            <div className="font-bold">{displayPodcast.name}</div>
          </Link>
          <Link href={`/podcast/${podcastId}`}>
            <div className="italic">by {displayPodcast.artist}</div>
          </Link>
        </div>
        <div className="border-t-2 py-4">
          <div className="font-bold">Description:</div>
          <div className="italic overflow-hidden text-ellipsis whitespace-normal">
            {displayPodcast.summary}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastDetailsCard;
