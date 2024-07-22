"use client"
import {createContext, useContext, useEffect, useState} from "react";

const CartContext = createContext();

const CART_ITEMS_STORAGE_KEY = 'cartItems';

const isExpired = (dateToCheck) => {
    const today = new Date();
    const inputDate = new Date(dateToCheck);


    return (
        today.getFullYear() === inputDate.getFullYear() &&
        today.getMonth() === inputDate.getMonth() &&
        today.getDate() === inputDate.getDate()
    );
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [netTotal, setNetTotal] = useState(0);
    const [nonEmpty, setNonEmpty] = useState(false);
    const [count, setCount] = useState(false);
    const tax = .19;

    useEffect(() => {
        const value = localStorage.getItem(CART_ITEMS_STORAGE_KEY);
        if (!value) {
            return;
        }

        const {storedCartItems, date} = JSON.parse(value);

        // NOTE:
        // Check if food items in localStorage (LS) are older than today's date. If they are, they are rejected.
        // The MenuContext and additional logic using item IDs could be implemented for more refined filtering and management of food items.
        // However, for now, we are using this simple logic to filter out items not from today.

        if (storedCartItems && isExpired(date)) {
            setCartItems(storedCartItems);
        } else {
            localStorage.setItem(CART_ITEMS_STORAGE_KEY, null);
        }
    }, []);

    // Listen for storage events to synchronize cart items across tabs
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === CART_ITEMS_STORAGE_KEY) {
                setCartItems(JSON.parse(event.newValue) || []);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const total = cartItems.reduce((total, item) => total + item.item.price * item.quantity, 0);
        setTotal(total);
        setNetTotal(total - (total * tax));
        setTotal(cartItems.reduce((total, item) => total + item.item.price * item.quantity, 0));
        setNonEmpty(cartItems.length !== 0);
        setCount(cartItems.map(({quantity}) => quantity).reduce((total, quantity) => total + quantity, 0))
    }, [cartItems]);

    // Save cart items to local storage whenever they change
    useEffect(() => {
        localStorage.setItem(CART_ITEMS_STORAGE_KEY, JSON.stringify({storedCartItems: cartItems, date: new Date().toISOString()}));
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