// src/pages/Roster.js
import React, { useEffect } from "react";
import $ from "jquery"; // Ensure jQuery is available (via npm or globally)
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/App.css";

function Roster() {
  useEffect(() => {
    // Cache the container element for performance
    const $container = $(".container");

    // Apply a fadeIn effect to the container with a callback
    $container.hide().fadeIn(1000, function () {
      console.log("Roster container fadeIn completed.");
    });

    // Attach a click event to list items to toggle a 'highlighted' class
    // This demonstrates replacing native event attachment with jQuery's .on() method.
    $("ul li").on("click", function () {
      $(this).toggleClass("highlighted");
    });
  }, []);

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
