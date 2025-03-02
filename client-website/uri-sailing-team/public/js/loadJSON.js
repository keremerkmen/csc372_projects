// public/js/loadJSON.js

// We’ll attach the event listener in this file so it matches the style in your class photo.
document.addEventListener('DOMContentLoaded', function() {
  // 1. Find the button in your HTML (or React-generated DOM).
  var myBtn = document.getElementById('loadJSONBtn');
  
  // 2. Add a click event listener that calls makeRequest
  if (myBtn) {
    myBtn.addEventListener('click', makeRequest, false);
  }

  // 3. The function that makes the Ajax request
  function makeRequest() {
    var xhr = new XMLHttpRequest();
    
    // 4. Use onreadystatechange instead of onload
    xhr.onreadystatechange = function() {
      // Check if request is done and response is OK
      if (xhr.readyState === 4 && xhr.status === 200) {
        // 5. Parse the JSON data
        var data = JSON.parse(xhr.responseText);

        // 6. Build new HTML
        var newContent = '<h2>' + data.title + '</h2><ul>';
        data.members.forEach(function(member) {
          newContent += '<li>' + member.name + ' - ' + member.role + '</li>';
        });
        newContent += '</ul>';

        // 7. Insert the HTML into the page
        var container = document.getElementById('jsonContainer');
        if (container) {
          container.innerHTML = newContent;
        }
      }
    };

    // 8. Prepare and send the request
    xhr.open('GET', 'roster.json', true);
    xhr.send();
  }
});