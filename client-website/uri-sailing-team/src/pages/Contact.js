// src/pages/Contact.js
import React, { useEffect } from "react";
import $ from "jquery"; // Make sure jQuery is available
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/App.css";

function Contact() {
  useEffect(() => {
    // Cache the container element using jQuery
    const $container = $(".container");
    
    // Use a fadeIn effect for a smooth transition on load with a callback
    $container.hide().fadeIn(1000, function () {
      console.log("FadeIn effect on Contact page completed.");
    });
    
    // Dynamically update CSS for the container (example: change background color)
    $container.css("background-color", "#f8f8f8");
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
