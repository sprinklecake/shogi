"""

HOW MATCHES WORK
=

On connect to room send game board state entirely.

"""

import shogi
from flask import Flask, render_template
from flask_socketio import SocketIO


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
board = shogi.Board()


@app.route('/')
def home():
    return """
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/socket.io/1.3.6/socket.io.min.js"></script>
    <script type="text/javascript" charset="utf-8">
        var socket = io.connect('http://localhost:5000');
        socket.on('connect', function() {
            // first when you connect you'll need entire board...
            socket.emit('json', {'push_usi': '7g7f'});
        });
        socket.on('push_usi', function(move){  
           console.log(move);
        });
    </script>
    """


@socketio.on('json')
def handle_message(data):
    global board
    print('received json: ' + str(data))

    pending_move = shogi.Move.from_usi(data['push_usi'])
    if pending_move in list(board.legal_moves):
        board.push_usi(data['push_usi'])
    else:
        print("illegal move!")

    print(board.kif_str())
    socketio.emit('push_usi', {'push_usi': data['push_usi']})


if __name__ == '__main__':
    socketio.run(app)
