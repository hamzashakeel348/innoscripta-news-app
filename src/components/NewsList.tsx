import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks";
import { fetchArticles } from "../features/articles/articlesSlice";
import { useEffect } from "react";
import { format } from "date-fns";

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
    return <p className="text-center text-gray-600">Loading articles...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      {filteredArticles.length === 0 ? (
        <p className="text-center text-gray-500">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredArticles.map((article, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col h-full"
            >
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900">
                  {article.title}
                </h3>
                <p className="text-gray-700 mt-2">{article.description}</p>

                <div className="mt-4 text-sm text-gray-600">
                  <strong>Category:</strong> {article.category}
                  <p>
                    <strong>Published:</strong>{" "}
                    {article.publishedAt
                      ? format(new Date(article.publishedAt), "PPpp")
                      : "Unknown"}{" "}
                  </p>
                  <p>
                    <strong>Source:</strong> {article.sourceName}
                  </p>{" "}
                  <p></p>
                </div>
              </div>

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-auto"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;
