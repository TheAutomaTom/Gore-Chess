import type { Coordinate } from "./GameboardModel";

export enum PieceColor {
  black = "black-piece",
  white = "white-piece"
}

export enum PieceName {
  king,
  queen,
  bishop,
  knight,
  rook,
  pawn
}

export enum Icon {
  // Filled icons for black
  x = "x",
  bk = "♚",
  bq = "♛",
  bb = "♝",
  bn = "♞",
  br = "♜",
  bp = "♟",
  // Filled icons for white (I expected to use two different fonts)
  // wk = "♚",
  // wq = "♛",
  // wb = "♝",
  // wn = "♞",
  // wr = "♜",
  // wp = "♟"
  // Line icons for white (look too light, but keep looking for better fonts)
  wk = "♔",
  wq = "♕",
  wb = "♗",
  wn = "♘",
  wr = "♖",
  wp = "♙"
}


export abstract class ChessPiece {
  color: PieceColor;
  name: PieceName;
  icon: Icon;
  coordinate: Coordinate;
  isSelected: boolean= false;

  constructor(name: PieceName, color: PieceColor, coordinate: Coordinate){
    this.color = color;
    this.name = name;
    this.coordinate = coordinate;
    if(color == PieceColor.black){
      switch (name) {
        case PieceName.king:
          this.icon = Icon.bk;
        break;
        case PieceName.queen:
          this.icon = Icon.bq;
        break;
        case PieceName.bishop:
          this.icon = Icon.bb;
        break;
        case PieceName.knight:
          this.icon = Icon.bn;
        break;
        case PieceName.rook:
          this.icon = Icon.br;
        break;
        default:
          this.icon = Icon.bp;
        break;
      }
    } else {
      switch (name) {
        case PieceName.king:
          this.icon = Icon.wk;
        break;
        case PieceName.queen:
          this.icon = Icon.wq;
        break;
        case PieceName.bishop:
          this.icon = Icon.wb;
        break;
        case PieceName.knight:
          this.icon = Icon.wn;
        break;
        case PieceName.rook:
          this.icon = Icon.wr;
        break;
        default:
          this.icon = Icon.wp;
        break;
      }
    }
  //getLegalMoves():Coordinate[];
  }
}
export class King extends ChessPiece {
  constructor(color: (PieceColor), coordinate: Coordinate){
    super(PieceName.king, color, coordinate);
  }
}
export class Queen extends ChessPiece {
  constructor(color: (PieceColor), coordinate: Coordinate){
    super(PieceName.queen, color, coordinate);
  }
}
export class Bishop extends ChessPiece {
  constructor(color: (PieceColor), coordinate: Coordinate){
    super(PieceName.bishop, color, coordinate);
  }
}
export class Knight extends ChessPiece {
  constructor(color: (PieceColor), coordinate: Coordinate){
    super(PieceName.knight, color, coordinate);
  }
}
export class Rook extends ChessPiece {
  constructor(color: (PieceColor), coordinate: Coordinate){
    super(PieceName.rook, color, coordinate);
  }
}
export class Pawn extends ChessPiece {
  constructor(color: (PieceColor), coordinate: Coordinate){
    super(PieceName.pawn, color, coordinate);
  }
}

export * as ChessPieceModels from "./PieceModel";
