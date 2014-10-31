(function () {
  function measureFrames(reportInterval, fpsCallback) {
    var frames = 0,
      framesToFill = 120;

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
      'border-radius: 3px;' +
      'bottom: 0;' +
      'color: #000;' +
      'font-size: 36px;' +
      'margin: 5px;' +
      'padding: 15px 20px;' +
      'position: fixed;' +
      'right: 0;' +
      'text-align: right;' +
      'z-index: 10000000;' +
      '}' +
      '#wikia-fps-chart {' +
      'margin-top: 10px;' +
      '}' +
      '#wikia-fps-chart span {' +
      'background: #000;' +
      'display: inline-block;' +
      'width: 2px;' +
      '}',
    fpsMeterDiv,
    fpsChartDiv;

  document.body.insertAdjacentHTML('beforeend', '<style>' + style + '</style>');
  document.body.insertAdjacentHTML('beforeend', '<div id="wikia-fps-meter"><span></span></div>');
  fpsMeterDiv = document.querySelector('#wikia-fps-meter > span');
  fpsMeterDiv.insertAdjacentHTML('afterend', '<div id="wikia-fps-chart"></div>');
  fpsChartDiv = document.querySelector('#wikia-fps-chart');

  measureFrames(1000, function (frames) {
    fpsMeterDiv.innerHTML = frames + ' fps';
    fpsChartDiv.insertAdjacentHTML('beforeend', '<span style="height: ' + frames + 'px"></span>');
    if (framesToFill === 0) {
      fpsChartDiv.querySelector('span').remove();
    } else {
      framesToFill -= 1;
    }
  });
}());
