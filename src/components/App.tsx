import "../extensions/ArrayExtension";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import * as React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";

import { About } from "./About";
import { Home } from "./Home";

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
                <div className="main-content ag-theme-balham">
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/About" component={About}></Route>
                </div>
            </BrowserRouter>
        );
    }
}