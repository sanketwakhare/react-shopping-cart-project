import React, { useState } from "react";
import "./style.scss";

import Header from "./components/Header/Header";

import { Provider } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import store from "./store";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("home");

  return (
    <div>
      {/* redux provider */}
      <Provider store={store}>
        <Header
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="main-container">
          <AppRoutes selectedCategory={selectedCategory} />
        </div>
      </Provider>
    </div>
  );
}
