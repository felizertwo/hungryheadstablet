import React from "react";
import styled from "styled-components";
import Logo from "../../images/logo.png";
import ColdDrinksIcon from "../../images/ColdDrinks.png";
import HotDrinksIcon from "../../images/HotDrinks.png";
import SnacksIcon from "../../images/Snacks.png";
import TabbedPanel from "./TabbedPanel";
import MenuContent from "./MenuContent";

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

const MenuBody = styled.div`
  width: 100%;
`;

export default function MenuPage() {
  const tabs = [
    {
      label: "Cold Drinks",
      content: <MenuContent />,
      image: ColdDrinksIcon.src,
    },
    {
      label: "Hot Drinks",
      content: <MenuContent />,
      image: HotDrinksIcon.src,
    },
    { label: "Snacks", content: <MenuContent />, image: SnacksIcon.src },
  ];

  return (
    <MenuWrapper>
      <div className="menuHead">
        <img src={Logo.src} alt="Menu Logo" />
      </div>
      <MenuBody>
        <TabbedPanel tabs={tabs} />
      </MenuBody>
    </MenuWrapper>
  );
}
