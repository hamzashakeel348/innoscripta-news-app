import axios from "axios";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NY_TIMES_API_KEY = import.meta.env.VITE_NY_TIMES_API_KEY;

const sourceCategoryMap: Record<string, string> = {
  "Gizmodo.com": "Technology",
  TechCrunch: "Technology",
  "The Verge": "Technology",
  CNET: "Technology",
  "Android Central": "Technology",
  "BBC News": "General",
  CNN: "Politics",
  "The Guardian": "Politics",
  NPR: "Politics",
  "Business Insider": "Finance",
  Forbes: "Finance",
  Bloomberg: "Finance",
  ESPN: "Sports",
  IGN: "Gaming",
  Kotaku: "Gaming",
  "Yahoo Entertainment": "Weather",
};

const fetchNewsAPIArticles = async (query: string) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`
    );
    return response.data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: { name: article.source.name },
      author: article.author,
      publishedAt: article.publishedAt,
      content: article.content,
      sourceName: "newsapi",
      category: sourceCategoryMap[article.source.name] || "general",
    }));
  } catch (error) {
    console.error("NewsAPI failed:", error);
    return [];
  }
};

const fetchGuardianArticles = async (query: string) => {
  try {
    const response = await axios.get(
      `https://content.guardianapis.com/search?q=${query}&api-key=${GUARDIAN_API_KEY}`
    );
    return response.data.response.results.map((article: any) => ({
      title: article.webTitle,
      description: "",
      url: article.webUrl,
      source: { name: "The Guardian" },
      publishedAt: article.webPublicationDate,
      sourceName: "guardian",
      category: article.pillarName || article.sectionName || "general",
    }));
  } catch (error) {
    console.error("Guardian API failed:", error);
    return [];
  }
};

const fetchNewYorkTimesArticles = async () => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${NY_TIMES_API_KEY}`
    );
    return response.data.results.map((article: any) => ({
      title: article.title,
      description: article.abstract,
      url: article.url,
      source: { name: "New York Times" },
      publishedAt: article.published_date,
      sourceName: "nyt",
      category: article.subsection || "general",
    }));
  } catch (error) {
    console.error("NYTimes API failed:", error);
    return [];
  }
};

export const fetchAllArticles = async (query: string) => {
  const results = await Promise.allSettled([
    fetchNewsAPIArticles(query),
    fetchGuardianArticles(query),
    fetchNewYorkTimesArticles(),
  ]);

  return results
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => (result as PromiseFulfilledResult<any[]>).value);
};
