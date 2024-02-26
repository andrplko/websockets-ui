import { Commands, Room } from '../types';

const updateRoom = (data: Room[]) => {
  return JSON.stringify({
    type: Commands.UPDATE_ROOM,
    data: JSON.stringify(data),
    id: 0,
  });
};

export default updateRoom;
