import { useState } from "react";
import qrCode from "../../assets/img/qr-code.jpg";
import "./AboutPage.css";

const AboutPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Откуда берутся новости на вашем сайте?",
      answer:
        "Мы агрегируем новости из проверенного источника через официальные API (NewsAPI). Все материалы проходят модерацию перед публикацией.",
    },
    {
      question: "Как часто обновляются новости?",
      answer: "Наш сервис обновляет ленту каждые 5 минут.",
    },
    {
      question: "Как связаться с редакцией?",
      answer:
        "По вопросам сотрудничества: allnews@gmail.com. Для технической поддержки: allnews-support@gmail.com. Телефон: +7 (123) 456-78-90 (с 9:00 до 18:00 по МСК).",
    },
    {
      question: "Можно ли использовать ваш API?",
      answer:
        "Да! Разработчики могут получить доступ к нашему API после регистрации на портале для разработчиков. Бесплатный тариф включает 1000 запросов в день.",
    },
    {
      question: "Можно ли пользоваться с телефона?",
      answer: "Да! Наше веб-приложение поддерживает адаптивную вертску.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="about">
      <h1>О проекте All News</h1>
      <p className="description">
        <b>All News</b> — это современный новостной агрегатор, который
        объединяет самые важные и проверенные новости со всего мира в одном
        удобном месте.
      </p>

      <div className="about-content">
        <h2>Наша миссия</h2>
        <p>
          В эпоху информационной перегрузки мы помогаем нашим читателям
          оставаться в курсе событий без лишнего шума. Наша команда
          профессиональных редакторов тщательно отбирает и проверяет информацию,
          чтобы вы получали только достоверные новости.
        </p>

        <h2>Что мы предлагаем</h2>
        <ul>
          <li>Свежие новости в режиме 24/7 </li>
          <li>Умную систему персонализации по вашим интересам</li>
          <li>Удобный поиск для удобного просмотра</li>
          <li>Эксклюзивные аналитические материалы и авторские колонки</li>
          <li>Возможность смотреть новости на мобильных гаджетах</li>
        </ul>

        <h2>Наши принципы</h2>
        <div className="principles">
          <div className="principle">
            <h3>Объективность</h3>
            <p>Мы представляем разные точки зрения на каждое событие</p>
          </div>
          <div className="principle">
            <h3>Проверка фактов</h3>
            <p>Каждая новость проходит многоступенчатую проверку</p>
          </div>
          <div className="principle">
            <h3>Простота</h3>
            <p>Удобный интерфейс без лишней информации</p>
          </div>
        </div>

        <h2>Наша команда</h2>
        <p>
          В All News работают профессиональные журналисты, аналитики и
          разработчики из 15 стран. Мы объединены общей целью — сделать
          потребление новостей удобным и полезным.
        </p>
      </div>

      <h2 className="accordian-title">Часто задаваемые вопросы</h2>
      <div className="accordion">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className={`accordion-item ${
              activeIndex === index ? "active" : ""
            }`}
          >
            <div
              className="accordion-header"
              onClick={() => toggleAccordion(index)}
            >
              <h3>{item.question}</h3>
              <span className="accordion-icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>
            <div className="accordion-content">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="support">
        <h4>Для поддержки авторов</h4>
        <img className="support-img" src={qrCode} alt="" />
      </div>
    </div>
  );
};

export default AboutPage;
