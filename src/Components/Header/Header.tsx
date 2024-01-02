import React from 'react';

import stackline_logo from '../../Assets/stackline_logo.svg';
import './Header.css';

export function Header() {
    return (
        <header className="header-container">
            <img src={stackline_logo} alt="stackline logo"  className="logo"/>
        </header>
    )
}