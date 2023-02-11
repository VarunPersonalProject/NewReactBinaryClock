import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "./BeginSection.css";
import { Search2Icon } from "@chakra-ui/icons";

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
    { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <div className="BeginSection">
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
      </InputGroup>{" "}
      <div>
        <Link onClick={onToggle} className="BeginSection__Link">
          Add Links
        </Link>
        <Popover
          className="PopUp"
          returnFocusOnClose={false}
          isOpen={isOpen}
          onClose={onClose}
          placement="bottom-start"
          closeOnBlur={true}
        >
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input />
              </FormControl>
            </PopoverBody>
            <PopoverFooter display="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                <Button onClick={onClose} variant="outline">
                  Cancel
                </Button>
                <Button colorScheme="red">Apply</Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
