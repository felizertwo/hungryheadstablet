'use client'

import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Logo from "../../images/logo.png";
import ColdDrinksIcon from "../../images/ColdDrinks.png";
import HotDrinksIcon from "../../images/HotDrinks.png";
import SnacksIcon from "../../images/Snacks.png";
import TabbedPanel from "../components/TabbedPanel";
import {useApi} from "@/app/context/ApiContext";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CartAddItem from "@/app/components/CartAddItem";

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
`;

const MenuBody = styled.div`
  background: #f4f4f4;
  height: 100vh;
  padding: 40px;
  padding-bottom: 300px;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const SingleMenu = styled.div`
  flex: 1 1 calc(50% - 40px);
  position: relative;
  box-sizing: border-box;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .imageBox {
    background: white;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 100%;
    position: relative;
    margin-bottom: 20px;

    img {
      position: absolute; /* Position image absolutely within the container */
      width: 45%;
      object-fit: contain;
      max-height: 100%; /* Ensure image doesn't exceed its container */
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); /* Center image */
    }
  }

  p {
    margin: 10px 0;
    font-size: 24px;
    font-weight: 600;
  }

  span {
    margin-bottom: 10px;
    font-size: 20px;
  }

  button {
    height: 50px;
    width: 50px;
    background: #c86a61;
    border-radius: 100%;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;



//TODO: WHAT NEED TO DO:
//TODO: 1. DISCUSS WITH BACKEND DEVELOPER ABOUT TAB(Cold Drinks, Hot Drinks, Snacks)
//TODO: 2. MARK + BUTTON WITH ANOTHER COLOR WHEN ITEM IS ADDED TO CART
//TODO: 3. ADD BUTTON/LINK TO ROUTE CHECKOUT PAGE
//TODO: 4. ADD ERROR HANDLING
export default function MenuPage() {
  const [tabs, setTabs] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const api = useApi();

  const selectItem = (item) => {
      console.log("set selectedItem to ", item)
      setSelectedItem(item);
  };

    useEffect(   () =>  {

        const fetchFood = async () => {
            const items = await api.foodItems();

            if(!items){
                //TODO: Need to add error handling
                return;
            }

            const categoryMap = new Map();

            items
                .map((item) => item.food_category)
                .forEach(({ id, name }) => categoryMap.set(id, name));

            const categories = Array.from(categoryMap.entries()).map(([key, value]) => {
                return { id: key, name: value };
            });

            setTabs(categories.map(category => {
                const itemsTabs = items.filter(({food_category_id}) => food_category_id === category.id);
                return {
                    label: category.name,
                    content:  <MenuBody>{itemsTabs.map((item, index) => (
                        <SingleMenu key={item.category_id + "." + index} onClick={() =>  selectItem(item)}>
                            <div className="imageBox">
                                <img src={item.image} alt={item.name}/>
                            </div>
                            <p>{item.name}</p>
                            <span>{item.price}€</span>
                            <button>
                                <AddOutlinedIcon style={{width: "30px", height: "30px"}}/>
                            </button>
                        </SingleMenu>
                    ))}</MenuBody>,
                    image: ColdDrinksIcon.src//FIXME: it is necessary to use appropriate picture
                };
            }));
        }

         fetchFood();
    }, []);

    useEffect(() => {}, []);

  useEffect(() => {
      console.log(selectedItem);
  }, [selectedItem]);

  return (
    <MenuWrapper>
      <div className="menuHead">
        <img src={Logo.src} alt="Menu Logo" />
      </div>
      <MenuTabBody>
          {selectedItem && ( <CartAddItem open={selectedItem} onClose={() => selectItem(null)} foodItem={selectedItem}  />)}
        <TabbedPanel tabs={tabs} />
      </MenuTabBody>
    </MenuWrapper>
  );
}
