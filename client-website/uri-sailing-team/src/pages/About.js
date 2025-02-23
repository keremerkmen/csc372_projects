// src/pages/About.js
import React, { useEffect } from "react";
import $ from "jquery"; // Ensure jQuery is loaded (either via npm or via the CDN fallback in index.html)
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/App.css";

function About() {
  useEffect(() => {
    // Cache the container element using jQuery for improved performance
    const $container = $(".container");
    
    // Apply a fadeIn effect to the container with a callback
    $container.hide().fadeIn(1000, function () {
      console.log("FadeIn effect on About page completed.");
    });
    
    // Dynamically update the container's CSS using jQuery
    $container.css("border", "2px solid #003DA5");
  }, []);

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
