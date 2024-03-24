import CartHeader from "components/Cart/CartHeader/CartHeader";
import Search from "components/Search/Search";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import DropdownMenu from "ui-components/DropdownMenu/DropdownMenu";
import "./header.scss";

// categories menu configuration
const categoriesDropdownInfo = {
  mainMenu: {
    title: "Categories",
  },
  menuItems: [
    { title: "Electronics", to: "/category/electronics" },
    { title: "Men's Clothing", to: "/category/men's clothing" },
    { title: "Women's Clothing", to: "/category/women's clothing" },
    { title: "Jewelery", to: "/category/jewelery" },
  ],
  startFrom: "left",
};

// account menu configuration
const accountDropdownInfo = {
  mainMenu: {
    title: "Account",
  },
  menuItems: [
    { title: "Profile", to: "/profile" },
    { title: "Orders", to: "/orders" },
    { title: "Sign out", to: "/logout" },
  ],
  startFrom: "left",
};

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn } = auth;

  return (
    <div className="header">
      <div className="nav">
        <div className="logo">
          <NavLink to="/" key="home" className="nav-link">
            <i className="fa fa-shopping-bag" aria-hidden="true"></i>
          </NavLink>
        </div>
        <DropdownMenu info={categoriesDropdownInfo} />
      </div>
      <div>
        <Search />
      </div>
      <div className="nav">
        {isLoggedIn ? (
          // Display content for logged-in users
          <>
            <DropdownMenu info={accountDropdownInfo} />
            <NavLink
              to="/cart"
              key="cart"
              className="nav-link-no-text-decoration"
            >
              <CartHeader />
            </NavLink>
          </>
        ) : (
          // Display content for non-logged-in users
          <>
            <NavLink to="login" className="nav-link">
              Sign in
            </NavLink>
            <NavLink to="signup" className="nav-link">
              Sign up
            </NavLink>
            <NavLink
              to="/cart"
              key="cart"
              className="nav-link-no-text-decoration"
            >
              <CartHeader />
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
