import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface PodcastItemProps {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
}

const PodcastItem: React.FC<PodcastItemProps> = ({
  id,
  name,
  artist,
  imageUrl,
}) => {
  const router = useRouter();

  const showPodcastDetails = useCallback(() => {
    router.push(`/podcast/${id}`);
  }, [id, router]);

  return (
    <div
      className="shadow-lg card flex flex-col my-16 w-60 cursor-pointer"
      onClick={showPodcastDetails}
      role="button"
      tabIndex={0}
    >
      <div className="self-center relative -top-10">
        <Image
          className="rounded-full border border-gray-300"
          src={imageUrl || "/image/default-image.webp"}
          alt={`${name}`}
          width={150}
          height={150}
        />
      </div>
      <div className="relative -top-5 text-center px-4">
        <div className="font-bold text-sm line-clamp-2 overflow-hidden h-12">
          {name.toUpperCase()}
        </div>
        <div className="text-sm text-gray-600 line-clamp-2 overflow-hidden h-10">
          Author: {artist}
        </div>
      </div>
    </div>
  );
};

export default PodcastItem;
