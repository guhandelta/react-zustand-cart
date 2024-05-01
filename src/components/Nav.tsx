import { Link } from "react-router-dom";

import "../App.css";

export const Nav = () => {



    return (
        <nav className="nav-container">
        <ul className="nav">
            <li className="nav-item">
            <Link to="/">Products</Link>
            </li>
            <li className="nav-item">

            </li>
        </ul>
        </nav>
    );
};