import React from 'react'; // ES6 js
import { Link } from 'react-router-dom'

function Nav() {
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark top">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMainMenu" aria-controls="navMainMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navMainMenu" class="navbar-collapse collapse">
            <div class="navbar-nav ml-auto">
                <Link to='/login' className="nav-item nav-link active">Login</Link>
                <Link to='/signup' className="nav-item nav-link">Sign Up</Link>
            </div>
        </div>
    </nav>
}

export default Nav;
