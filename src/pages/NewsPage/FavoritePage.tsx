import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NewsPage.css";
import saveIcon from "../../assets/icons/save.png";

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

function FavoritePage() {
  const [favorites, setFavorites] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteArticles");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const removeFavorite = (url: string) => {
    const updatedFavorites = favorites.filter((article) => article.url !== url);
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteArticles", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="app">
      <div className="header-actions">
        <Link to="/news" className="favorites-link">
          ← Назад
        </Link>
      </div>

      <h1>Избранные новости</h1>

      <div className="news-container">
        {favorites.length > 0 ? (
          favorites.map((article, index) => (
            <div key={index} className="news-card">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="news-image"
                />
              )}
              <div className="news-content">
                <h2>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </h2>
                <p className="news-source">
                  {article.source.name} •{" "}
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
                <button
                  className=" btn favorite-btn active"
                  onClick={() => removeFavorite(article.url)}
                >
                  <img src={saveIcon} className="favorite-icon" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">У вас пока нет избранных новостей</div>
        )}
      </div>
    </div>
  );
}

export default FavoritePage;
