// src/pages/Recruitment.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/App.css";

const Recruitment = () => {
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
