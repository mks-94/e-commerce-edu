import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

const HeaderMenu = () => {
  return (
    <div className="header-menu">
      <AiOutlineMenu />
      <div className="header-menu__expand">
        <div className="header-menu__expand--links">
          <Link className="header-menu__expand--links--text" to="/newPage">
            New Page
          </Link>
          <Link className="header-menu__expand--links--text" to="/newPage">
            New Page
          </Link>
          <Link className="header-menu__expand--links--text" to="/newPage">
            New Page
          </Link>
          <Link className="header-menu__expand--links--text">Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
