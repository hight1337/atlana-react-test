import React from "react";

interface ErrorProps {}

const Error: React.FC<ErrorProps> = ({}) => {
  return (
    <div className="notFound">
      <p>404 Page Not Found</p>
    </div>
  );
};

export default Error;
