import {
  Client,
  RequestLoginData,
  Room,
  Ship,
  Winner,
} from '../types';

export const clients: Client[] = [];
export const users: RequestLoginData[] = [];
export const rooms: Room[] = [];
export const shipsPosition: {
  id: number;
  data: Ship[];
}[] = [];
export const winners: Winner[] = [];

export let PLAYER_TURN: number;

export const setPlayerTurn = (value: number) => {
  PLAYER_TURN = value;
};
