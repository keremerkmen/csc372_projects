document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('schedule-container');

  // track which loads have already happened
  const loaded = {
    html: false,
    xml:  false,
    json: false,
    jq:   false,
  };

  // 1) load HTML via XHR
  document.getElementById('load-html').addEventListener('click', function() {
    if (loaded.html) return;
    loaded.html = true;
    this.disabled = true;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/partial-schedule.html', true);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        container.insertAdjacentHTML('beforeend', xhr.responseText);
      } else {
        console.error('HTML XHR error:', xhr.status);
      }
    };
    xhr.onerror = () => console.error('Network error loading HTML');
    xhr.send();
  });

  // 2) load XML via XHR
  document.getElementById('load-xml').addEventListener('click', function() {
    if (loaded.xml) return;
    loaded.xml = true;
    this.disabled = true;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/schedule.xml', true);
    xhr.responseType = 'document';
    xhr.overrideMimeType('application/xml');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        xhr.responseXML.querySelectorAll('event').forEach(ev => {
          const date = ev.querySelector('date').textContent;
          const name = ev.querySelector('name').textContent;
          container.insertAdjacentHTML('beforeend', `
            <div class="schedule-box">
              <h3>${date}</h3>
              <p>${name}</p>
            </div>`);
        });
      } else {
        console.error('XML XHR error:', xhr.status);
      }
    };
    xhr.onerror = () => console.error('Network error loading XML');
    xhr.send();
  });

  // 3) load JSON via XHR
  document.getElementById('load-json').addEventListener('click', function() {
    if (loaded.json) return;
    loaded.json = true;
    this.disabled = true;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/schedule.json', true);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        xhr.response.forEach(item => {
          container.insertAdjacentHTML('beforeend', `
            <div class="schedule-box">
              <h3>${item.date}</h3>
              <p>${item.name}</p>
            </div>`);
        });
      } else {
        console.error('JSON XHR error:', xhr.status);
      }
    };
    xhr.onerror = () => console.error('Network error loading JSON');
    xhr.send();
  });

  // 4) load HTML via jQuery
  $('#load-jq').on('click', function() {
    if (loaded.jq) return;
    loaded.jq = true;
    $(this).prop('disabled', true);

    $('#schedule-container').load(
      'data/partial-schedule.html .schedule-box',
      (response, status, xhr) => {
        if (status === 'error') {
          console.error('jQuery load failed:', xhr.status, xhr.statusText);
        }
      }
    );
  });
});
