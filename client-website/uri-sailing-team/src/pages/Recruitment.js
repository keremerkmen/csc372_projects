// src/pages/Recruitment.js
import React, { useEffect } from "react";
import $ from "jquery"; // Import jQuery
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/App.css";

const Recruitment = () => {
  useEffect(() => {
    // jQuery: Cache the main container element
    const $container = $(".container");
    
    // jQuery: Apply a fade-in effect to the main container with a callback
    $container.hide().fadeIn(1500, function () {
      console.log("Recruitment page fadeIn effect completed.");
    });
    
    // jQuery: Modify CSS dynamically - e.g., update text color for better visibility
    $container.css("color", "#003DA5");
    
    // jQuery: Attach an event listener to any recruitment-specific element if needed
    // For demonstration, when any paragraph is clicked, toggle a border.
    $container.on("click", "p", function () {
      $(this).toggleClass("clicked-border");
    });
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        <h2>Join the URI Sailing Team</h2>
        <p>
          Are you passionate about sailing and eager to compete at a high level? The URI Sailing Team welcomes students of all skill levels—from seasoned racers to enthusiastic beginners. We value determination, teamwork, and a love for the water.
        </p>
        <p>
          Our recruitment process is designed to help you get started. We offer tryouts, regular training sessions, and mentorship from experienced team members. Whether you're looking to hone your racing skills or simply want to be part of a supportive community, we have a place for you.
        </p>
        <p>
          For more information about tryout dates, training schedules, and team requirements, please contact our recruitment coordinator at{" "}
          <a href="mailto:recruit@sailing.uri.edu">recruit@sailing.uri.edu</a>.
        </p>
      </main>
      <Footer />
    </>
  );
};

export default Recruitment;
