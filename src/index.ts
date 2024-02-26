import { WebSocket, WebSocketServer } from 'ws';
import { httpServer } from './http_server/index';
import { config } from 'dotenv';
import loginUser from './utils/loginUser';
import { clients, rooms, shipsPosition } from './db';
import { Client, Commands } from './types';
import createRoom from './utils/createRoom';
import addUserToRoom from './utils/addUserToRoom';
import updateRoom from './utils/updateRoom';
import updateWinners from './utils/updateWinners';
import addShips from './utils/addShips';
import startGame from './utils/startGame';
import turn from './utils/turn';
import attack from './utils/attack';

config();

const PORT = process.env.PORT;

const wss = new WebSocketServer({ port: 3000 });
let id = 0;

wss.on('connection', (ws: WebSocket) => {
  ws.on('error', console.error);

  const client: Client = { id: id++, ws };
  clients.push(client);

  ws.on('message', (message: Buffer) => {
    const { type } = JSON.parse(message.toString());

    try {
      switch (type) {
        case Commands.REG:
          const user = loginUser(message, client.id);

          ws.send(user);
          ws.send(updateRoom(rooms));
          ws.send(updateWinners());
          break;
        case Commands.CREATE_ROOM:
          const room = createRoom(message);

          ws.send(room);
          break;
        case Commands.ADD_USER_TO_ROOM:
          addUserToRoom();

          break;
        case Commands.ADD_SHIPS:
          addShips(message);

          if (shipsPosition.length === 2) {
            startGame();
            turn(shipsPosition[0].id);
          }
          break;
        case Commands.ATTACK:
          attack(message);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log('Error', error);
    }
  });
});

wss.on('listening', () => {
  console.log(`WebSocket server is listening on port 3000`);
});

console.log(`Start static http server on the ${PORT} port!`);
httpServer.listen(PORT);
