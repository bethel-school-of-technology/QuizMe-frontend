import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import Quiz from './Quiz';
import SelectCategory from './SelectCategory';
import Home from "./Home";
import Login from "./Login";
import Highscores from "./Highscores"

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/Login" component={Login} exact/>
          <Route path="/Highscores" component={Highscores} exact/>
          <Route path="/SelectCategory" component={SelectCategory}/>
          <Route path="/Quiz/:category" render={(props) => {
            return <Quiz {...props}/>
          }}></Route>
          <Route path="/Quiz/" render={(props) => {
            return <Quiz {...props}/>
          }} exact></Route>
        </Switch>
      </Router>
  );
}

export default App;
