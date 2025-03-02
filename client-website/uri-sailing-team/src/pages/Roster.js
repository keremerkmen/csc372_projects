// src/pages/Roster.js
import React, { useEffect } from "react";
import $ from "jquery";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/App.css";

function Roster() {
  useEffect(() => {
    // Fade in the container
    const $container = $(".container");
    $container.hide().fadeIn(1000, () => {
      console.log("Roster container fadeIn completed.");
    });

    // Toggle a "highlighted" class on list items when clicked
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

        {/* Button for HTML Ajax (unchanged) */}
        <button onClick={() => window.loadHTML && window.loadHTML()}>
          Load Roster via HTML
        </button>
        <div id="ajaxRosterContainer"></div>

        {/* 
          Button for JSON Ajax: 
          Instead of onClick calling window.loadJSON, 
          we give it an id="loadJSONBtn" and let the external script handle the click event.
        */}
        <button id="loadJSONBtn">Load Roster via JSON</button>
        <div id="jsonContainer"></div>

        {/* Button for XML Ajax (unchanged) */}
        <button onClick={() => window.loadXML && window.loadXML()}>
          Load Roster via XML
        </button>
        <div id="xmlContainer"></div>

        {/* Button for jQuery Ajax (unchanged) */}
        <button id="showJQueryRosterBtn">
          Load Roster via jQuery
        </button>
        <div id="jqueryContainer"></div>
      </main>
      <Footer />
    </>
  );
}

export default Roster;
