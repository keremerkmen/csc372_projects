// src/components/Header.js
import React from "react";
import logo from "../assets/images/logo.png";

function Header() {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="URI Sailing Team Logo" className="logo" />
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/roster">Roster</a></li>
            <li><a href="/recruitment">Recruitment</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/schedule">Schedule</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
