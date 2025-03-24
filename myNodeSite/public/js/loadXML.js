function loadXML() {
    // 1. Create an XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    
    // 2. Prepare the request: GET the XML file asynchronously
    xhr.open("GET", "roster.xml", true);
    
    // 3. Define what happens when the response loads
    xhr.onload = function() {
      if (xhr.status === 200) {
        // 4. Get the XML document from the response
        var xmlDoc = xhr.responseXML;
        
        // 5. Find all <member> elements in the XML
        var members = xmlDoc.getElementsByTagName("member");
        
        // 6. Build HTML content by looping through each member
        var newContent = "<h2>URI Sailing Team 2025 Roster (XML)</h2><ul>";
        for (var i = 0; i < members.length; i++) {
          var name = members[i].getElementsByTagName("name")[0].textContent;
          var role = members[i].getElementsByTagName("role")[0].textContent;
          newContent += "<li>" + name + " - " + role + "</li>";
        }
        newContent += "</ul>";
        
        // 7. Insert the built HTML into the target container
        document.getElementById("xmlContainer").innerHTML = newContent;
      } else {
        console.error("Error loading roster.xml: ", xhr.status);
      }
    };
    
    // 8. Send the Ajax request
    xhr.send();
  }