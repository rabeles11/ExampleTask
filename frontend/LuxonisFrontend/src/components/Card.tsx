import React from "react";
import styled from "styled-components";

interface CardProps {
  imageSrc: string;
  headline: string;
}

const CardContainer = styled.div`
  border: 1px solid #ccc;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  background-color: white;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

const CardHeadline = styled.h2`
  margin-top: 16px;
  font-size: 1.5rem;
  color: #333;
`;

const Card: React.FC<CardProps> = ({ imageSrc, headline }) => {
  return (
    <CardContainer>
      <CardImage src={imageSrc} alt="Card" />
      <CardHeadline>{headline}</CardHeadline>
    </CardContainer>
  );
};

export default Card;
