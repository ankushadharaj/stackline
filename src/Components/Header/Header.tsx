import React from 'react';

import stackline_logo from '../../Assets/stackline_logo.svg';
import './Header.css';

export default function Header() {
    return (
        <div className="header-container">
            <img src={stackline_logo} alt="stackline logo"  className="logo"/>
        </div>
    )
}