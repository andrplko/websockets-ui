import { PLAYER_TURN, clients } from '../db';
import { RequestAttack, RequestAttackData, ResponseAttack } from '../types';
import finishGame from './finishGame';
import getStatusOfAttack from './getStatusOfAttack';
import turn from './turn';

const attack = (message: Buffer) => {
  const parsedMessage: RequestAttack = JSON.parse(message.toString());
  const parseData: RequestAttackData = JSON.parse(parsedMessage.data);

  const attackInformation = {
    x: parseData.x,
    y: parseData.y,
    id: parseData.indexPlayer,
  };

  const attackResponse: ResponseAttack = {
    ...parsedMessage,
    data: JSON.stringify({
      position: {
        x: parseData.x,
        y: parseData.y,
      },
      currentPlayer: parseData.indexPlayer,
      status: getStatusOfAttack(attackInformation),
    }),
  };

  clients.forEach((client) => {
    client.ws.send(JSON.stringify(attackResponse));
  });

  turn(PLAYER_TURN);
  finishGame(parseData.indexPlayer);
};

export default attack;
