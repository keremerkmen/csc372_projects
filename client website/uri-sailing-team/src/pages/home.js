// src/pages/Home.js
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/App.css";

function Home() {
  const [title, setTitle] = useState("Welcome to the URI Sailing Team");
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Schedule events data for homepage preview
    const scheduleEvents = [
      { date: "February 15, 2025", event: "Winter Regatta" },
      { date: "March 10, 2025", event: "Spring Invitational" },
      { date: "April 5, 2025", event: "Championship Qualifiers" },
      { date: "May 20, 2025", event: "National Championships" },
    ];
    setSchedule(scheduleEvents);
  }, []);

  return (
    <>
      <Header />
      <main>
        <section id="hero" className="hero">
          <h1 onClick={() => setTitle("Welcome to the URI Sailing Team!")}>
            {title}
          </h1>
          <p>Excellence in sailing and sportsmanship</p>
        </section>

        <section id="about" className="container">
          <h2>About Us</h2>
          <p>Welcome to the official homepage of the URI Sailing Team.</p>
        </section>

        <section id="homepage-schedule" className="container">
          <h2>Upcoming Events</h2>
          <div id="schedule-container">
            {schedule.map((event, index) => (
              <div key={index} className="schedule-box">
                <h3>{event.date}</h3>
                <p>{event.event}</p>
              </div>
            ))}
          </div>
          <p><a href="/schedule">See full schedule</a></p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
