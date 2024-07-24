import React from "react";
import styled from "styled-components";
import CheckIcon from "../../images/check.png";
import PlusIcon from "../../images/plus.png";
import Image from 'next/image';

const CircleBtn = styled.div`
  background: ${(props) => (props.added ? "#19A400" : "#c86a61")};
  height: 60px;
  width: 60px;
  border-radius: 50%;
  color: #ffffff;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  cursor: pointer;
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

export function MenuTabContent({tabItems, selectItemHandler, addedItems}) {
    return  <MenuBody>{tabItems.map((item, index) => {
        const added = addedItems.includes(item.id)
        return (

            <SingleMenu key={item.category_id + "." + index} onClick={() => selectItemHandler(item)}>
                <div className="imageBox">
                    <img src={item.image} alt={item.name}/>
                </div>
                <p>{item.name}</p>
                <span>{item.price}€</span>
                <CircleBtn added={added ? "added" :  undefined}>
                    <Image
                        src={added ? CheckIcon : PlusIcon}
                        alt={added ? "Added" : "Add"}
                        width={30}
                        height={30}
                    />
                </CircleBtn>
            </SingleMenu>
        );
    })}</MenuBody>;
}