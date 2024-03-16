import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./dropdown-menu.scss";

const DropdownMenu = ({ info }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = info?.menuItems.map((category, index) => (
    <Link key={index} to={category.to} className="dropdown-item">
      {category.title}
    </Link>
  ));

  const dropdownMenuClasses = ["dropdown-menu"];
  const startFromClass =
    info?.startFrom === "left" ? "left-started" : "right-started";
  dropdownMenuClasses.push(startFromClass);
  const dropdownMenuClassNames = dropdownMenuClasses.join(" ");

  return (
    <div className="dropdown-container">
      <div className={`dropdown ${isOpen ? "open" : ""}`}>
        <div onClick={toggleMenu} className="dropdown-toggle">
          {info?.mainMenu?.title}
        </div>
        {isOpen && (
          <>
            <div className="backdrop" onClick={toggleMenu}></div>
            <div className={dropdownMenuClassNames} onClick={toggleMenu}>
              {menuItems}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
