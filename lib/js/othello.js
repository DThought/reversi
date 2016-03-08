function Othello(presenter, readonly) {
    const dirs = [-11, -10, -9, -1, 1, 9, 10, 11];
    var player;
    var states = [];
    var self = this;

    const cycles = [
        'green',
        'yellow',
        'red'
    ]

    this.pass = function() {
        player = 1 - player;
        presenter.setPlayer(player + 1);
    }

    this.place = function(x, y) {
        var i = y * 10 + x;
        var state = states[states.length - 1].split('');
        var valid = false;

        for (var j = 8; j < 78; j += 10) {
            state.splice(j, 0, '', '');
        }

        if (state[i] != '0') {
            return false;
        }

        for (var j = 0; j < dirs.length; j++) {
            var k = i + dirs[j];

            if (state[k] != 2 - player) {
                continue;
            }

            while (parseInt(state[k])) {
                if (state[k] == player + 1) {
                    valid = true;

                    do {
                        k -= dirs[j];
                        state[k] = player + 1;
                    } while (i != k);

                    break;
                }

                k += dirs[j];
            }
        }

        if (!valid) {
            return false;
        }

        states.push(state.join(''));
        presenter.setGrid(states[states.length - 1]);
        presenter.updateScores();
        self.pass();
        return true;
    };

    this.reset = function() {
        presenter.model = self;
        presenter.createGrid(readonly);
        states[0] = '00000000'
                  + '00000000'
                  + '00000000'
                  + '00021000'
                  + '00012000'
                  + '00000000'
                  + '00000000'
                  + '00000000';
        player = 0;
        presenter.setGrid(states[0]);
        presenter.updateScores();
        presenter.setPlayer(1);
    };

    this.undo = function() {
        if (states.length < 2) {
            return false;
        }

        states.pop();
        presenter.setGrid(states[states.length - 1]);
        presenter.updateScores();
        self.pass();
        return true;
    }
}
