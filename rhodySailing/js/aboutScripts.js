$(function() {
  // 1) Refresh the heading text
  $('main h2').text('Discover the URI Sailing Team');

  // 2) Inject testimonial at the end of <main>
  const testimonial = `
    <div class="testimonial" style="padding:1em; margin-top:1em; border-left:4px solid #0055a5;">
      “Joining URI Sailing pushed me to my limits—in the best way possible!”<br>
      <em>— Jane Doe, Class of ’24</em>
    </div>`;
  $('main').append(testimonial);

  // 3) Toggle highlight on paragraph click
  $('main p').on('click', function() {
    $(this).toggleClass('highlight');
  });

  // 4) Fade in the testimonial
  $('.testimonial').hide().fadeIn(800);
});