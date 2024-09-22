"use client";

import React, { useState, useCallback } from "react";
import { PodcastList } from "@/components/podcast/PodcastList";
import { FilterInput } from "@/components/common";

const Home = () => {
  const [filter, setFilter] = useState<string>("");
  const [results, setResults] = useState<number>(0);

  const onChangeFilter = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = target;
      setFilter(value);
    },
    []
  );

  return (
    <div className="flex flex-col pt-2 pr-4">
      <FilterInput filter={filter} onChangeFilter={onChangeFilter} results={results} />
      <PodcastList filter={filter} setResults={setResults} />
    </div>
  );
};

export default Home;
