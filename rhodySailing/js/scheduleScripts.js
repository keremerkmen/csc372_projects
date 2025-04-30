document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('schedule-container');

  // Guards to prevent double-loads
  let htmlLoaded = false,
      xmlLoaded  = false,
      jsonLoaded = false;

  // 1) HTML via XHR
  document.getElementById('load-html').addEventListener('click', function() {
    if (htmlLoaded) return;
    htmlLoaded = true;
    this.disabled = true;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/partial-schedule.html', true);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Extract only the .schedule-box elements
        const wrapper = document.createElement('div');
        wrapper.innerHTML = xhr.responseText;
        wrapper.querySelectorAll('.schedule-box').forEach(box => {
          container.appendChild(box);
        });
      } else {
        console.error('HTML load error:', xhr.status);
      }
    };
    xhr.onerror = () => console.error('Network error loading HTML');
    xhr.send();
  });

  // 2) XML via XHR
  document.getElementById('load-xml').addEventListener('click', function() {
    if (xmlLoaded) return;
    xmlLoaded = true;
    this.disabled = true;

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
          const box = document.createElement('div');
          box.className = 'schedule-box';
          box.innerHTML = `<h3>${date}</h3><p>${name}</p>`;
          container.appendChild(box);
        });
      } else {
        console.error('XML load error:', xhr.status);
      }
    };
    xhr.onerror = () => console.error('Network error loading XML');
    xhr.send();
  });

  // 3) JSON via XHR
  document.getElementById('load-json').addEventListener('click', function() {
    if (jsonLoaded) return;
    jsonLoaded = true;
    this.disabled = true;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/schedule.json', true);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        xhr.response.forEach(item => {
          const box = document.createElement('div');
          box.className = 'schedule-box';
          box.innerHTML = `<h3>${item.date}</h3><p>${item.name}</p>`;
          container.appendChild(box);
        });
      } else {
        console.error('JSON load error:', xhr.status);
      }
    };
    xhr.onerror = () => console.error('Network error loading JSON');
    xhr.send();
  });

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
