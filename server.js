import express from 'express';
import http from 'http';
import createGame from './public/game.js';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static('public'));

const game = createGame();

game.subscribe((command) => {
	sockets.emit(command.type, command);
});

sockets.on('connection', (socket) => {
	const playerId = socket.id;

	game.addPlayer({playerId: playerId});

	socket.emit('setup', game.state);

	socket.on('disconnect', () => {
		game.removePlayer({playerId: playerId});
	})
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log('> Server listening on port: 3000');
});
