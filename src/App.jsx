import React from "react";
import "./styles/form.scss";
import "./styles/style.scss";

import Header from "./components/Header/Header";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppRoutes from "./routes/AppRoutes";
import store, { persistor } from "./store";

export default function App() {
  return (
    <div>
      {/* redux provider */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <AppRoutes />
        </PersistGate>
      </Provider>
    </div>
  );
}
