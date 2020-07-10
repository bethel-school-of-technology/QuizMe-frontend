import React from 'react';
import {Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Quiz from './Quiz';
import SelectCategory from './SelectCategory';
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import Highscores from "./Highscores"
import MusicButton from './MusicButton';

function App() {
  return (
      <Router>
        <MusicButton/>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/Login" component={Login} exact/>
          <Route path="/Logout" component={Logout} exact/>
          <Route path="/Highscores" component={Highscores} exact/>
          <Route path="/SelectCategory" component={SelectCategory} exact/>
          <Route path="/Quiz/:category" render={(props) => {
            return <Quiz {...props}/>
          }}></Route>
          <Route render={() => <Redirect to="/"/>}/>
        </Switch>
      </Router>
  );
}

export default App;
