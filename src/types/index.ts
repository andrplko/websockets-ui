import { WebSocket } from 'ws';

export enum Commands {
  REG = 'reg',
  CREATE_GAME = 'create_game',
  START_GAME = 'start_game',
  ATTACK = 'attack',
  TURN = 'turn',
  RANDOM_ATTACK = 'randomAttack',
  FINISH = 'finish',
  CREATE_ROOM = 'create_room',
  UPDATE_ROOM = 'update_room',
  UPDATE_WINNERS = 'update_winners',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  ADD_SHIPS = 'add_ships',
}

export interface Client {
  id: number;
  ws: WebSocket;
}

export interface RequestLogin {
  type: Commands.REG;
  data: string;
  id: number;
}

export type RequestLoginData = {
  name: string;
  password: string;
};

export interface ResponseLogin {
  type: Commands.REG;
  data: ResponseLoginData | string;
  id: number;
}

export type ResponseLoginData = {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
};

export interface ResponseUpdateWinners {
  type: Commands.UPDATE_WINNERS;
  data: Winner[] | string;
  id: number;
}

export interface Winner {
  name: string;
  wins: number;
}

export interface ResponseFinishGame {
  type: Commands.FINISH;
  data:
    | {
        winPlayer: number | string;
      }
    | string;
  id: number;
}

export interface RequestCreateRoom {
  type: Commands.CREATE_ROOM;
  data: string;
  id: number;
}

export interface ResponseCreateGame {
  type: Commands.CREATE_GAME;
  data:
    | {
        idGame: number;
        idPlayer: number;
      }
    | string;
  id: number;
}

export interface ResponseUpdateRoom {
  type: Commands.UPDATE_ROOM;
  data: Room[] | string;
  id: number;
}

export interface Room {
  roomId: number;
  roomUsers: [
    {
      name: string;
      index: number;
    },
  ];
};

export interface RequestAddUserToRoom {
  type: Commands.ADD_USER_TO_ROOM;
  data: {
    indexRoom: number;
  };
  id: number;
}

export interface RequestAddShips {
  type: Commands.ADD_SHIPS;
  data: string;
  id: number;
}

export type RequestAddShipsData = {
  gameId: number;
  ships: Ship[];
  indexPlayer: number;
};

export interface Ship {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}

export interface ResponseStartGame {
  type: Commands.START_GAME;
  data: string;
  id: number;
}

export type ResponseStartGameData = {
  ships: Ship[];
  currentPlayerIndex: number;
};

export interface ResponseTurn {
  type: Commands.TURN;
  data:
    | {
        currentPlayer: number;
      }
    | string;
  id: number;
}

export interface RequestAttack {
  type: Commands.ATTACK;
  data: string;
  id: number;
}

export type RequestAttackData = {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
};

export interface ResponseAttack {
  type: Commands.ATTACK;
  data:
    | {
        position: {
          x: number;
          y: number;
        };
        currentPlayer: number;
        status: 'miss' | 'killed' | 'shot';
      }
    | string;
  id: number;
}

export interface RequestRandomAttack {
  type: Commands.RANDOM_ATTACK;
  data: {
    gameId: number;
    indexPlayer: number;
  };
  id: number;
}
