import React from "react";
import './index.css'
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import "./styles/font.css";
import { Provider } from "react-redux";
import store from "./store/store.js";

import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_CLIENTID}`}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
