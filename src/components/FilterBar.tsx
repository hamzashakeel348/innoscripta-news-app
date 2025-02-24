import { useEffect, useState, useCallback } from "react";
import { useAppDispatch } from "../hooks";
import {
  fetchArticles,
  setFilters,
  setSearchQuery,
} from "../features/articles/articlesSlice";
import { debounce } from "lodash";

const FilterBar = ({ showSearchBar = true, showDateFilter = true }) => {
  const [date, setDate] = useState("");
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useAppDispatch();

  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      dispatch(setSearchQuery(searchQuery));
      dispatch(
        fetchArticles(searchQuery.trim() === "" ? "latest" : searchQuery)
      );
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  useEffect(() => {
    dispatch(setFilters({ category, source, date }));
  }, [category, source, date, dispatch]);

  const handleClearFilters = () => {
    setDate("");
    setQuery("");
    setSource("");
    setCategory("");
    dispatch(setFilters({ category: "", source: "", date: "" }));
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg flex flex-col md:flex-row gap-4 items-center md:justify-between">
      {showSearchBar && (
        <div className="w-full md:w-[30%] flex flex-col md:flex-row gap-2 md:gap-4">
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
      )}

      <div className="w-full md:w-auto flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Categories</option>
            <option value="technology">Technology</option>
            <option value="politics">Politics</option>
            <option value="sport">Sports</option>
            <option value="arts">Arts</option>
            <option value="music">Music</option>
            <option value="finance">Finance</option>
          </select>

          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Sources</option>
            <option value="newsapi">NewsAPI</option>
            <option value="guardian">The Guardian</option>
            <option value="nyt">New York Times</option>
          </select>
          {showDateFilter && (
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
          )}
        </div>

        <button
          onClick={handleClearFilters}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
