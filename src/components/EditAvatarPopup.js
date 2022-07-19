import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarInput = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarInput.current.value);
    avatarInput.current.value = '';
  }

  return (
    <PopupWithForm
      name="action_update-avatar"
      form="update-avatar"
      text="Сохранить"
      title="Обновить аватар"
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="url"
        name="avatar"
        id="url"
        className="popup__input popup__input_el_avatar"
        placeholder="Введите url адрес картинки"
        ref={avatarInput}
        value={avatarInput.value}
      />
      <span className="popup__error url-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
