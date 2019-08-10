import React from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <a href="#" className="navbar-brand">Rule Engine</a>
                <ul className="navbar-nav nav-tabs">
                    <li className="nav-link">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="nav-link">
                        <NavLink to="/About">About</NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;