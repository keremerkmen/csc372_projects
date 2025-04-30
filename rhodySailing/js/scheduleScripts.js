document.addEventListener('DOMContentLoaded', () => {

  const scheduleContainer = document.getElementById('schedule-container');

  // 1) Load external HTML via vanilla XHR (once)
  document.getElementById('load-html')
    .addEventListener('click', function onHtmlClick() {
      console.log('🌐 load-html clicked');
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'data/partial-schedule.html');
      xhr.onload = () => {
        if (xhr.status === 200) {
          scheduleContainer.insertAdjacentHTML('beforeend', xhr.responseText);
        } else {
          console.error('Failed to load HTML:', xhr.status);
        }
      };
      xhr.send();
      this.disabled = true; // prevent duplicate loads
    }, { once: true });

  // 2) Load XML via vanilla XHR
  document.getElementById('load-xml').addEventListener('click', () => {
    console.log('🌐 load-xml clicked');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/schedule.xml');
    xhr.responseType = 'document';
    xhr.overrideMimeType('application/xml');
    xhr.onload = () => {
      if (xhr.status === 200) {
        const events = xhr.responseXML.getElementsByTagName('event');
        Array.from(events).forEach(ev => {
          const date = ev.getElementsByTagName('date')[0].textContent;
          const name = ev.getElementsByTagName('name')[0].textContent;
          const html = `
            <div class="schedule-box">
              <h3>${date}</h3>
              <p>${name}</p>
            </div>`;
          scheduleContainer.insertAdjacentHTML('beforeend', html);
        });
      } else {
        console.error('Failed to load XML:', xhr.status);
      }
    };
    xhr.send();
  });

  // 3) Load JSON via vanilla XHR
  document.getElementById('load-json').addEventListener('click', () => {
    console.log('🌐 load-json clicked');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/schedule.json');
    xhr.onload = () => {
      if (xhr.status === 200) {
        const list = JSON.parse(xhr.responseText);
        list.forEach(item => {
          const html = `
            <div class="schedule-box">
              <h3>${item.date}</h3>
              <p>${item.name}</p>
            </div>`;
          scheduleContainer.insertAdjacentHTML('beforeend', html);
        });
      } else {
        console.error('Failed to load JSON:', xhr.status);
      }
    };
    xhr.send();
  });

  // 4) Load HTML via jQuery AJAX (once)
  $('#load-jq').one('click', () => {
    console.log('🌐 load-jq clicked');
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