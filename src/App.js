import './App.css';
import React from 'react';
import {Switch, BrowserRouter as Router,Route,withRouter} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

const App = () => (
<Router>  
  <div className = 'App'>
  <Switch>
    <Route path="/" exact component={withRouter(Login)}/>
    <Route path="/register"  component={withRouter(Register)} />
    <Route path="/home/:id" component = {withRouter(Home)} />
  </Switch>
  </div>
</Router>
)

export default App;
