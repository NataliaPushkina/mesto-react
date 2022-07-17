import React, { useState, useEffect } from "react";
import "../index.css";
import api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [cards, setCards] = useState([]);
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки

    if (!isLiked) {
      api
        .addLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLike(card._id, isLiked)
        .then((newCard) => {
          console.log(newCard);
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        console.log(res);
        setCards((state) =>
          state.filter((c) => (c._id !== card._id ? res : null))
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className="content">
      <section className="profile">
        <div className="profile__container">
          <a href="#!" className="profile__avatar-link">
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__avatar"
              onClick={onEditAvatar}
            />
            <button
              type="button"
              className="profile__edit-icon profile__edit-icon_hidden"
            ></button>
          </a>

          <div className="profile__info">
            <div className="profile__edit-container">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                type="button"
                className="button button_type_edit"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="button button_type_add"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                name={card.name}
                link={card.link}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </section>
  );
}

export default Main;
