import React from "react";
import styled from "styled-components";

const Button = ({ children, ...hoji }) => {
  return (
    // 백승호
    <ButtonStyled {...hoji}>{children}</ButtonStyled>
  );
};

export default Button;

//!백승호
const ButtonStyled = styled.button`
  background-color: ${({ color }) => color};
`;
