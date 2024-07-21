import React, { useState } from "react";
import styled from "styled-components";
import Water from "../../images/water.png";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Cart from "./Cart";

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

export default function MenuContent() {
  const [open, setOpen] = useState(false);

  return (
    <MenuBody>
      <Cart open={open} onClose={() => setOpen(false)} />
      <SingleMenu onClick={() => setOpen(true)}>
        <div className="imageBox">
          <img src={Water.src} alt="Water" />
        </div>
        <p>Wasser</p>
        <span>2,20€</span>
        <button>
          <AddOutlinedIcon style={{ width: "30px", height: "30px" }} />
        </button>
      </SingleMenu>
      <SingleMenu>
        <div className="imageBox">
          <img src={Water.src} alt="Water" />
        </div>
        <p>Wasser</p>
        <span>2,20€</span>
        <button>
          <AddOutlinedIcon style={{ width: "30px", height: "30px" }} />
        </button>
      </SingleMenu>
      <SingleMenu>
        <div className="imageBox">
          <img src={Water.src} alt="Water" />
        </div>
        <p>Wasser</p>
        <span>2,20€</span>
        <button>
          <AddOutlinedIcon style={{ width: "30px", height: "30px" }} />
        </button>
      </SingleMenu>
      <SingleMenu>
        <div className="imageBox">
          <img src={Water.src} alt="Water" />
        </div>
        <p>Wasser</p>
        <span>2,20€</span>
        <button>
          <AddOutlinedIcon style={{ width: "30px", height: "30px" }} />
        </button>
      </SingleMenu>
      <SingleMenu>
        <div className="imageBox">
          <img src={Water.src} alt="Water" />
        </div>
        <p>Wasser</p>
        <span>2,20€</span>
        <button>
          <AddOutlinedIcon style={{ width: "30px", height: "30px" }} />
        </button>
      </SingleMenu>
      <SingleMenu>
        <div className="imageBox">
          <img src={Water.src} alt="Water" />
        </div>
        <p>Wasser</p>
        <span>2,20€</span>
        <button>
          <AddOutlinedIcon style={{ width: "30px", height: "30px" }} />
        </button>
      </SingleMenu>
    </MenuBody>
  );
}
