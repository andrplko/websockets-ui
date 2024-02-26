import { shipsPosition } from '../db';
import { Ship } from '../types';
import { setPlayerTurn } from '../db/index';

const attackedShip: Ship[] = [];

const getStatusOfAttack = (attack: { x: number; y: number; id: number }) => {
  let targetShip: Ship | undefined;
  const opponentShip = shipsPosition.find((player) => player.id !== attack.id);

  if (opponentShip) {
    targetShip = opponentShip.data.find((ship) => {
      if (
        (!ship.direction &&
          attack.x >= ship.position.x &&
          attack.x < ship.position.x + ship.length &&
          attack.y === ship.position.y) ||
        (ship.direction &&
          attack.y >= ship.position.y &&
          attack.y < ship.position.y + ship.length &&
          attack.x === ship.position.x)
      ) {
        return true;
      }
      return false;
    });
  }

  if (targetShip && !attackedShip.includes(targetShip)) {
    attackedShip.push(targetShip);
  }

  if (attackedShip[0]) {
    setPlayerTurn(attack.id);

    if (attackedShip[0].length > 1) {
      attackedShip[0].length--;

      return 'shot';
    } else {
      const opponentIndex = shipsPosition.findIndex(
        (player) => player.id !== attack.id
      );
      const index = shipsPosition[opponentIndex].data.indexOf(attackedShip[0]);
      shipsPosition[opponentIndex].data.splice(index, 1);
      attackedShip.splice(0, attackedShip.length);

      return 'killed';
    }
  } else {
    attackedShip.splice(0, attackedShip.length);
    setPlayerTurn(attack.id === 0 ? 1 : 0);

    return 'miss';
  }
};

export default getStatusOfAttack;
