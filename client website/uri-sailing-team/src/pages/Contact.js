// src/pages/Contact.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/App.css";

function Contact() {
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
