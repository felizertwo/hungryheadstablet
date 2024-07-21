"use client";

import React, { useState } from "react";
import styled, { css } from "styled-components";
import StarterPage from "./components/StarterPage";
import MenuPage from "./components/MenuPage";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const SlideWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200%; // Since there are 2 pages, set this to 200%
  height: 100%;
  display: flex;
  transition: transform 0.5s ease-in-out;

  ${({ slideIndex }) => css`
    transform: translateX(-${slideIndex * 100}vw);
  `}
`;

const StepWrapper = styled.div`
  width: 100vw; // Each page occupies full viewport width
  height: 100vh; // Each page occupies full viewport height
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default function Page() {
  const [slideIndex, setSlideIndex] = useState(0);

  const goToNextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  return (
    <Container>
      <SlideWrapper slideIndex={slideIndex}>
        <StepWrapper>
          <StarterPage goToNextSlide={goToNextSlide} />
        </StepWrapper>
        <StepWrapper>
          <MenuPage />
        </StepWrapper>
      </SlideWrapper>
    </Container>
  );
}
