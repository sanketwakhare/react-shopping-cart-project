import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";

import CartPage from "components/Cart/CartPage/CartPage";
import PageNotFound from "components/PageNotFound/PageNotFound";
import ProductDetails from "components/Products/ProductDetails/ProductDetails";
import ProductListPage from "components/Products/ProductList/ProductListPage";
import TokenRefresh from "components/TokenRefresh/TokenRefresh";
import UserProfile from "components/UserProfile/UserProfile";
import ForgotPassword from "pages/forgot-password/ForgotPassword";
import ResetPassword from "pages/forgot-password/ResetPassword";
import VerifyForgotPasswordOtp from "pages/forgot-password/VerifyForgotPasswordOtp";
import Login from "pages/login/Login";
import Logout from "pages/logout/Logout";
import Signup from "pages/signup/Signup";

const AppRoutes = () => {
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn } = auth;

  return (
    <div className="main-container">
      <Routes>
        <Route path="" element={<ProductListPage />}></Route>
        <Route path="search" element={<ProductListPage />}></Route>
        <Route
          path="category/:categoryId"
          element={<ProductListPage />}
        ></Route>
        <Route path="products/:productId" element={<ProductDetails />}></Route>
        <Route path="cart" element={<CartPage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/verify-forgot-password-otp"
          element={<VerifyForgotPasswordOtp />}
        ></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      {isLoggedIn && <TokenRefresh />}
    </div>
  );
};

export default AppRoutes;
