import { RequestAddShips, RequestAddShipsData } from '../types';
import { shipsPosition } from './../db/index';

const addShips = (message: Buffer) => {
  const parseMessage: RequestAddShips = JSON.parse(message.toString());
  const parseData: RequestAddShipsData = JSON.parse(parseMessage.data);

  const transformedData = {
    id: parseData.indexPlayer,
    data: parseData.ships,
  };

  shipsPosition.push(transformedData);
};

export default addShips;
