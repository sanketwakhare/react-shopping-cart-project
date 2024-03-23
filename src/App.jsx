import React, { useState } from "react";
import "./styles/form.scss";
import "./styles/style.scss";

import Header from "./components/Header/Header";

import { Provider } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import store from "./store";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSetLogin = (value) => {
    setIsLoggedIn(() => value);
  };

  return (
    <div>
      {/* redux provider */}
      <Provider store={store}>
        <Header
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isLoggedIn={isLoggedIn}
        />
        <AppRoutes
          selectedCategory={selectedCategory}
          handleSetLogin={handleSetLogin}
        />
      </Provider>
    </div>
  );
}
