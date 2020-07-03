import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  // cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  z-index: 0;
`;

export default function Card(props) {
  return <Wrapper>{props.title}</Wrapper>;
}
