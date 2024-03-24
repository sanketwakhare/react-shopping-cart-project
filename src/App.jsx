import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import store, { persistor } from "./store";
import "./styles/form.scss";
import "./styles/style.scss";

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
