import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import Quiz from './Quiz';
import SelectCategory from './SelectCategory';
import './App.css';
import Home from "./Home";
import Login from "./Login";

function App() {
  return (
    <div id="App">
      <Router>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/Login" component={Login} exact/>
          <Route path="/SelectCategory" component={SelectCategory}/>
          <Route path="/Quiz/:category" render={(props) => {
            return <Quiz {...props}/>
          }}>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
