import React from "react";
import styled from "styled-components";
import Card from "./Card";
import Test from "../assets/test.jpeg";

const BodyWrapper = styled.div`
  background-color: smoke-white;
  margin: 0 auto;
  padding: 0vw 7vw;
`;

const CardWrapper = styled.div`
  background-color: smoke-white;
  margin: 0 auto;
  display: grid;
  padding-top: 5vh;
  grid-template-columns: repeat(5, 1fr); // This will create 5 columns
  gap: 3vw; // Adjust the gap between cards as needed
`;

function BodyContainer() {
  const cardArray = new Array(50).fill(null);

  return (
    <BodyWrapper>
      <CardWrapper>
        {cardArray.map((_, index) => (
          <Card headline="TestCard" imageSrc={Test} key={index} />
        ))}
      </CardWrapper>
    </BodyWrapper>
  );
}

export default BodyContainer;
