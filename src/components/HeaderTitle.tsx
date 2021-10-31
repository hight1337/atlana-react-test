import React from "react";
import { Row } from "react-bootstrap";

interface HeaderTitleProps {}

export const HeaderTitle: React.FC<HeaderTitleProps> = () => {
  return (
    <Row>
      <h1>GitHub Searcher</h1>
    </Row>
  );
};
