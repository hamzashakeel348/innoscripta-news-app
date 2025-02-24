import { format } from "date-fns";

interface ArticleProps {
  article: {
    title: string;
    description: string;
    url: string;
    sourceName: string;
    publishedAt?: string;
    category?: string;
  };
}

const ArticleCard: React.FC<ArticleProps> = ({ article }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
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
          </p>
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
  );
};

export default ArticleCard;
