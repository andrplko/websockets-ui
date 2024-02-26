import { clients, shipsPosition } from '../db';
import { Commands, ResponseStartGame } from '../types';

const startGame = () => {
  clients.forEach((client) => {
    shipsPosition.forEach((ship) => {
      if (client.id === ship.id) {
        const response: ResponseStartGame = {
          type: Commands.START_GAME,
          data: JSON.stringify({
            currentPlayerIndex: ship.id,
            ships: ship.data,
          }),
          id: 0,
        };

        client.ws.send(JSON.stringify(response));
      }
    });
  });
};

export default startGame;
