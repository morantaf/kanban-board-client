import React from "react";
import image from "../img/3594607.jpg";
import styled from "styled-components";

const StyledImage = styled.img`
  height: 450px;
`;

export default function Homepage() {
  return (
    <div>
      <div className="flex-container">
        <div className="flex-item">
          <h1>Organize your tasks, work faster</h1>
          <h2>Your Kanban Board for increased productivity</h2>
          <p></p>
        </div>
        <div className="flex-item">
          <StyledImage src={image} />
        </div>
      </div>
    </div>
  );
}
