# Innoscripta News App

## 📌 Overview
The **Innoscripta News App** is a news aggregator built with React, TypeScript, Vite, and Redux. It fetches news from multiple sources, including NewsAPI, The Guardian, and The New York Times, allowing users to view personalized news feeds with filtering options.

## 🚀 Loom for Demonstration
https://www.loom.com/share/87b99f1b60904499a564e75b577ea2a8


## 🚀 Live Demo on Vercel
https://innoscripta-news-app-kappa.vercel.app

## 🚀 Features
- Fetches news from multiple sources (NewsAPI, The Guardian, NY Times)
- Personalized news feed with filters
- Responsive design using Tailwind CSS
- State management with Redux
- Dockerized for easy deployment

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Vite, Redux
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **API Integration**: NewsAPI, The Guardian API, NY Times API
- **Deployment**: Docker, Docker Compose

---

## 📁 Project Structure
```
innoscripta-newsapp/
│── public/               # Static assets
│── src/                  # Source files
│   ├── assets/           # Images, icons, etc.
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Filter.tsx
│   │   ├── PersonalisedFeed.tsx
│   │   ├── NewsList.tsx
|   |   |-- ArticleCard.tsx
│   ├── features/         # Redux slices
│   │   ├── articles/
│   │   │   ├── articlesSlice.ts
│   ├── pages/            # Page components
│   │   ├── Home.tsx
│   │   ├── Feed.tsx
│   ├── services/           # API service functions
│   │   ├── newsService.ts       
│   ├── store.ts          # Redux store
│   ├── hooks.ts          # Custom hooks
│   ├── main.tsx          # App entry point
│── .dockerignore         # Files to ignore in Docker
│── .gitignore            # Files to ignore in Git
│── docker-compose.yml    # Docker Compose configuration
│── Dockerfile            # Docker build configuration
│── index.html            # Main HTML file
│── package.json          # Project dependencies
│── tsconfig.json         # TypeScript configuration
│── vite.config.ts        # Vite configuration
│── README.md             # Project documentation
```

---

## 🔧 Setup & Installation



###   Clone the Repository
```sh
git clone https://github.com/your-username/innoscripta-newsapp.git
cd innoscripta-newsapp
```

---

## 🐳 Docker Setup
---

### 1️⃣ Using Docker Compose
```sh
docker-compose up --build
```

### 2️⃣ Build and Run with Docker
```sh
docker build -t innoscripta-newsapp .
docker run -p 5173:5173 innoscripta-newsapp
```

### 3️⃣ If you want to run manually then Install Dependencies
```sh
npm install
```

### Set Up Environment Variables (If not)
Create a `.env` file in the root directory:
```sh
VITE_NEWS_API_KEY=your_news_api_key
VITE_GUARDIAN_API_KEY=your_guardian_api_key
VITE_NY_TIMES_API_KEY=your_ny_times_api_key
```

### 4️⃣ Run the Development Server
```sh
npm run dev
```
**By default, the app runs on:** `http://localhost:5173`

---

## 🚀 Deployment
- **To deploy with Docker**, use `docker-compose.yml`.
- Ensure environment variables are set up in the production environment.

---

## 🎯 API Integration
### Fetching Articles from APIs
The app fetches articles using the following services:

```ts
export const fetchNewsArticles = async () => {
  return fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`)
    .then(response => response.json());
};
```

---

## 📜 License
This project is licensed under the MIT License.

---

## 👨‍💻 Author
- **M Hamza Shakeel** - [GitHub Profile](https://github.com/your-username)

Feel free to contribute and improve this project! 🚀

