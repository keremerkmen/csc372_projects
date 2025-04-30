$(document).ready(function() {
  const $container = $('#schedule-container');

  function alreadyLoaded(key) {
    return localStorage.getItem(key) === 'true';
  }
  function markLoaded(key) {
    localStorage.setItem(key, 'true');
  }
  function saveContent(key, html) {
    localStorage.setItem(key + '_content', html);
  }
  function getContent(key) {
    return localStorage.getItem(key + '_content');
  }

  // Restore content if already loaded
  ['html', 'xml', 'json', 'jq'].forEach(key => {
    if (alreadyLoaded(key)) {
      const html = getContent(key);
      if (html) $container.append(html);
      $('#' + 'load-' + key).prop('disabled', true);
    }
  });

  // 1) HTML via XHR
  $('#load-html').one('click', function() {
    if (alreadyLoaded('html')) return;
    $(this).prop('disabled', true);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/partial-schedule.html', true);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        $container.append(xhr.responseText);
        markLoaded('html');
        saveContent('html', xhr.responseText);
      } else {
        console.error('HTML load error:', xhr.status);
      }
    };
    xhr.onerror = () => console.error('Network error loading HTML');
    xhr.send();
  });

  // 2) XML via XHR
  $('#load-xml').one('click', function() {
    if (alreadyLoaded('xml')) return;
    $(this).prop('disabled', true);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/schedule.xml', true);
    xhr.responseType = 'document';
    xhr.overrideMimeType('application/xml');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let html = '';
        $(xhr.responseXML).find('event').each((_, ev) => {
          const $e = $(ev);
          html += `
            <div class="schedule-box">
              <h3>${$e.find('date').text()}</h3>
              <p>${$e.find('name').text()}</p>
            </div>`;
        });
        $container.append(html);
        markLoaded('xml');
        saveContent('xml', html);
      } else {
        console.error('XML load error:', xhr.status);
      }
    };
    xhr.onerror = () => console.error('Network error loading XML');
    xhr.send();
  });

  // 3) JSON via XHR
  $('#load-json').one('click', function() {
    if (alreadyLoaded('json')) return;
    $(this).prop('disabled', true);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/schedule.json', true);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let html = '';
        xhr.response.forEach(item => {
          html += `
            <div class="schedule-box">
              <h3>${item.date}</h3>
              <p>${item.name}</p>
            </div>`;
        });
        $container.append(html);
        markLoaded('json');
        saveContent('json', html);
      } else {
        console.error('JSON load error:', xhr.status);
      }
    };
    xhr.onerror = () => console.error('Network error loading JSON');
    xhr.send();
  });

  // 4) HTML via jQuery
  $('#load-jq').one('click', function() {
    if (alreadyLoaded('jq')) return;
    $(this).prop('disabled', true);
    $container.load(
      'data/partial-schedule.html .schedule-box',
      (response, status, xhr) => {
        if (status === 'error') {
          console.error('jQuery load failed:', xhr.status, xhr.statusText);
        } else {
          markLoaded('jq');
          saveContent('jq', $container.html());
        }
      }
    );
  });
});