(function () {
  'use strict';

  var GA_MEASUREMENT_ID = window.GA_MEASUREMENT_ID || null;

  function safeStr(value) {
    return (value == null ? '' : String(value)).trim();
  }

  function fileExtensionFromUrl(url) {
    try {
      var clean = url.split('#')[0].split('?')[0];
      var parts = clean.split('.');
      return parts.length > 1 ? parts.pop().toLowerCase() : '';
    } catch (e) {
      return '';
    }
  }

  function buildEventParams(params) {
    var eventParams = {};
    if (params && typeof params === 'object') {
      for (var key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          eventParams[key] = params[key];
        }
      }
    }

    if (GA_MEASUREMENT_ID) {
      eventParams.send_to = GA_MEASUREMENT_ID;
    }

    return eventParams;
  }

  function sendEvent(name, params, callback) {
    if (typeof window.gtag !== 'function') {
      if (typeof callback === 'function') {
        callback();
      }
      return;
    }

    var eventParams = buildEventParams(params || {});
    if (typeof callback === 'function') {
      eventParams.event_callback = callback;
    }

    window.gtag('event', name, eventParams);
  }

  function setDownloadUserProperties(platform) {
    if (typeof window.gtag !== 'function') {
      return;
    }

    window.gtag('set', 'user_properties', {
      has_downloaded_software: 'true',
      download_platform: platform
    });
  }

  function trackDownloadClick(event, element, platform) {
    var url = element.href;
    if (!url) {
      return;
    }

    var version = safeStr(element.getAttribute('data-version')) || '(unknown)';
    var linkText = safeStr(element.textContent) || 'Free download';

    event.preventDefault();

    var navigate = function () {
      window.location.href = url;
    };

    sendEvent(
      'download_app',
      {
        platform: platform,
        download_version: version,
        download_type: 'free_version',
        download_link_id: element.id,
        download_link_text: linkText,
        download_url: url,
        download_file_extension: fileExtensionFromUrl(url),
        value: 0
      },
      navigate
    );

    sendEvent('conversion', {
      conversion_type: 'software_download',
      platform: platform,
      version: version,
      value: 0
    });

    setDownloadUserProperties(platform);

    setTimeout(navigate, 800);
  }

  document.addEventListener('click', function (event) {
    if (typeof event.target.closest !== 'function') {
      return;
    }

    var clickedButton = event.target.closest('#download-free-version, #download-linux');
    if (!clickedButton) {
      return;
    }

    var platform = clickedButton.id === 'download-linux' ? 'linux' : 'windows';
    trackDownloadClick(event, clickedButton, platform);
  });
})();
