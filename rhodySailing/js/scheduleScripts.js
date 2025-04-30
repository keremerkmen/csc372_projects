document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('schedule-container');

  // 1) HTML via XHR (once)
  document.getElementById('load-html')
    .addEventListener('click', function loadHTML() {
      this.disabled = true;
      fetch('data/partial-schedule.html')
        .then(res => {
          if (!res.ok) throw new Error(res.status);
          return res.text();
        })
        .then(html => container.insertAdjacentHTML('beforeend', html))
        .catch(err => console.error('HTML load error:', err));
    }, { once: true });

  // 2) XML via XHR (once)
  document.getElementById('load-xml')
    .addEventListener('click', function loadXML() {
      this.disabled = true;
      fetch('data/schedule.xml')
        .then(res => {
          if (!res.ok) throw new Error(res.status);
          return res.text();
        })
        .then(str => new DOMParser().parseFromString(str, 'application/xml'))
        .then(xml => {
          xml.querySelectorAll('event').forEach(ev => {
            const date = ev.querySelector('date').textContent;
            const name = ev.querySelector('name').textContent;
            container.insertAdjacentHTML('beforeend', `
              <div class="schedule-box">
                <h3>${date}</h3>
                <p>${name}</p>
              </div>`);
          });
        })
        .catch(err => console.error('XML load error:', err));
    }, { once: true });

  // 3) JSON via XHR (once)
  document.getElementById('load-json')
    .addEventListener('click', function loadJSON() {
      this.disabled = true;
      fetch('data/schedule.json')
        .then(res => {
          if (!res.ok) throw new Error(res.status);
          return res.json();
        })
        .then(list => {
          list.forEach(item => {
            container.insertAdjacentHTML('beforeend', `
              <div class="schedule-box">
                <h3>${item.date}</h3>
                <p>${item.name}</p>
              </div>`);
          });
        })
        .catch(err => console.error('JSON load error:', err));
    }, { once: true });

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