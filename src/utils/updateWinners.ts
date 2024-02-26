import { winners } from './../db/index';
import { Commands } from '../types';

const updateWinners = () => {
  return JSON.stringify({
    type: Commands.UPDATE_WINNERS,
    data: JSON.stringify(winners),
    id: 0,
  });
};

export default updateWinners;
