import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { BrowserRouter } from "react-router-dom"; // Det här är din Router-komponent
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import { reducers } from "./reducers";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "no"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });

const loadingMarkup = (
  <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
    <h2> Loading... </h2>
  </div>
);

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Byt ut ReactDOM.render med createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={loadingMarkup}>
    <Provider store={store}>
      <BrowserRouter>
        {" "}
        {/* Denna komponent måste omsluta hela applikationen */}
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>
);
