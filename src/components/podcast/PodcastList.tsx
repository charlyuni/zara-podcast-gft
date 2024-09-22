import { LoadingContext } from "@/context/LoadingContext";
import { useTopPodcasts } from "@/services/itunes.service";
import React, { useContext, useEffect, useMemo } from "react";
import PodcastItem from "./PodcastItem";
import { PodcastCard } from "@/types";

interface PodcastListProps {
  filter: string;
  setResults: (value: number) => void;
}

const PodcastList: React.FC<PodcastListProps> = ({
  filter = "",
  setResults,
}) => {
  const { setLoadingState } = useContext(LoadingContext);
  const { data, isFetching } = useTopPodcasts();

  useEffect(() => {
    setLoadingState(isFetching);
  }, [isFetching, setLoadingState]);

  const filteredPodcasts: PodcastCard[] = useMemo(() => {
    const lowerCaseFilter = filter.toLowerCase();

    if (!data || data.length === 0) {
      return [];
    }

    if (filter) {
      return data.filter(({ name, artist }: PodcastCard) => {
        return (
          name.toLowerCase().includes(lowerCaseFilter) ||
          artist.toLowerCase().includes(lowerCaseFilter)
        );
      });
    }

    return data;
  }, [filter, data]);

  useEffect(() => {
    setResults(filteredPodcasts.length);
  }, [filteredPodcasts, setResults]);

  if (!data || isFetching) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl p-4">
      {filteredPodcasts.map(({ id, name, artist, imageUrl }) => (
        <PodcastItem
          key={id}
          id={id}
          name={name}
          artist={artist}
          imageUrl={imageUrl}
        />
      ))}
    </div>
  );
};

export { PodcastList };
