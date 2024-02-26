import { users, rooms, clients } from '../db';
import {
  Commands,
  RequestCreateRoom,
  ResponseUpdateRoom,
  Room,
} from '../types';

const createRoom = (message: Buffer) => {
  const newRoom: RequestCreateRoom = JSON.parse(message.toString());

  const updatedRoomData: Room = {
    roomId: newRoom.id,
    roomUsers: [
      {
        name: users[users.length - 1].name,
        index: clients[clients.length - 1].id,
      },
    ],
  };

  rooms.push(updatedRoomData);

  const response: ResponseUpdateRoom = {
    type: Commands.UPDATE_ROOM,
    data: JSON.stringify(rooms),
    id: 0,
  };

  return JSON.stringify(response);
};

export default createRoom;
