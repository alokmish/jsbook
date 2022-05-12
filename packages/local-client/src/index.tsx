import "bulmaswatch/cyborg/bulmaswatch.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./state";

import CellList from "./components/CellList";

const App = () => {
  return <CellList />;
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.querySelector("#root")
);
