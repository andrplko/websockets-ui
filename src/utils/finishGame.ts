import { clients, shipsPosition, users, winners } from '../db';
import { Commands, ResponseFinishGame, Winner } from '../types';
import updateWinners from './updateWinners';

const finishGame = (id: number) => {
  shipsPosition.forEach((ship) => {
    if (ship.data.length === 0) {
      const winner: Winner = {
        name: users[id].name,
        wins: 1,
      };

      winners.push(winner);

      const response: ResponseFinishGame = {
        type: Commands.FINISH,
        data: JSON.stringify({
          winPlayer: id,
        }),
        id: 0,
      };

      clients.forEach((client) => {
        client.ws.send(JSON.stringify(response));
        client.ws.send(updateWinners());
      });
    }
  });
};

export default finishGame;
