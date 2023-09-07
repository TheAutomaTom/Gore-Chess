import type { GameboardModel } from "../renderer/src/models/GameboardModel";


export class GameDto {
  id: number;
  gameboard: GameboardModel;
  constructor(id: number,  game: GameboardModel){
    this.id = id;
    this.gameboard = game;
  }

}
