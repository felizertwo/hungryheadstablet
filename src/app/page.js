"use client";

import React, { useEffect } from "react";
import styled from "styled-components";
import Ginger from "../images/ginger.png";
import { useRouter } from "next/navigation";
import { useApi } from "@/app/context/ApiContext";
import { useCart } from "@/app/context/CartContext";

const StartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
  width: 100%;

  .header {
    width: 100%;
    height: 50vh;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .startBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    width: 100%;

    span {
      color: #c86a61;
      font-size: 24px;
    }

    h2 {
      margin: 0;
      margin: 15px 0;
      text-align: center;
      font-size: 40px;
      line-height: 40px;
      color: #000000;
    }

    button {
      padding: 25px 40px;
      color: #000000;
      border-radius: 30px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      border: none;
      outline: none;
      font-size: 30px;
      font-weight: 600;
      background: white;
    }
  }

  @media only screen and (min-width: 1350px) and (orientation: landscape) {
    .header {
      height: 60vh;
    }

    .startBody {
      span {
        font-size: 27px;
      }

      h2 {
        font-size: 60px;
        line-height: 60px;
      }

      button {
        width: auto;
        padding: 30px 100px;
        font-size: 27px;
      }
    }
  }
`;

export default function StarterPage() {
  const router = useRouter();
  const cart = useCart();
  const api = useApi();
  useEffect(() => {
    cart.cleanCart();
    api.logoutUser();
  }, []);

  return (
    <StartWrapper>
      <div className="header">
        <img src={Ginger.src} />
      </div>
      <div className="startBody">
        <span>Vital Bar</span>
        <h2>
          Was isst <br /> du heute?
        </h2>
        <button onClick={() => router.push("type")}>Tap to Order</button>
      </div>
    </StartWrapper>
  );
}
