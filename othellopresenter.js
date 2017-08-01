function OthelloPresenter(target) {
  var self = this;
  var $grid;
  var $hud;

  function getCell(x, y) {
    return $grid.children().eq(y).children().eq(x);
  }

  this.countCells = function(color) {
    var count = 0;

    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 8; x++) {
        count += self.getCell(x, y) == color;
      }
    }

    return count;
  }

  this.createGrid = function(readonly) {
    $grid = $(target).addClass('othello').html(('<div class="othello-row">' +
        '<div class="othello-cell" />'.repeat(8) + '</div>').repeat(8) +
        '<div class="othello-hud"><div>Black <span class="othello-score" />\
</div><div><span class="othello-score" /> White</div></div>');

    if (!readonly) {
      $grid.on('click', '.othello-cell', function() {
        self.model.place($(this).index(), $(this).parent().index());
      });
    }
  }

  this.getCell = function(x, y) {
    var cell = getCell(x, y);

    if (cell.hasClass('othello-color1')) {
      return 1;
    }

    if (cell.hasClass('othello-color2')) {
      return 2;
    }

    return 0;
  }

  this.setCell = function(x, y, color) {
    var cell = getCell(x, y).removeClass('othello-color1 othello-color2');

    color = parseInt(color);

    if (color) {
      cell.addClass('othello-color' + color);
    }
  }

  this.setGrid = function(colors) {
    var i = 0;

    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 8; x++) {
        self.setCell(x, y, colors[i++]);
      }
    }
  }

  this.setPlayer = function(color) {
    $grid.find('.othello-hud > div').removeClass('active').eq(color - 1)
        .addClass('active');
  }

  this.updateScores = function() {
    var scores = $grid.find('.othello-hud span');

    scores.eq(0).text(self.countCells(1));
    scores.eq(1).text(self.countCells(2));
  }
}
