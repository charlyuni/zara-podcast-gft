"use client";

import { useContext, useEffect, useState, useCallback } from "react";
import { LoadingContext } from "@/context/LoadingContext";
import DOMPurify from "dompurify";
import { usePodcastEpisodes } from "@/services/itunes.service";
import { Episode } from "@/types";

interface EpisodeAudioPlayerProps {
  podcastId: string;
  episodeId: string;
}

const EpisodeAudioPlayer: React.FC<EpisodeAudioPlayerProps> = ({
  podcastId,
  episodeId,
}) => {
  const { setLoadingState } = useContext(LoadingContext);
  const { data, isFetching } = usePodcastEpisodes(podcastId);
  const [displayEpisode, setDisplayEpisode] = useState<Episode | undefined>();

  const getEpisode = useCallback(
    (episodes: Episode[], episodeId: string) =>
      episodes.find((episode: Episode) => episode.trackId === +episodeId),
    []
  );

  useEffect(() => {
    if (data) {
      const episode = getEpisode(data, episodeId);
      setDisplayEpisode(episode);
    }
  }, [data, episodeId, getEpisode]);

  useEffect(() => {
    setLoadingState(isFetching);
  }, [isFetching, setLoadingState]);

  const episodeUrl = displayEpisode?.episodeUrl;

  if (!displayEpisode || !episodeUrl) return null;

  return (
    <div
      className="flex flex-col grow w-3/4"
      data-testid="episode-audio-player"
    >
      <div className="shadow-lg shadow-black-500/20 card text-xs">
        <div className="font-bold text-2xl pb-3">{displayEpisode.trackName}</div>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(displayEpisode.description),
          }}
        />
        <audio
          controls
          className="pb-3 w-full mt-4"
          data-testid="episode-audio-player"
        >
          <source
            src={episodeUrl}
            type="audio/mp3"
            data-testid="episode-source"
          />
        </audio>
      </div>
    </div>
  );
};

export default EpisodeAudioPlayer;
