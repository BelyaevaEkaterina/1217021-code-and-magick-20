'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderBar = function (ctx, player, time, maxTime, i) {
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(player, CLOUD_X + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP);
  ctx.fillText(Math.round(time), CLOUD_X + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - 4 * GAP - (MAX_BAR_HEIGHT * time) / maxTime);

  if (player === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    var colorSaturation = Math.random() * 100;
    ctx.fillStyle = 'hsl(240, ' + colorSaturation + '%, 50%)';
  }

  ctx.fillRect(CLOUD_X + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - 3 * GAP - (MAX_BAR_HEIGHT * time) / maxTime, BAR_WIDTH, (MAX_BAR_HEIGHT * time) / maxTime);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'handing';

  ctx.fillText('Ура вы победили!', CLOUD_X + 2 * GAP, CLOUD_Y + 3 * GAP);
  ctx.textBaseline = 'middle';
  ctx.fillText('Список результатов:', CLOUD_X + 2 * GAP, CLOUD_Y + 3 * GAP + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    renderBar(ctx, players[i], times[i], maxTime, i);
  }
};
