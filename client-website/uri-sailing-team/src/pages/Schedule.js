// src/pages/Schedule.js
import React, { useEffect, useState } from "react";
import $ from "jquery";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/App.css";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Full schedule events data
    const scheduleEvents = [
      { date: "February 15, 2025", event: "Winter Regatta" },
      { date: "March 10, 2025", event: "Spring Invitational" },
      { date: "April 5, 2025", event: "Championship Qualifiers" },
      { date: "May 20, 2025", event: "National Championships" },
    ];
    setSchedule(scheduleEvents);

    // jQuery: Apply fadeIn effect to the schedule container
    $("#schedule-container").hide().fadeIn(2000, function () {
      console.log("Schedule container fadeIn completed.");
    });

    // jQuery: Attach event delegation to schedule boxes for a visual toggle effect
    $("#schedule-container").on("click", ".schedule-box", function () {
      $(this).toggleClass("highlighted");
    });

    // Example: Optionally modify header styling using jQuery
    $("header").css("background-color", "#003DA5");
  }, []);

  return (
    <>
      <Header />
      <main>
        <section id="schedule-page" className="container">
          <h2>Full Sailing Schedule</h2>
          <div id="schedule-container">
            {schedule.map((event, index) => (
              <div key={index} className="schedule-box">
                <h3>{event.date}</h3>
                <p>{event.event}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Schedule;
