function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="element">
      <img
        src={props.link}
        alt={props.name}
        className="element__photo"
        onClick={handleClick}
      />
      <button className="button button_type_delete"></button>
      <div className="element__caption">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__like-container">
          <button type="button" className="button button_type_like"></button>
          <span className="element__like-count"></span>
        </div>
      </div>
    </li>
  );
}

export default Card;
