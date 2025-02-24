import { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store";
import { useAppDispatch } from "../hooks";

import ArticleCard from "./ArticleCard";
import { fetchArticles } from "../features/articles/articlesSlice";

const NewsList = () => {
  const { filteredArticles, loading, error } = useSelector(
    (state: RootState) => state.articles
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticles("latest"));
  }, [dispatch]);

  console.log(filteredArticles);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      {filteredArticles.length === 0 ? (
        <p className="text-center text-gray-500">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredArticles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;
