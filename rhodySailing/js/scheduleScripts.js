document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('schedule-container');

  // 1) HTML via XHR
  const htmlBtn = document.getElementById('load-html');
  htmlBtn.addEventListener('click', loadHTML, { once: true });
  function loadHTML() {
    htmlBtn.disabled = true;
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
  }

  // 2) XML via XHR
  const xmlBtn = document.getElementById('load-xml');
  xmlBtn.addEventListener('click', loadXML, { once: true });
  function loadXML() {
    xmlBtn.disabled = true;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/schedule.xml', true);
    xhr.responseType = 'document';
    xhr.overrideMimeType('application/xml');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const xml = xhr.responseXML;
        xml.querySelectorAll('event').forEach(ev => {
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
  }

  // 3) JSON via XHR
  const jsonBtn = document.getElementById('load-json');
  jsonBtn.addEventListener('click', loadJSON, { once: true });
  function loadJSON() {
    jsonBtn.disabled = true;
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
  }

  // 4) HTML via jQuery (once)
  $('#load-jq').one('click', function() {
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
