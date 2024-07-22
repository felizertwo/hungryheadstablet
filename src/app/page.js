'use client'

import React from "react";
import styled from "styled-components";
import Ginger from "../images/ginger.png";
import { useRouter } from "next/navigation";

const StartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
  height: 100vh;
  width: 100%;

  .header {
    width: 100%;
    height: 65vh;

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
    justify-content: flex-start;
    height: 35vh;
    width: 100%;
    padding-top: 30px;

    span {
      color: #c86a61;
      font-size: 34px;
    }

    h2 {
      margin: 0;
      margin: 20px 0;
      text-align: center;
      font-size: 70px;
      line-height: 70px;
      color: #000000;
    }

    button {
      width: 50%;
      padding: 40px 10px;
      color: #000000;
      border-radius: 40px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      border: none;
      outline: none;
      font-size: 34px;
      font-weight: 600;
      background: white;
    }
  }
`;

export default function StarterPage() {
  const router = useRouter();
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
