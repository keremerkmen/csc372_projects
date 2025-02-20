// Example: Change the text of the main title on click
document.querySelector('h1').addEventListener('click', function() {
    this.textContent = 'Welcome to the URI Sailing Team!';
});

// Example: Log a message when the "About Us" section is clicked
document.querySelector('#about').addEventListener('click', function() {
    console.log('About Us section clicked');
});

// Schedule events data
const scheduleEvents = [
    { date: 'February 15, 2025', event: 'Winter Regatta' },
    { date: 'March 10, 2025', event: 'Spring Invitational' },
    { date: 'April 5, 2025', event: 'Championship Qualifiers' },
    { date: 'May 20, 2025', event: 'National Championships' },
];

// Function to add schedule events to the page
function addScheduleEvents() {
    const scheduleContainer = document.getElementById('schedule-container');
    scheduleEvents.forEach(event => {
        const eventBox = document.createElement('div');
        eventBox.className = 'schedule-box';
        eventBox.innerHTML = `
            <h3>${event.date}</h3>
            <p>${event.event}</p>
        `;
        scheduleContainer.appendChild(eventBox);
    });
}

// Add schedule events on DOMContentLoaded
document.addEventListener('DOMContentLoaded', addScheduleEvents);