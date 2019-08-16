import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {Home} from './Home';
import {About} from './About';

export class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <a className="navbar-brand" href="#">Webpack Test</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div id="navbarSupportedContent" className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li data-arg1="Home" className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li data-arg1="About" className="nav-item">
                                    <Link className="nav-link" to="About">About</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="main-content">
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/About" component={About}></Route>
                </div>
            </BrowserRouter>
        );
    }
}