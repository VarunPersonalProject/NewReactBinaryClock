import {
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "./BeginSection.css";
import { Search2Icon } from "@chakra-ui/icons";
import ServiceWrapper from "../API/ApiWrapper";

export default function BeginSection() {
  const handleEnter = (oEvent) => {
      if (oEvent.code === "Enter" && inputValue) {
        window.location.href = `https://www.google.com/search?q=${inputValue}`;
      }
    },
    handleChange = (oEvent) => {
      setInputValue(oEvent.target.value);
    },
    [inputValue, setInputValue] = useState(""),
    _apiService = new ServiceWrapper();

  return (
    <div className="BeginSection">
      <div>
        <AppIcon />
      </div>
      <InputGroup width={250} className="BeginSection__Input">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.300" />}
        />
        <Input
          onKeyDownCapture={handleEnter}
          onInput={handleChange}
          value={inputValue}
          variant="flushed"
          placeholder="Search..."
        />
      </InputGroup>
    </div>
  );
}

function AppIcon() {
  return (
    <IconButton
      colorScheme="blue"
      icon={
        <Image
          width={10}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK5q0FP74VV9wbfwP378_7kj7iDomHuKrxkXsxDdUT28V9dlVMNUe-EMzaLwaFhneeuZI&usqp=CAU"
        />
      }
    />
  );
}
