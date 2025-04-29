$(function() {
    // 1) Refresh the heading text
    $('main h2').text('Discover the URI Sailing Team');
  
    // 2) Inject a testimonial at the bottom of the main content
    const testimonial = `
      <div class="testimonial" style="padding:1em; margin-top:1em; border-left:4px solid #0055a5;">
        “Joining URI Sailing pushed me to my limits—in the best way possible!”<br>
        <em>— Jane Doe, Class of ’24</em>
      </div>`;
    $('main .container').append(testimonial);
  
    // 3) When any paragraph is clicked, toggle the highlight class
    $('main p').on('click', function() {
      $(this).toggleClass('highlight');
    });
  
    // 4) Fade the testimonial into view
    $('.testimonial').hide().fadeIn(800);
  });  