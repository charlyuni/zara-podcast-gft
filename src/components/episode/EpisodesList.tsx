import React from "react";
import Link from "next/link";
import { usePodcastEpisodes } from "@/services/itunes.service";
import { formatDate, formatMilliseconds } from "@/utils";
import GenericList from "@/components/common/GenericList";
import { Episode } from "@/types";

type EpisodesListProps = {
  podcastId: string;
};

const EpisodesList: React.FC<EpisodesListProps> = ({ podcastId }) => {
  const { data: episodes = [], isFetching } = usePodcastEpisodes(podcastId);

  return (
    <GenericList<Episode>
      items={episodes}
      isFetching={isFetching}
      columns={["Title", "Date", "Duration"]}
      renderRow={(episode, index) => (
        <tr
          key={episode.trackId}
          className={
            index % 2 === 0
              ? "bg-slate-200 border-b border-b-gray-400"
              : "bg-white border-b border-b-gray-400"
          }
        >
          <td className="whitespace-normal break-words pl-2 py-3 text-blue-600">
            <Link href={`/podcast/${podcastId}/episode/${episode.trackId}`}>
              {episode.trackName}
            </Link>
          </td>
          <td className="whitespace-nowrap pl-2 py-3">
            {formatDate(episode.releaseDate)}
          </td>
          <td className="whitespace-nowrap pl-2 py-3">
            {episode.trackTimeMillis
              ? formatMilliseconds(episode.trackTimeMillis)
              : "-"}
          </td>
        </tr>
      )}
    />
  );
};

export default EpisodesList;
