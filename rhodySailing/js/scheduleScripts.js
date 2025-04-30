document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('schedule-container');

  // 1) Load HTML via XHR
  function loadHTML() {
    const btn = document.getElementById('load-html');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/partial-schedule.html', true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        container.insertAdjacentHTML('beforeend', xhr.responseText);
        btn.disabled = true;
      } else {
        console.error('HTML load failed:', xhr.status);
      }
    };
    xhr.onerror = () => console.error('Network error loading HTML');
    xhr.send();
  }
  document.getElementById('load-html')
          .addEventListener('click', loadHTML, { once: true });

  // 2) Load XML via XHR
  function loadXML() {
    const btn = document.getElementById('load-xml');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/schedule.xml', true);
    xhr.responseType = 'document';
    xhr.overrideMimeType('application/xml');
    xhr.onload = () => {
      if (xhr.status === 200) {
        const events = xhr.responseXML.getElementsByTagName('event');
        Array.from(events).forEach(ev => {
          const date = ev.querySelector('date').textContent;
          const name = ev.querySelector('name').textContent;
          container.insertAdjacentHTML('beforeend', `
            <div class="schedule-box">
              <h3>${date}</h3>
              <p>${name}</p>
            </div>`);
        });
        btn.disabled = true;
      } else {
        console.error('XML load failed:', xhr.status);
      }
    };
    xhr.onerror = () => console.error('Network error loading XML');
    xhr.send();
  }
  document.getElementById('load-xml')
          .addEventListener('click', loadXML, { once: true });

  // 3) Load JSON via XHR
  function loadJSON() {
    const btn = document.getElementById('load-json');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/schedule.json', true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const list = JSON.parse(xhr.responseText);
        list.forEach(item => {
          container.insertAdjacentHTML('beforeend', `
            <div class="schedule-box">
              <h3>${item.date}</h3>
              <p>${item.name}</p>
            </div>`);
        });
        btn.disabled = true;
      } else {
        console.error('JSON load failed:', xhr.status);
      }
    };
    xhr.onerror = () => console.error('Network error loading JSON');
    xhr.send();
  }
  document.getElementById('load-json')
          .addEventListener('click', loadJSON, { once: true });

  // 4) Load HTML via jQuery
  $('#load-jq').one('click', function() {
    const btn = this;
    $('#schedule-container').load(
      'data/partial-schedule.html .schedule-box',
      (response, status, xhr) => {
        if (status === 'error') {
          console.error('jQuery load failed:', xhr.status, xhr.statusText);
        } else {
          btn.disabled = true;
        }
      }
    );
  });
});