import { Drawer } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Crossant from "../../images/Snacks.png";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const CartBody = styled.div`
  height: 80vh;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .selectedImage {
    width: 280px;
    height: 280px;
    object-fit: contain;
  }

  .foodName {
    font-size: 25px;
    margin: 40px 0;
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
  width: 93%;
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
      padding: 20px 45px;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      margin-right: 10px;
    }

    .changeAmount {
      background: white;
      border: 1px solid #dbdbdb;
      border-radius: 10px;
      height: 62px;
      width: 62px;
      margin: 0 5px;
    }

    .amount {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #eeeeee;
      border: 1px solid #00000029;
      border-radius: 10px;
      height: 62px;
      width: 62px;
      margin: 0 5px;
      font-size: 20px;
    }

    .priceCalculation {
      display: flex;
      flex-direction: column;
      margin-left: 15px;

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
    padding: 20px 45px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
`;

export default function Cart({ open, onClose }) {
  return (
    <StyledDrawer open={open} onClose={onClose} anchor="bottom">
      <CartBody>
        <img className="selectedImage" src={Crossant.src} />
        <h2 className="foodName">Croissant</h2>
        <span className="description">Made with French Butter</span>
        <p className="price">3,10 €</p>
        <SideInfo>
          <h2>Headline</h2>
          <label>
            <input type="checkbox" />
            Lorem ipsum
          </label>
          <label>
            <input type="checkbox" />
            Lorem ipsum
          </label>
        </SideInfo>
        <Bottom>
          <div className="firstBox">
            <button className="backbutton">
              <ArrowBackIosNewOutlinedIcon
                style={{ marginRight: 5, fontSize: 20 }}
              />
              Back
            </button>
            <button className="changeAmount">
              <RemoveOutlinedIcon style={{ fontSize: 30 }} />
            </button>
            <div className="amount">1</div>
            <button className="changeAmount">
              <AddOutlinedIcon style={{ fontSize: 30 }} />
            </button>
            <div className="priceCalculation">
              <span>price</span>
              <p>7,10€</p>
            </div>
          </div>
          <button className="addToCart">Add to Cart</button>
        </Bottom>
      </CartBody>
    </StyledDrawer>
  );
}
