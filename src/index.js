import React from "react";
import ReactDOM from "react-dom/client";
import ServiceWrapper from "./API/ApiWrapper";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

const _serviceWrapper = new ServiceWrapper(),
  KEY = "BG";
if (!_serviceWrapper.getWithExpiry(KEY)) {
  _serviceWrapper.request({ url: "/photos/random" }).then((oResponse) => {
    _serviceWrapper.setWithExpiry(KEY, oResponse.urls.full, 60000);
    _serviceWrapper.setBackground(KEY);
  });
} else {
  _serviceWrapper.setBackground(KEY);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
