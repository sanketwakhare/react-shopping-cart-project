import { Route, Routes } from "react-router";
import NoItemsOverlay from "../components/NoItemsOverlay/NoItemsOverlay";
import ProductDetails from "../components/Products/ProductDetails/ProductDetails";
import ProductList from "../components/Products/ProductList";
import Login from "../pages/login/Login";
import Logout from "../pages/logout/Logout";
import Signup from "../pages/signup/Signup";

const AppRoutes = (props) => {
    const { selectedCategory } = props;
    return (
        <div className="main-container">
            <Routes>
                <Route
                    path=""
                    element={<ProductList selectedCategory="home" />}>
                </Route>
                <Route
                    path="category/:categoryId"
                    element={<ProductList selectedCategory={selectedCategory} />}>
                </Route>
                <Route
                    path="products/:productId"
                    element={<ProductDetails />}>
                </Route>
                <Route
                    path="/signup"
                    element={<Signup />}>
                </Route>
                <Route
                    path="/login"
                    element={<Login />}>
                </Route>
                <Route
                    path="/logout"
                    element={<Logout />}>
                </Route>
                <Route
                    path="*"
                    element={<NoItemsOverlay />}>
                </Route>
            </Routes>
        </div>
    );
};

export default AppRoutes;