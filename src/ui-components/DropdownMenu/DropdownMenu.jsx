import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./dropdown-menu.scss";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`}>
      <div onClick={toggleMenu} className="dropdown-toggle">
        Categories
      </div>
      {isOpen && (
        <div className="dropdown-menu" onClick={toggleMenu}>
          <Link to="/category/electronics" className="dropdown-item">
            Electronics
          </Link>
          <Link to="/category/men's clothing" className="dropdown-item">
            Men's Clothing
          </Link>
          <Link to="/category/women's clothing" className="dropdown-item">
            Women's Clothing
          </Link>
          <Link to="/category/jewelery" className="dropdown-item">
            Jewelery
          </Link>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
