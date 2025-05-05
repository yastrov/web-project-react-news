import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NewsPage.css";
import saveIcon from "../../assets/icons/save.png";
import noSaveIcon from "../../assets/icons/no-save.png";
import { motion } from "framer-motion";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  content: string;
}

interface NewsApiResponse {
  articles: NewsArticle[];
  status: string;
  totalResults: number;
}

function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [favorites, setFavorites] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteArticles");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteArticles", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = "f89b1b38b5d34072809c781dae96332a";
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data: NewsApiResponse = await response.json();
        setArticles(data.articles);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const toggleFavorite = (article: NewsArticle) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.url === article.url);
      return isFavorite
        ? prev.filter((fav) => fav.url !== article.url)
        : [...prev, article];
    });
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Загрузка новостей...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const openModal = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  return (
    <div className="app">
      <div className="search-container">
        <input
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Link to="/favorite" className="favorites-link">
          Избранное ({favorites.length})
        </Link>
      </div>
      <h1>Последние новости</h1>
      <div className="news-container">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => {
            const isFavorite = favorites.some((fav) => fav.url === article.url);
            return (
              <div key={index} className="news-card">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="news-image"
                    onClick={() => openModal(article)}
                  />
                )}
                <div className="news-content">
                  <h2 onClick={() => openModal(article)}>{article.title}</h2>
                  <p className="news-source">
                    {article.source.name} •{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  className={`btn favorite-btn ${isFavorite ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(article);
                  }}
                >
                  <img
                    src={isFavorite ? saveIcon : noSaveIcon}
                    alt={isFavorite ? "В избранном" : "Добавить в избранное"}
                    className="favorite-icon"
                  />
                </button>
              </div>
            );
          })
        ) : (
          <div className="no-results">Новости по вашему запросу не найдены</div>
        )}

        {isModalOpen && selectedArticle && (
          <div className="modal-overlay" onClick={closeModal}>
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <button
                className="modal-close"
                onClick={closeModal}
                aria-label="Закрыть окно"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>

              <div className="modal-header">
                <h2 className="modal-title">{selectedArticle.title}</h2>
                <div className="modal-meta">
                  <span className="modal-source">
                    {selectedArticle.source.name}
                  </span>
                  <span className="modal-date">
                    {new Date(selectedArticle.publishedAt).toLocaleDateString(
                      "ru-RU",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>

              {selectedArticle.urlToImage && (
                <div className="modal-image-container">
                  <img
                    src={selectedArticle.urlToImage}
                    alt={selectedArticle.title}
                    className="modal-image"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="modal-body">
                <p className="modal-description">
                  {selectedArticle.description}
                </p>
                {selectedArticle.content && (
                  <p className="modal-content-text">
                    {selectedArticle.content}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsPage;
