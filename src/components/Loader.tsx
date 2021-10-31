import React from "react";
import { Row, Spinner } from "react-bootstrap";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <Row
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: 700,
      }}
    >
      <Spinner animation="border" variant="info" />
    </Row>
  );
};

export default Loader;
