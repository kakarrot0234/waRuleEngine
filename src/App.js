import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import 'bootstrap/scss/bootstrap.scss';
import './style.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <Navbar></Navbar>
          </div>
        </div>
        <div className="row main-content">
          <div className="col">
            <Route exact path='/' component={Home}></Route>
            <Route path='/About' component={About}></Route>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
