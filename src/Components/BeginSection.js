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
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import "./BeginSection.css";
import { Search2Icon } from "@chakra-ui/icons";
import ServiceWrapper from "../API/ApiWrapper";

export default function BeginSection() {
  const handleEnter = (oEvent) => {
      if (oEvent.code === "Enter" && inputValue) {
        window.location.href = `https://www.google.com/search?q=${inputValue}`;
      }
    },
    _serviceWrapper = new ServiceWrapper(),
    handleChange = (oEvent) => {
      setInputValue(oEvent.target.value);
    },
    [inputValue, setInputValue] = useState(""),
    inputRef = useRef(),
    [isInputValid, setIsInputValid] = useState(false),
    { isOpen, onToggle, onClose } = useDisclosure(),
    handleAddURL = () => {
      try {
        const inputValue = inputRef.current.value,
          url = new URL(inputValue),
          aLink = _serviceWrapper.getStorage("LINK") || [];
        _serviceWrapper.iconRequest({ url }).then((oResponse) => {
          const imgURL = URL.createObjectURL(oResponse);
          if (aLink.find((oItem) => oItem.host.indexOf(url.host) === -1)) {
            aLink.push({
              host: url.host,
              link: imgURL,
            });
            _serviceWrapper.setStorage("LINK", aLink);
          } else {
            alert("Link already exists.");
          }
        });
      } catch (eResponse) {
        setIsInputValid(true);
        inputRef.current.value = "";
      }
    };

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
          onClose={() => {
            inputRef.current.value = "";
            setIsInputValid(false);
            onClose(...arguments);
          }}
          closeOnBlur={true}
        >
          <PopoverContent>
            <PopoverBody>
              <FormControl>
                <FormLabel>Enter URL.</FormLabel>
                <Input
                  isInvalid={isInputValid}
                  errorBorderColor="crimson"
                  ref={inputRef}
                  autoComplete="off"
                />
              </FormControl>
            </PopoverBody>
            <PopoverFooter display="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                <Button
                  colorScheme="whatsapp"
                  onClick={onClose}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddURL}
                  variant="outline"
                  colorScheme="facebook"
                >
                  Submit
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
