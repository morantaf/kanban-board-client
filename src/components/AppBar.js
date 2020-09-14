import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  background-color: #375b65;
  height: 50px;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.2);
`;

export default function AppBar() {
  return <Bar />;
}
