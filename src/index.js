import React from "react";
import ReactDOM from "react-dom/client";
import ServiceWrapper from "./api/ApiWrapper";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

const _serviceWrapper = new ServiceWrapper(),
  KEY = "background",
  oRoot = ReactDOM.createRoot(document.getElementById("root")),
  dDate = new Date();
if (!_serviceWrapper.getWithExpiry(KEY)) {
  _serviceWrapper.imgRequest({ url: "/photos/random" }).then((oResponse) => {
    _serviceWrapper.setWithExpiry(
      KEY,
      oResponse.urls.full,
      new Date(dDate.setDate(dDate.getDate() + 1)).setHours(0, 0, 0)
    );
    _serviceWrapper.setBackground(KEY);
  });
} else {
  _serviceWrapper.setBackground(KEY);
}

oRoot.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
