"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../../images/logo.png";
import TabbedPanel from "../components/TabbedPanel";
import { useApi } from "@/app/context/ApiContext";
import CartAddItem from "@/app/components/CartAddItem";
import { MenuTabContent } from "@/app/components/MenuTabContent";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

const MenuWrapper = styled.div`
  height: 100%;
  width: 100%;

  .menuHead {
    padding: 20px 40px;

    img {
      height: 70px;
      object-fit: contain;
    }
  }
`;

const MenuTabBody = styled.div`
  width: 100%;
  height: 100%;
  background: #f4f4f4;
`;

const CartFloater = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000000;
  color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  box-shadow: 0 -2px 30px #00000014;
  padding: 20px 50px;
  box-sizing: border-box;
  z-index: 1000;
`;

const CartTotal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  p {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 21px;
    line-height: 36px;
    color: #ffffff;
    margin: 0;
    padding: 0;
  }

  .gesamt {
    margin: 0;
    font-size: 17px;
    color: #999999;
    text-transform: capitalize;
  }

  .summer {
    font-size: 28px;
  }

  h4 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 40px;
    font-weight: bold;
    color: #ffffff;
    margin: 0;
    padding: 0;
  }
`;

const BtnCartTotal = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  background-color: #ffffff;
  color: #000000;
  border-radius: 10px;
  border: 0;

  padding: 20px 45px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;

  h4 {
    margin: 0;
  }
`;

const CircleAmount = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ffffff;
  color: #ffffff;
  background-color: #19a400;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 21px;
`;

//TODO: WHAT NEED TO DO:
//TODO: 1. DISCUSS WITH BACKEND DEVELOPER ABOUT TAB(Cold Drinks, Hot Drinks, Snacks) and their pictures
//TODO: 2. MARK + BUTTON WITH ANOTHER COLOR WHEN ITEM IS ADDED TO CART ✓
//TODO: 3. ADD BUTTON/LINK TO ROUTE CHECKOUT PAGE
//TODO: 4. ADD ERROR HANDLING
export default function MenuPage() {
  const [tabs, setTabs] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const api = useApi();
  const cart = useCart();

  const selectItem = (item) => {
    setSelectedItem(item);
  };

  const addToCart = (item, amount) => {
    cart.addItemToCart(item, amount);
  };

  useEffect(() => {
    const fetchFood = async () => {
      const items = await api.foodItems();

      if (!items) {
        return; //TODO: Need to add error handling
      }

      setFoodItems(items);
    };

    fetchFood();
  }, []);

  const extractCategories = () => {
    const categoryMap = new Map();

    foodItems
      .map((item) => item.food_category)
      .forEach(({ id, name, image }) => categoryMap.set(id, { name, image }));

    return Array.from(categoryMap.entries()).map(([key, value]) => {
      return { id: key, name: value.name, image: value.image };
    });
  };

  useEffect(() => {
    if (!foodItems) {
      return;
    }
    const addedItems = cart.cartItems.map((el) => el.item.id);
    const categories = extractCategories();

    setTabs(
      categories.map((category) => {
        const tabItems = foodItems.filter(
          ({ food_category_id }) => food_category_id === category.id
        );
        return {
          label: category.name,
          content: (
            <MenuTabContent
              tabItems={tabItems}
              selectItemHandler={selectItem}
              addedItems={addedItems}
            />
          ),
          image: category.image,
        };
      })
    );
  }, [foodItems, cart.cartItems]);

  console.log(foodItems);

  return (
    <MenuWrapper>
      <div className="menuHead">
        <img src={Logo.src} alt="Menu Logo" />
      </div>
      <MenuTabBody>
        {selectedItem && (
          <CartAddItem
            open={selectedItem}
            onClose={() => selectItem(null)}
            foodItem={selectedItem}
            addToCartHandler={addToCart}
          />
        )}
        <TabbedPanel tabs={tabs} />
      </MenuTabBody>
      {cart.nonEmpty && (
        <CartFloater>
          <CartTotal>
            <p className="gesamt">Gesamtsumme</p>
            <h4 className="summer">{Number(cart.total).toFixed(2)} €</h4>
          </CartTotal>
          <Link href="/cart" passHref style={{ textDecoration: "none" }}>
            <BtnCartTotal>
              <CircleAmount>{cart.count}</CircleAmount>
              <h4>Bestellen</h4>
            </BtnCartTotal>
          </Link>
        </CartFloater>
      )}
    </MenuWrapper>
  );
}
