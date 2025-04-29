// js/schedule-scripts.js

document.addEventListener('DOMContentLoaded', () => {

    // 1) Load external HTML via vanilla XHR
    document.getElementById('load-html').addEventListener('click', () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'data/partial-schedule.html');
      xhr.onload = () => {
        if (xhr.status === 200) {
          // append the HTML snippet
          document
            .getElementById('schedule-container')
            .insertAdjacentHTML('beforeend', xhr.responseText);
        }
      };
      xhr.send();
    });
  
    // 2) Load XML via vanilla XHR
    document.getElementById('load-xml').addEventListener('click', () => {
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
            document
              .getElementById('schedule-container')
              .insertAdjacentHTML('beforeend', html);
          });
        }
      };
      xhr.send();
    });
  
    // 3) Load JSON via vanilla XHR
    document.getElementById('load-json').addEventListener('click', () => {
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
            document
              .getElementById('schedule-container')
              .insertAdjacentHTML('beforeend', html);
          });
        }
      };
      xhr.send();
    });
  
    // 4) Load HTML via jQuery AJAX
    $('#load-jq').on('click', () => {
      // load just the .schedule-box elements from the partial HTML
      $('#schedule-container').load('data/partial-schedule.html .schedule-box');
    });
  
  });  