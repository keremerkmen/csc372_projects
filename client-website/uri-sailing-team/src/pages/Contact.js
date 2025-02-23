// src/pages/Contact.js
import React, { useEffect } from "react";
import $ from "jquery"; // Ensure jQuery is available
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/App.css";

function Contact() {
  useEffect(() => {
    // Select only the <main> element with the class "container"
    const $mainContainer = $("main.container");

    if ($mainContainer.length) {
      // Hide the main container and fade it in over 1 second,
      // then log a confirmation message in the console
      $mainContainer.hide().fadeIn(1000, function () {
        console.log("FadeIn effect on Contact page completed.");
      });
      
      // Dynamically update the background color for the main container
      $mainContainer.css("background-color", "#f8f8f8");
    } else {
      console.warn("No main container found in Contact page.");
    }
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        <h2>Contact the URI Sailing Team</h2>
        <p>
          If you have any questions about our team, upcoming regattas, or how to join,
          feel free to reach out!
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:sailing@uri.edu">sailing@uri.edu</a>
        </p>
        <p>
          <strong>Phone:</strong> (401) 874-1000
        </p>
        <p>
          You can also follow us on social media for the latest news and updates.
        </p>
      </main>
      <Footer />
    </>
  );
}

export default Contact;
