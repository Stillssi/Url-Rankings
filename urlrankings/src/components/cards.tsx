import React, { useRef, useCallback } from "react";
import data from "../assets/data.json";
import styled from "styled-components";
import { UilAngleLeftB, UilAngleRightB } from "@iconscout/react-unicons";

const colors = ["#C7F8FF", "#CBC1DE", "#F58F8A", "#E0D8C5", "#D2FFAD"];
interface IData {
  url: string;
  num: number;
  ping: boolean | number; // ping이 boolean임
  time: number;
}
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
  margin-bottom: 8px;
  text-align: center;
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
    transform: scale(1.1) translate(0%, 10%);
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
  width: 250px;
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
  const sortedData: IData[] = [...data].sort((a, b) => b.num - a.num);

  const scrollCards = useCallback((offset: number) => {
    if (cardsRef.current) {
      cardsRef.current.scrollTo({
        left: cardsRef.current.scrollLeft + offset,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollLeft = useCallback(() => scrollCards(-300), [scrollCards]);
  const scrollRight = useCallback(() => scrollCards(300), [scrollCards]);

  return (
    <CardsWrapper>
      <ButtonPrev onClick={scrollLeft}>
        <UilAngleLeftB />
      </ButtonPrev>
      <CardsContainer ref={cardsRef}>
        {sortedData.map(({ url, num, ping }, idx) => (
          <Card color={colors[idx % colors.length]} key={idx}>
            <div>
              <Rank>{`${idx + 1}등.`}</Rank>
              <Url>{url.slice(8, 34)}</Url>
              <FontWrapper>{`방문 수: ${num}`}</FontWrapper>
              {typeof ping === "number" ? (
                <FontWrapper>{`지연율: ${ping.toFixed(7)} ms`}</FontWrapper>
              ) : (
                <FontWrapper>{`🛠️ ping을 보낼 수 없습니다.`}</FontWrapper>
              )}
            </div>
          </Card>
        ))}
      </CardsContainer>
      <ButtonNext onClick={scrollRight}>
        <UilAngleRightB />
      </ButtonNext>
    </CardsWrapper>
  );
};

export default Cards;
