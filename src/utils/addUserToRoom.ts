import { clients, rooms } from '../db';
import { Commands, ResponseCreateGame } from '../types';
import updateRoom from './updateRoom';

const addUserToRoom = () => {
  clients.forEach((client) => {
    const response: ResponseCreateGame = {
      type: Commands.CREATE_GAME,
      data: JSON.stringify({
        idGame: rooms[rooms.length - 1].roomId,
        idPlayer: client.id,
      }),
      id: 0,
    };

    client.ws.send(JSON.stringify(response));
  });

  rooms.pop();

  clients.forEach((client) => {
    client.ws.send(updateRoom(rooms));
  });
};

export default addUserToRoom;
