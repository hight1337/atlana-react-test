import React from "react";
import { FormControl, InputGroup, Row } from "react-bootstrap";

interface InputComponentProps {
  inputSize: "sm" | "lg";
  inputValue: string;
  onChange: (e: any) => void;
  placeholderText: string;
}

export const InputComponent: React.FC<InputComponentProps> = ({
  inputSize,
  inputValue,
  onChange,
  placeholderText,
}) => {
  return (
    <Row>
      <InputGroup size={inputSize}>
        <FormControl
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          value={inputValue}
          onChange={(e: any) => onChange(e)}
          placeholder={placeholderText}
        />
      </InputGroup>
    </Row>
  );
};
