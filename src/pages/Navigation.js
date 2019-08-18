import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import configureStore from "../store/configureStore.js";
import { StackNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import MainPage from "./MainPage";


const store = configureStore();
const Routes = {
  MainPage: { screen: MainPage }
};
const Navigator = createStackNavigator(Routes, {
  headerMode: 'screen'
});

const App = createAppContainer(Navigator);

export class Navigation extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }

}

function mapStateToProps(state) {
  return {
    clients_list: state.clients_list
  }
}
export default connect(mapStateToProps)(Navigation);
