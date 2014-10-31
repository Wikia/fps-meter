(function () {
  function measureFrames(reportInterval, fpsCallback) {
    var frames = 0;

    function frameCallback() {
      frames += 1;
      requestAnimationFrame(frameCallback);
    }

    setInterval(function () {
      var myFrames = frames;
      frames = 0;
      fpsCallback(myFrames);
    }, reportInterval);

    frameCallback();
  }

  var style = '#wikia-fps-meter {' +
      'background: rgba(255, 255, 255, 0.75);' +
      'border-radius: 5px;' +
      'bottom: 0;' +
      'font-size: 30px;' +
      'margin: 5px;' +
      'padding: 3px 10px;' +
      'position: fixed;' +
      'right: 0;' +
      'z-index: 10000000;' +
      '}',
    fpsMeterDiv;

  document.body.insertAdjacentHTML('beforeend', '<style>' + style + '</style>');
  document.body.insertAdjacentHTML('beforeend', '<div id="wikia-fps-meter"></div>');

  fpsMeterDiv = document.getElementById('wikia-fps-meter');

  measureFrames(1000, function (frames) {
    fpsMeterDiv.innerHTML = frames + ' FPS';
  });
}());
