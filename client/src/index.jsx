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
    <GoogleOAuthProvider clientId="333408870324-sg7jgq16boo1or6ue6tqk0m40v7rh51l.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
