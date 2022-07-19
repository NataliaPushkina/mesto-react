import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpened ? "popup_opened" : ""
      }`}
    >
      <div className={`popup__container popup__container_${props.name}`}>
        <button
          type="button"
          className="button button_type_close"
          onClick={props.onClose}
        ></button>
        <h3 className="popup__title">{props.title}</h3>
        <form
          className={`popup__form popup__form_${props.form}`}
          name={props.form}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button type="submit" className="popup__button">
            {props.text}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
