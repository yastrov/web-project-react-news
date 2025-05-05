import { useState, useEffect, useRef } from "react";
import "./HomePage.css";
import news1 from "../../assets/img/news/news1.jpg";
import news2 from "../../assets/img/news/news2.jpg";
import news4 from "../../assets/img/news/news4.jpg";
import news5 from "../../assets/img/news/news5.jpg";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      image: news1,
      subtitle: "",
    },
    {
      image: news2,
      subtitle: "Все важные новости в одном месте. Будьте в курсе событий 24/7",
    },
    {
      image: news4,
      subtitle: "Путин и Мирзиеев подчеркнул важность сохранения динамики товарооборота",
    },
    {
        image: news5,
        subtitle: "Как отдыхаем в мае 2025 года: праздники и перенос выходных",
      },
  ];

  const goToSlide = (index: number) => {
    if (index < 0 || index >= slides.length || isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (isAnimating) return;
    if (e.deltaY > 50) {
      goToSlide(currentSlide + 1);
    } else if (e.deltaY < -50) {
      goToSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [currentSlide, isAnimating]);

  return (
    <div className="parallax-container" ref={containerRef}>
      {slides.map((slide, index) => (
        <section
          key={index}
          className={`background ${
            index === currentSlide
              ? "active"
              : index < currentSlide
              ? "up"
              : "down"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            zIndex: slides.length - index,
          }}
        >
          <div className="content-wrapper">
            <p className="content-subtitle">{slide.subtitle}</p>
          </div>
        </section>
      ))}
    </div>
  );
};

export default HomePage;
