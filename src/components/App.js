import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUser, CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  }

  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        console.log(userData);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page__content">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="action_edit"
        title="Редактировать профиль"
        form="edit-element"
        text="Сохранить"
        isOpened={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__inputs">
          <input
            required
            type="text"
            name="name"
            id="name"
            minLength=""
            maxLength="40"
            className="popup__input popup__input_el_name"
            placeholder="Имя"
          />
          <span className="popup__error name-error"></span>
          <input
            required
            type="text"
            name="job"
            id="job"
            minLength="2"
            maxLength="200"
            className="popup__input popup__input_el_job"
            placeholder="О себе"
          />
          <span className="popup__error job-error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="action_add"
        form="add-element"
        text="Создать"
        title="Новое место"
        isOpened={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__inputs">
          <input
            required
            type="text"
            name="title"
            id="title"
            minLength="2"
            maxLength="30"
            className="popup__input popup__input_el_title"
            placeholder="Название"
          />
          <span className="popup__error title-error"></span>
          <input
            required
            type="url"
            name="link"
            id="link"
            className="popup__input popup__input_el_link"
            placeholder="Ссылка на картинку"
          />
          <span className="popup__error link-error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="delete-pic"
        form="delete-pic"
        text="Да"
        title="Вы уверены?"
      ></PopupWithForm>

      <PopupWithForm
        name="action_update-avatar"
        form="update-avatar"
        text="Сохранить"
        title="Обновить аватар"
        isOpened={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          required
          type="url"
          name="avatar"
          id="url"
          className="popup__input popup__input_el_avatar"
          placeholder="Введите url адрес картинки"
        />
        <span className="popup__error url-error"></span>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
