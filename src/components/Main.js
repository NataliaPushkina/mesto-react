import React, { useState, useEffect } from "react";
import "../index.css";
import api from "../utils/Api";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="content">
      <section className="profile">
        <div className="profile__container">
          <a href="#!" className="profile__avatar-link">
            <img
              src={userAvatar}
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
              <h1 className="profile__title">{userName}</h1>
              <button
                type="button"
                className="button button_type_edit"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
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
              />
            );
          })}
        </ul>
      </section>
    </section>
  );
}

export default Main;
