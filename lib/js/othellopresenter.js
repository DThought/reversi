function OthelloPresenter(prefixes) {
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
        var grid = '<div class="grid">';

        for (var y = 0; y < 8; y++) {
            grid += '<div class="row">';

            for (var x = 0; x < 8; x++) {
                grid += '<div class="cell" />';
            }

            grid += '</div>';
        }

        $('#game .grid, #game .hud').remove();
        $hud = $('<div class="hud"><div>Black <span class="score" /></div>'
               + '<div><span class="score" /> White</div></div>')
                .appendTo('#game');

        $grid = $(grid + '</div>').appendTo('#game');

        if (!readonly) {
            $grid.on('click', '.cell', function() {
                self.model.place($(this).index(), $(this).parent().index());
            });
        }
    }

    this.getCell = function(x, y) {
        var cell = getCell(x, y);

        if (cell.hasClass('color1')) {
            return 1;
        }

        if (cell.hasClass('color2')) {
            return 2;
        }

        return 0;
    }

    this.setCell = function(x, y, color) {
        var cell = getCell(x, y).removeClass('color1 color2');

        color = parseInt(color);

        if (color) {
            cell.addClass('color' + color);
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
        $('#game .hud > div').removeClass('active').eq(color - 1)
                .addClass('active');
    }

    this.updateScores = function() {
        var scores = $('#game .hud span');

        scores.eq(0).text(self.countCells(1));
        scores.eq(1).text(self.countCells(2));
    }
}
