// src/pages/Roster.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/App.css";

function Roster() {
  return (
    <>
      <Header />
      <main className="container">
        <h2>Meet Our Team</h2>
        <p>
          Our roster is composed of talented sailors from various backgrounds.
          Each member brings unique strengths and experiences to the URI Sailing Team.
        </p>
        <ul>
          <li>Captain: Jane Doe (Senior)</li>
          <li>Co-Captain: John Smith (Junior)</li>
          <li>Team Member: Alex Johnson (Sophomore)</li>
          <li>Team Member: Maria Rodriguez (Freshman)</li>
        </ul>
      </main>
      <Footer />
    </>
  );
}

export default Roster;
