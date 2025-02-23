import React from "react";

import FilterBar from "../components/FilterBar";
import PersonalizedFeed from "../components/PersonalizedFeed";

const Feed: React.FC = () => {
  return (
    <div>
      <FilterBar showDateFilter={false} showSearchBar={false} />
      <PersonalizedFeed />
    </div>
  );
};

export default Feed;
