import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./app/stores/index";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormLogin from "./app/modules/FormLogin";
import MemberEdit from "./app/modules/MemberEdit";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<FormLogin />} />
          <Route path="staff-edit" element={<MemberEdit />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
