import React from "react";
import AppLogo from "../assets/img/logo.jpg";
function Header(props) {
  return (
    <div className="header">
      <img src={AppLogo} />
    </div>
  );
}

export default Header;
