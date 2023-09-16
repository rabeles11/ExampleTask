import React, { useState } from "react";
import styled from "styled-components";

interface imageObject {
  href: string;
}

interface CardProps {
  images: imageObject[];
  headline: string;
}

const CardContainer = styled.div`
  border: 1px solid #ccc;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0px;
  background-color: white;
  background-color: #1c325a;
  position: relative;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;

const CardHeadline = styled.h2`
  margin-top: 16px;
  font-size: 1.5rem;
  color: white;
`;

const CardControls = styled.h2`
  background-color: #1c325a;
`;

const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  outline: none !important;
  font-size: 3rem;
  padding: 0vw 3vw;
  cursor: pointer;
  position: relative;
  z-index: 2;
`;

const LeftArrow = styled(ArrowButton)``;

const RightArrow = styled(ArrowButton)``;

const Card: React.FC<CardProps> = ({ images, headline }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <CardContainer>
      <CardImage
        src={
          (images &&
            images[currentImageIndex] &&
            images[currentImageIndex].href) ||
          "[]"
        }
        alt="Card"
      />
      <CardControls>
        <LeftArrow onClick={handlePrevImage}>&lt;</LeftArrow>
        <RightArrow onClick={handleNextImage}>&gt;</RightArrow>
      </CardControls>
      <CardHeadline>{headline}</CardHeadline>
    </CardContainer>
  );
};

export default Card;
