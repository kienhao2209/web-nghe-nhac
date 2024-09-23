import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import { Provider } from "react-redux";
import store from "./store"; // Import your Redux store
import Register from "./Admin/component/Login/Register";
import {MenuPlayList} from "./Components/MenuPlayList";

function App() {
  return (
    <div className="">
      <Router>
        <Provider store={store}> 
          <Switch>
            <Route path="/register" component={Register} exact />
            <Route path="/admin" component={AdminRoutes} />
            <Route path="/" component={UserRoutes} />
          </Switch>
        </Provider>
      </Router>
      <MenuPlayList />
      <div className="background"></div>
    </div>
  );
}

export default App;