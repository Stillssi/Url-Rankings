import React from "react";
import Cards from "../components/cards";
import { styled } from "styled-components";

const MainWrapper = styled.div`
  margin: 200px 30px 0 30px;
`;
const H2 = styled.div`
  display: flex;
  width: 500px;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin-bottom: 30px;
  border-radius: 1rem;
  font-size: 30px;
  font-weight: 600;
`;
const Main: React.FC = () => {
  return (
    <MainWrapper>
      <H2>내가 가장 많이 접속한 사이트는...</H2>
      <Cards />
    </MainWrapper>
  );
};

export default Main;
