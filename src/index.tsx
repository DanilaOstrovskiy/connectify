import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import App from "./App/App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/redux-store";

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>,
    document.getElementById("root"),
);
