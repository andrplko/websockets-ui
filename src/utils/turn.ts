import { PLAYER_TURN, clients } from '../db';
import { Commands, ResponseTurn } from '../types';

const turn = (value: number) => {
  clients.forEach((client) => {
    const response: ResponseTurn = {
      type: Commands.TURN,
      data: JSON.stringify({
        currentPlayer: value,
      }),
      id: 0,
    };

    client.ws.send(JSON.stringify(response));
  });
};

export default turn;
