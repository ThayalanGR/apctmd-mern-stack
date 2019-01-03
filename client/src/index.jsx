import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import axios from "axios";

// eslint-disable-next-line no-unused-vars
import styles from "./styles/index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Home from "./components/home";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Dashboard from "./components/dashboard";
import reducers from "./reducers";

import authGaurd from "./components/HOCS/authGuard";
import homeGaurd from "./components/HOCS/homeGaurd";

const jwtToken = localStorage.getItem("JWT_TOKEN");
if (jwtToken)
  axios.defaults.headers.common["Authorization"] = `Token ${jwtToken}`;

ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      {
        auth: {
          token: jwtToken,
          isAuthenticated: jwtToken ? true : false
        }
      },
      applyMiddleware(reduxThunk)
    )}
  >
    <BrowserRouter>
      <App>
        <Route exact path="/" component={homeGaurd(Home)} />
        <Route exact path="/signup" component={homeGaurd(SignUp)} />
        <Route exact path="/signin" component={homeGaurd(SignIn)} />
        <Route exact path="/dashboard" component={authGaurd(Dashboard)} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
