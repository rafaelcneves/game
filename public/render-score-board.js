export default function renderScoreBoard(scoreBoard, game, requestAnimationFrame, currentPlayerId) {
	const context = scoreBoard.getContext('2d');
	var i = 1;

	context.fillStyle = '#CCCCCC';
	context.clearRect(0, 0, 200, 400);

	for (const playerId in game.state.players) {
		const player = game.state.players[playerId];

		context.font = '16px Arial';
		if (playerId == currentPlayerId) {
			context.fillStyle = '#F0DB4F';
		} else {
			context.fillStyle = 'black';
		}
		context.fillText(`${player.score} - ${playerId}`, 5, i * 20);
		i++;
	}

	requestAnimationFrame(() => {
		renderScoreBoard(scoreBoard, game, requestAnimationFrame, currentPlayerId);
	});
}
