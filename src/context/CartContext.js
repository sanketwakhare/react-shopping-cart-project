import { createContext, useContext, useState } from 'react';
import Product from './../components/Products/Product';

const CartContext = createContext();

export const useCartContext = () => {
    return useContext(CartContext);
};

const CartContextProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (product) => {
        setCartItems((prevCartItems) => {
            let newCartItems = [].concat(prevCartItems);
            let existingItem = newCartItems.find(item => item.product.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                newCartItems.push({ product: product, quantity: 1 });
            }
            return newCartItems;
        })
    };

    const removeItemFromCart = (product) => {
        setCartItems((prevCartItems) => {
            let newCartItems = [].concat(prevCartItems);
            let existingItem = newCartItems.find(item => item.product.id === product.id);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity--;
                } else {
                    newCartItems = newCartItems.filter(item => item.product.id !== product.id);
                }
            }
            return newCartItems;
        });
    };

    return <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart }}>
        {children}
    </CartContext.Provider>;
};

export default CartContextProvider;

// TODO: create custom hook for useCartContext and Provider here