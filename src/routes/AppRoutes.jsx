import { Route, Routes } from "react-router";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import ProductDetails from "../components/Products/ProductDetails/ProductDetails";
import ProductListPage from "../components/Products/ProductListPage";
import CartPage from "../pages/cart/CartPage";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import ResetPassword from "../pages/forgot-password/ResetPassword";
import VerifyForgotPasswordOtp from "../pages/forgot-password/VerifyForgotPasswordOtp";
import Login from "../pages/login/Login";
import Logout from "../pages/logout/Logout";
import Signup from "../pages/signup/Signup";

const AppRoutes = (props) => {
  const { handleSetLogin } = props;

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
        <Route
          path="/login"
          element={<Login handleSetLogin={handleSetLogin} />}
        ></Route>
        <Route
          path="/logout"
          element={<Logout handleSetLogin={handleSetLogin} />}
        ></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/verify-forgot-password-otp"
          element={<VerifyForgotPasswordOtp />}
        ></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
