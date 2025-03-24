// public/js/loadHTML.js

document.addEventListener('DOMContentLoaded', function() {
  // Optionally, if there is a button with id 'loadHTMLBtn' in the DOM, attach an event listener.
  // (If you're calling loadHTML() from React, this event listener may not be needed.)
  var htmlBtn = document.getElementById('loadHTMLBtn');
  if (htmlBtn) {
    htmlBtn.addEventListener('click', loadHTML, false);
  }
});

// Function to load the HTML file using AJAX
function loadHTML() {
  // 1. Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest();
  
  // 2. Prepare the request: use HTTP GET, path to the HTML file, and asynchronous = true
  xhr.open('GET', 'roster.html', true);
  
  // 3. Define what happens when the response loads
  xhr.onload = function() {
    // Check if the server status is OK (status 200)
    if (xhr.status === 200) {
      // 4. Insert the retrieved HTML into the page by updating the innerHTML of the target container
      var container = document.getElementById('ajaxRosterContainer');
      if (container) {
        container.innerHTML = xhr.responseText;
      } else {
        console.error("Element with id 'ajaxRosterContainer' not found.");
      }
    } else {
      console.error("Failed to load roster.html: Status", xhr.status);
    }
  };
  
  // 5. Send the AJAX request
  xhr.send();
}
