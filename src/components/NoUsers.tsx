import React from "react";
import { Row } from "react-bootstrap";

interface NoUsersProps {}

export const NoUsers: React.FC<NoUsersProps> = ({}) => {
  return (
    <Row>
      <p
        style={{
          fontSize: 25,
          color: "rgb(194, 194, 194",
          textAlign: "center",
        }}
      >
        No users found
      </p>
    </Row>
  );
};
