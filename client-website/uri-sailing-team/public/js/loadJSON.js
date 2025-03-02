// public/js/loadJSON.js

document.addEventListener('DOMContentLoaded', function() {
  // 1. Find the button in the HTML (or React-rendered DOM)
  var myBtn = document.getElementById('loadJSONBtn');
  
  if (myBtn) {
    // 2. Add a click event listener that calls makeRequest
    myBtn.addEventListener('click', makeRequest, false);
  } else {
    console.error("Button with id 'loadJSONBtn' not found");
  }

  // 3. Function that makes the Ajax request
  function makeRequest() {
    var xhr = new XMLHttpRequest();
    
    // 4. Use onreadystatechange (check if request is complete and successful)
    xhr.onreadystatechange = function() {
      console.log('xhr.readyState:', xhr.readyState, 'xhr.status:', xhr.status);
      
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            // 5. Parse the JSON data
            var data = JSON.parse(xhr.responseText);
            
            // 6. Build new HTML content
            var newContent = '<h2>' + data.title + '</h2><ul>';
            data.members.forEach(function(member) {
              newContent += '<li>' + member.name + ' - ' + member.role + '</li>';
            });
            newContent += '</ul>';
  
            // 7. Insert the HTML into the page
            var container = document.getElementById('jsonContainer');
            if (container) {
              container.innerHTML = newContent;
            } else {
              console.error("Container with id 'jsonContainer' not found");
            }
          } catch (e) {
            console.error("Error parsing JSON:", e);
          }
        } else {
          console.error("Failed to load roster.json: Status", xhr.status);
        }
      }
    };

    // 8. Prepare and send the request
    xhr.open('GET', 'roster.json', true);
    xhr.send();
  }
});
