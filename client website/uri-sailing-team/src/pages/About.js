// src/pages/About.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/App.css";

function About() {
  return (
    <>
      <Header />
      <main className="container">
        <h2>About the URI Sailing Team</h2>
        <p>
          The URI Sailing Team is a competitive and close-knit group of
          student-athletes dedicated to excellence on and off the water.
          We proudly represent the University of Rhode Island in local,
          regional, and national regattas, showcasing our passion for
          sailing and our commitment to sportsmanship.
        </p>
        <p>
          Our team trains regularly to refine racing techniques, develop strong
          teamwork, and foster personal growth. Whether you're an experienced
          sailor or just curious about the sport, we welcome you to learn,
          compete, and make lasting friendships within our team!
        </p>
      </main>
      <Footer />
    </>
  );
}

export default About;
