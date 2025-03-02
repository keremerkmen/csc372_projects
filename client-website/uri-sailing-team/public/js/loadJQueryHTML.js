// Ensure jQuery is loaded before this script runs
$(document).ready(function() {
    // Attach click event to the button with id "showJQueryRosterBtn"
    $('#showJQueryRosterBtn').on('click', function() {
      // Hide the container, load the external HTML, then fade it in
      $('#jqueryContainer').hide().load('roster_jquery.html', function() {
        $(this).fadeIn('slow');
      });
    });
  });