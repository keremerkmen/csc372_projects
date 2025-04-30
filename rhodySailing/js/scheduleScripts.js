$(document).ready(function() {
  const $container = $('#schedule-container');

  // 1) HTML via XHR
  $('#load-html').one('click', function() {
    $(this).prop('disabled', true);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/partial-schedule.html', true);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        $container.append(xhr.responseText);
      } else {
        console.error('HTML load error:', xhr.status);
      }
    };
    xhr.onerror = () => console.error('Network error loading HTML');
    xhr.send();
  });

  // 2) XML via XHR
  $('#load-xml').one('click', function() {
    $(this).prop('disabled', true);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/schedule.xml', true);
    xhr.responseType = 'document';
    xhr.overrideMimeType('application/xml');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        $(xhr.responseXML).find('event').each((_, ev) => {
          const $e = $(ev);
          $container.append(`
            <div class="schedule-box">
              <h3>${$e.find('date').text()}</h3>
              <p>${$e.find('name').text()}</p>
            </div>`);
        });
      } else {
        console.error('XML load error:', xhr.status);
      }
    };
    xhr.onerror = () => console.error('Network error loading XML');
    xhr.send();
  });

  // 3) JSON via XHR
  $('#load-json').one('click', function() {
    $(this).prop('disabled', true);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/schedule.json', true);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        xhr.response.forEach(item => {
          $container.append(`
            <div class="schedule-box">
              <h3>${item.date}</h3>
              <p>${item.name}</p>
            </div>`);
        });
      } else {
        console.error('JSON load error:', xhr.status);
      }
    };
    xhr.onerror = () => console.error('Network error loading JSON');
    xhr.send();
  });

  // 4) HTML via jQuery
  $('#load-jq').one('click', function() {
    $(this).prop('disabled', true);
    $container.load(
      'data/partial-schedule.html .schedule-box',
      (response, status, xhr) => {
        if (status === 'error') {
          console.error('jQuery load failed:', xhr.status, xhr.statusText);
        }
      }
    );
  });
});
