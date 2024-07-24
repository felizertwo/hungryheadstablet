"use client"
import {createContext, useContext, useEffect, useState} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [netTotal, setNetTotal] = useState(0);
    const [nonEmpty, setNonEmpty] = useState(false);
    const [count, setCount] = useState(false);
    const tax = .19;


    useEffect(() => {
        const total = cartItems.reduce((total, item) => total + item.item.price * item.quantity, 0);
        setTotal(total);
        setNetTotal(total - (total * tax));
        setTotal(cartItems.reduce((total, item) => total + item.item.price * item.quantity, 0));
        setNonEmpty(cartItems.length !== 0);
        setCount(cartItems.map(({quantity}) => quantity).reduce((total, quantity) => total + quantity, 0))
    }, [cartItems]);

    const addItemToCart = (item, quantity = 1) => {
        if (quantity < 1) {
            throw new Error("Unable to set quantity less than 1");
        }

        const cartItemIndex = cartItems.findIndex(el => el.item.id === item.id);

        if (cartItemIndex === -1) {
            setCartItems([{item, quantity}, ...cartItems]);

        } else {
            const updated = cartItems.map((el, index) => {
                index === cartItemIndex && (el.quantity += quantity);
                return el;
            });

            setCartItems(updated);
        }
    };

    const removeItemFromCart = (item) => {
        const newCartItems = cartItems.filter(el => el.item.id !== item.id);

        if (newCartItems.length === cartItems.length) {
            throw new Error("Unable to remove item because it is not present in cart ");
        }

        setCartItems(newCartItems);
    }

    const cleanCart = () => setCartItems([]);

    const reduceQuantity = (item) => {
        const cartItemIndex = cartItems.findIndex(el => el.item.id === item.id);
        const filtered = cartItems.filter((item, index) => index !== cartItemIndex || item.quantity > 1);
        const updated = filtered.map((item, index) => {
            index === cartItemIndex && (item.quantity--);
            return item;
        });

        setCartItems(updated);
    };


    const includes = (item) => {
        return cartItems.filter(el => el.item.id === item.id).length > 0;
    };

    return (
        <CartContext.Provider
            value={{ cartItems, total, netTotal, tax, addItemToCart, removeItemFromCart, reduceQuantity, cleanCart, includes, nonEmpty, count }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);