import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import Navigation from "./pages/Navigation.js";
const store = configureStore();

export default class App extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}