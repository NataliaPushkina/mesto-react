import logo from "../images/logo.svg";

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
    </div>
  );
}

export default Header;
