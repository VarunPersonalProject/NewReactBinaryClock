import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import "./BeginSection.css";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import ServiceWrapper from "../api/ApiWrapper";

export default function BeginSection() {
  const handleEnter = (oEvent) => {
      if (oEvent.code === "Enter" && inputValue) {
        window.location.href = `https://www.google.com/search?q=${inputValue}`;
      }
    },
    _serviceWrapper = new ServiceWrapper(),
    [links, setLinks] = useState(
      JSON.parse(_serviceWrapper.getStorage("links") || "[]")
    ),
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
          url = new URL(inputValue);
        if (!links.find((oItem) => oItem.host.indexOf(url.host) > -1)) {
          links.push({
            host: url.href,
            link: _serviceWrapper.iconRequest({ url }),
          });
          setLinks(links);
          _serviceWrapper.setStorage("links", JSON.stringify(links));
          inputRef.current.value = "";
          onClose();
        } else {
          alert("Link already exists.");
        }
      } catch (eResponse) {
        setIsInputValid(true);
        inputRef.current.value = "";
      }
    },
    handleRedirect = (oEvent) => {
      const anchor = document.createElement("a");
      anchor.href = oEvent.target.parentElement.ariaLabel;
      anchor.target = "_blank";
      anchor.click();
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
      </InputGroup>
      <div className="BeginSection__IconSection">
        <IconButton
          onClick={onToggle}
          variant="solid"
          colorScheme="linkedin"
          aria-label="Add"
          fontSize="20px"
          icon={<AddIcon />}
        />
        {links.map((oItem, nIndex) => (
          <IconButton
            key={nIndex}
            variant="solid"
            aria-label={oItem.host}
            onClick={handleRedirect}
            fontSize="20px"
            icon={<Image src={oItem.link} />}
          />
        ))}
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
