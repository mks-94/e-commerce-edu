import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import HeaderLogin from "./HeaderLogin";
import HeaderMenu from "./HeaderMenu";

const HeaderRight = () => {
  return (
    <div className="header__right">
      <AiOutlineShoppingCart className="header__right--cart" />
      {/* <HeaderLogin /> */}
      <HeaderMenu />
    </div>
  );
};
export default HeaderRight;
