import { Route, Routes } from "react-router";
import NoItemsOverlay from "../components/NoItemsOverlay/NoItemsOverlay";
import ProductDetails from "../components/Products/ProductDetails/ProductDetails";
import ProductList from "../components/Products/ProductList";

const AppRoutes = (props) => {
    const { selectedCategory } = props;
    return (<Routes>
        <Route
            path=""
            element={<ProductList selectedCategory="home" />}
        ></Route>
        <Route
            path="category/:categoryId"
            element={<ProductList selectedCategory={selectedCategory} />}
        ></Route>
        <Route
            path="products/:productId"
            element={<ProductDetails />}
        ></Route>
        <Route path="*" element={<NoItemsOverlay />}></Route>
    </Routes>);
};

export default AppRoutes;