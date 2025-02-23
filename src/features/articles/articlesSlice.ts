import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllArticles } from "../../services/newsService";

export interface Article {
  title: string;
  description: string;
  url: string;
  sourceName: string;
  publishedAt?: string;
  category?: string;
}

interface ArticlesState {
  articles: Article[];
  filteredArticles: Article[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filters: {
    category: string;
    source: string;
    date: string;
  };
}

const initialState: ArticlesState = {
  articles: [],
  filteredArticles: [],
  loading: false,
  error: null,
  searchQuery: "",
  filters: {
    category: "",
    source: "",
    date: "",
  },
};

// Fetch articles from API
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (query: string) => {
    return await fetchAllArticles(query);
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      articlesSlice.caseReducers.applyFilters(state);
    },
    setFilters: (
      state,
      action: PayloadAction<{ category: string; source: string; date: string }>
    ) => {
      state.filters = action.payload;
      articlesSlice.caseReducers.applyFilters(state);
    },
    applyFilters: (state) => {
      state.filteredArticles = state.articles.filter((article) => {
        const matchesSearch =
          state.searchQuery === "" ||
          article.title
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          article.description
            ?.toLowerCase()
            .includes(state.searchQuery.toLowerCase());

        const matchesCategory =
          state.filters.category === "" ||
          article.category?.toLowerCase() === state.filters.category?.toLowerCase();
        const matchesSource =
          state.filters.source === "" ||
          article.sourceName === state.filters.source;
        const matchesDate =
          state.filters.date === "" ||
          article.publishedAt?.startsWith(state.filters.date);

        return matchesSearch && matchesCategory && matchesSource && matchesDate;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
        state.filteredArticles = action.payload;
        articlesSlice.caseReducers.applyFilters(state);
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch articles";
      });
  },
});

export const { setSearchQuery, setFilters } = articlesSlice.actions;
export default articlesSlice.reducer;
