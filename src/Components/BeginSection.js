import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import "./BeginSection.css";
import { Search2Icon } from "@chakra-ui/icons";

export default function BeginSection() {
  return (
    <div className="BeginSection">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.300" />}
        />
        <Input variant="unstyled" placeholder="Search..." />
      </InputGroup>
    </div>
  );
}
