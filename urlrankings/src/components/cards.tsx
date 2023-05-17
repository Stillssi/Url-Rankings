import React, { useRef } from "react";
import { data } from "../assets/data";
import styled from "styled-components";
import { UilAngleLeftB, UilAngleRightB } from "@iconscout/react-unicons";
const colors = ["#C7F8FF", "#CBC1DE", "#F58F8A", "#E0D8C5", "#D2FFAD"];
const CardsWrapper = styled.div`
  display: flex;
  height: 500px;
  position: relative;
`;
const CardsContainer = styled.div`
  display: flex;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const FontWrapper = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Button = styled.button`
  position: absolute;
  top: 15%;
  background: white;
  border-radius: 1rem;
  border: none;
  height: 100px;
  cursor: pointer;
  z-index: 3;
`;

const ButtonPrev = styled(Button)`
  left: 10px;
`;

const ButtonNext = styled(Button)`
  right: 10px;
`;

const Card = styled.div`
  display: flex;
  width: 300px;
  height: 250px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  margin-right: 20px;
  border-radius: 1rem;
  flex-shrink: 0;
  transition: all 0.3s;
  position: relative;

  &:hover {
    transform: scale(1.1) translate(10%, 10%);
    border-radius: 0.91rem; // Adjust this value as per your need
    z-index: 1;
  }
`;

const Rank = styled(FontWrapper)`
  font-size: 25px;
  text-align: center;
  margin-bottom: 10px;
`;

const Url = styled(FontWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 25px;
  background-color: white;
  height: 35px;
  border-radius: 1rem;
`;

const Cards: React.FC = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const sortedData = [...data].sort((a, b) => b.num - a.num);

  const scrollCards = (offset: number) => {
    if (cardsRef.current) {
      cardsRef.current.scrollTo({
        left: cardsRef.current.scrollLeft + offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <CardsWrapper>
      <ButtonPrev onClick={() => scrollCards(-300)}>
        <UilAngleLeftB />
      </ButtonPrev>
      <CardsContainer ref={cardsRef}>
        {sortedData.map((itm, idx) => {
          return (
            <Card color={colors[idx % colors.length]}>
              <div>
                <Rank>{idx + 1 + "등."}</Rank>
                <Url>{itm.url}</Url>
                <FontWrapper>{"방문 수: " + itm.num}</FontWrapper>
                <FontWrapper>
                  {"지연율: " + itm.ping.toFixed(7) + " ms"}
                </FontWrapper>
              </div>
            </Card>
          );
        })}
      </CardsContainer>
      <ButtonNext onClick={() => scrollCards(300)}>
        <UilAngleRightB />
      </ButtonNext>
    </CardsWrapper>
  );
};

export default Cards;
