import React from "react";

const Nav: React.FC = () => {
  return (
    <nav>
      <a href="/" className="nav__logo">
        🐶
      </a>
      <ul className="nav__links">
        <li className="nav__list">
          <a href="#" className="nav__list--link">
            About
          </a>
        </li>
        <li className="nav__list">
          <a href="#" className="nav__list--link">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
