// src/pages/Schedule.js
import React, { useEffect, useState } from "react";
import "../styles/App.css";
import logo from "../assets/images/logo.png";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Full schedule events data
    const scheduleEvents = [
      { date: "February 15, 2025", event: "Winter Regatta" },
      { date: "March 10, 2025", event: "Spring Invitational" },
      { date: "April 5, 2025", event: "Championship Qualifiers" },
      { date: "May 20, 2025", event: "National Championships" },
    ];
    setSchedule(scheduleEvents);
  }, []);

  return (
    <div id="root">
      {/* HEADER */}
      <header>
        <div className="container">
          <img src={logo} alt="URI Sailing Team Logo" className="logo" />
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/roster">Our Team</a></li>
              <li><a href="/recruitment">Recruitment</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/schedule">Schedule</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* MAIN: Full Sailing Schedule */}
      <main>
        <section id="schedule-page" className="container">
          <h2>Full Sailing Schedule</h2>
          <div id="schedule-container">
            {schedule.map((event, index) => (
              <div key={index} className="schedule-box">
                <h3>{event.date}</h3>
                <p>{event.event}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="container">
        <h2>Contact Us</h2>
        <p>Email: sailing@uri.edu</p>
        <p>Phone: (401) 874-1000</p>
        <p>Author: Kerem Erkmen</p>
        <p>
          Email: <a href="mailto:kerem@uri.edu">kerem@uri.edu</a>
        </p>
        <p>&copy; 2025 URI Sailing Team. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Schedule;
