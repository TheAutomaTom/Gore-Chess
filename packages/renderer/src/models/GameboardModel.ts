
import type { ChessPiece } from "./PieceModel";
import { Rook, PieceColor, Knight, Pawn, Bishop, King, Queen } from "./PieceModel";


export const Files = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const Rows  = [1, 2, 3, 4, 5, 6, 7];

// type toString = () => string;

export class Coordinate {
  file: string;
  row:  number;
  // public get toString(): string{
  //   return `${this.file}${this.file}`;
  // }
  // asString = () => `${this.file}${this.file}`;

  constructor(file: string, row:  number){
    this.file = file;
    this.row = row;
  }
}

export type Square = {
  color: "light-square" | "dark-square";
  coordinate: Coordinate;
  piece: ChessPiece | undefined ;
}


export class GameboardModel {
  layout: Square[][];

  constructor() {
    this.layout = [[],[],[],[],[],[],[],[]];

    for (let iRow = 0; iRow < 8; iRow++) {
      for (let iFile = 0; iFile < 8; iFile++) {

        const square = {
          color: this._getSquareColor(iRow+1, iFile),
          coordinate: {
            row: iRow+1,
            file: Files[iFile]
          } as Coordinate,
          piece: undefined
        } as Square;

        switch (iRow) {
          case 0:
            switch (iFile) {
              case 0:
              case 7:
                square.piece= new Rook(PieceColor.black, square.coordinate);
              break;
              case 1:
              case 6:
                square.piece= new Knight(PieceColor.black, square.coordinate);
              break;
              case 2:
              case 5:
                square.piece= new Bishop(PieceColor.black, square.coordinate);
              break;
              case 3:
                square.piece= new Queen(PieceColor.black, square.coordinate);
              break;
              case 4:
                square.piece= new King(PieceColor.black, square.coordinate);
              break;
              default: break;
            }
          break;
          case 1:
            square.piece= new Pawn(PieceColor.black, square.coordinate);
          break;

          case 6:
            square.piece= new Pawn(PieceColor.white, square.coordinate);
          break;
          case 7:
            switch (iFile) {
              case 0:
              case 7:
                square.piece= new Rook(PieceColor.white, square.coordinate);
              break;
              case 1:
              case 6:
                square.piece= new Knight(PieceColor.white, square.coordinate);
              break;
              case 2:
              case 5:
                square.piece= new Bishop(PieceColor.white, square.coordinate);
              break;
              case 3:
                square.piece= new Queen(PieceColor.white, square.coordinate);
              break;
              case 4:
                square.piece= new King(PieceColor.white, square.coordinate);
              break;
              default: break;
            }
          break;
          default: break;
        }

        this.layout[iRow].push(square);
        }  // ...for files
    } // ...for rows
  }

  _getSquareColor = (rowNumber: number, fileNumber: number): string => {
    if(rowNumber % 2 != 0){
      // This row lead with 'dark'
      return fileNumber % 2 != 0 ? "dark-square" : "light-square";
    } else {
      // This row lead with 'light'
      return fileNumber % 2 == 0 ? "dark-square" : "light-square";
    }
  };




}
