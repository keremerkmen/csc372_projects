document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('schedule-container');

  // Helper: create & append only if we haven't seen this event before
  function appendIfNew(date, name) {
    // Look for an existing .schedule-box with these data attributes
    if (container.querySelector(`.schedule-box[data-date="${date}"][data-name="${name}"]`)) {
      return;
    }
    const box = document.createElement('div');
    box.className = 'schedule-box';
    box.setAttribute('data-date', date);
    box.setAttribute('data-name', name);
    box.innerHTML = `<h3>${date}</h3><p>${name}</p>`;
    container.appendChild(box);
  }

  // 1) HTML via XHR
  document.getElementById('load-html').addEventListener('click', function() {
    this.disabled = true;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/partial-schedule.html', true);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // parse the returned HTML in a temp wrapper
        const tmp = document.createElement('div');
        tmp.innerHTML = xhr.responseText;
        tmp.querySelectorAll('.schedule-box').forEach(el => {
          const date = el.querySelector('h3').textContent.trim();
          const name = el.querySelector('p').textContent.trim();
          appendIfNew(date, name);
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
    this.disabled = true;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/schedule.xml', true);
    xhr.responseType = 'document';
    xhr.overrideMimeType('application/xml');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const xml = xhr.responseXML;
        xml.querySelectorAll('event').forEach(ev => {
          const date = ev.querySelector('date').textContent.trim();
          const name = ev.querySelector('name').textContent.trim();
          appendIfNew(date, name);
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
    this.disabled = true;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/schedule.json', true);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        xhr.response.forEach(item => {
          appendIfNew(item.date.trim(), item.name.trim());
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
    // load into a temporary wrapper, not directly into container
    const $tmp = $('<div>');
    $tmp.load('data/partial-schedule.html .schedule-box', (resp, status, xhr) => {
      if (status === 'error') {
        console.error('jQuery load failed:', xhr.status, xhr.statusText);
      } else {
        $tmp.find('.schedule-box').each((_, el) => {
          const $el = $(el);
          const date = $el.find('h3').text().trim();
          const name = $el.find('p').text().trim();
          appendIfNew(date, name);
        });
      }
    });
  });
});
