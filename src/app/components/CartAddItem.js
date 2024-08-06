import { Drawer } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
`import {useCart} from "@/app/context/CartContext";`;

const CartBody = styled.div`
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 150px;

  .selectedImage {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 20px;
  }

  .foodName {
    font-size: 25px;
    margin: 15px 0;
  }

  .description {
    font-size: 26px;
    color: #999999;
    margin: 0;
    margin-bottom: 15px;
  }

  .price {
    margin: 0;
    font-size: 30px;
    font-weight: 600;
  }
`;

const StyledDrawer = styled(Drawer)`
  .MuiPaper-root {
    border-radius: 16px 16px 0 0;
    overflow: hidden;
  }
`;

const SideInfo = styled.div`
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  width: 93%;
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  margin-top: 100px;

  h2 {
    font-size: 26px;
    margin: 0;
    margin-bottom: 20px;
  }

  label {
    font-size: 28px;
    font-weight: 500;
    display: flex;
    align-items: center;
    margin: 10px 0;

    input[type="checkbox"] {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 25px;
      height: 25px;
      border: 2px solid black;
      border-radius: 4px;
      margin-right: 20px;
      position: relative;
      cursor: pointer;
    }

    input[type="checkbox"]:checked {
      background-color: #c86a61;
      border: 2px solid #c86a61;
    }

    input[type="checkbox"]:checked::after {
      content: "✔";
      font-size: 18px;
      color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0;
  width: calc(100% - 30px);
  position: absolute;
  bottom: 0;

  .firstBox {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .backbutton {
      background: #f2f2f2;
      border: none;
      border-radius: 10px;
      color: black;
      padding: 0 20px;
      height: 50px;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      margin-right: 10px;
    }

    .changeAmount {
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border: 1px solid #dbdbdb;
      border-radius: 10px;
      height: 50px;
      width: 50px;
      margin: 0 5px;
    }

    .amount {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #eeeeee;
      border: 1px solid #00000029;
      border-radius: 10px;
      height: 50px;
      width: 50px;
      margin: 0 5px;
      font-size: 20px;
    }

    .priceCalculation {
      display: flex;
      flex-direction: column;
      margin-left: 10px;

      span {
        margin: 0;
        font-size: 13px;
        color: #999999;
        text-transform: capitalize;
      }

      p {
        margin: 0;
        font-size: 25px;
        font-weight: 600;
      }
    }
  }

  .addToCart {
    background: black;
    border: none;
    border-radius: 10px;
    color: white;
    padding: 0 20px;
    height: 50px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
`;

export default function CartAddItem({
  open,
  onClose,
  foodItem,
  addToCartHandler,
}) {
  const [amount, setAmount] = useState(1);

  const increaseAmount = () => {
    setAmount((prevState) => prevState + 1);
  };

  const decreaseAmount = () => {
    setAmount((prevState) => (prevState === 1 ? 1 : prevState - 1));
  };

  const addToCart = () => {
    addToCartHandler(foodItem, amount);
    onClose();
  };

  return (
    <StyledDrawer open={open} onClose={onClose} anchor="bottom">
      <CartBody>
        <img className="selectedImage" src={foodItem.image} />
        <h2 className="foodName">{foodItem.name}</h2>
        <span className="description">{foodItem.description}</span>
        <p className="price">{foodItem.price} €</p>
        <Bottom>
          <div className="firstBox">
            <button className="backbutton" onClick={onClose}>
              <ArrowBackIosNewOutlinedIcon
                style={{ marginRight: 5, fontSize: 20 }}
              />
              Zurück
            </button>
            <button className="changeAmount" onClick={decreaseAmount}>
              <RemoveOutlinedIcon style={{ fontSize: 30 }} />
            </button>
            <div className="amount">{amount}</div>
            <button className="changeAmount">
              <AddOutlinedIcon
                onClick={increaseAmount}
                style={{ fontSize: 30 }}
              />
            </button>
            <div className="priceCalculation">
              <span>price</span>
              <p>{(foodItem.price * amount).toFixed(2)}€</p>
            </div>
          </div>
          <button className="addToCart" onClick={addToCart}>
            Hinzufügen
          </button>
        </Bottom>
      </CartBody>
    </StyledDrawer>
  );
}
