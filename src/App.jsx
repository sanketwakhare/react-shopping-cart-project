import React from "react";
import "./styles/form.scss";
import "./styles/style.scss";

import Header from "./components/Header/Header";

import { Provider } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import store from "./store";

export default function App() {
  return (
    <div>
      {/* redux provider */}
      <Provider store={store}>
        <Header />
        <AppRoutes />
      </Provider>
    </div>
  );
}
