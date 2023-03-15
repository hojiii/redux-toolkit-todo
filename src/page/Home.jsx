import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import List from "../component/List";
import Button from "../component/Button";

const Layout = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;
const Mainbox = styled.div`
  max-width: 1200px;
  min-width: 800px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Headerbox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

function Home() {
  const navigate = useNavigate();

  const navigatetoForm = () => {
    navigate("/form");
  };

  return (
    <Layout>
      <Mainbox>
        <Headerbox>
          <header>todolist</header>
          <div>hojjii</div>
        </Headerbox>
        <Button color={"yellow"} onClick={() => navigate("/form")}>
          할 일 추가하기
        </Button>
        <List isDone={false} />
        <List isDone={true} />
      </Mainbox>
    </Layout>
  );
}

export default Home;
