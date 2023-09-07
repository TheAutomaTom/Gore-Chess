import type { Square } from "../models/GameboardModel";
import { GameboardModel, Coordinate } from "../models/GameboardModel";
import { PieceColor } from "../models/PieceModel";
import { defineStore } from "pinia";
import { nextTick, reactive, ref } from "vue";

export const useGameState = defineStore("GameState", () => {

  const Gameboard= reactive(new GameboardModel());
  const MyColor= ref(PieceColor.white);
  const IsMyTurn= ref(true);
  const OriginSquare= ref({} as Square | undefined);


  const HandleSelectSquare = (target: Square) => {
    if(IsMyTurn.value == false || undefined){
      return console.warn("[HandleSelectSquare] It's not my turn.");
    }

    if(IsMyTurn.value == true){
      console.log("[HandleSelectSquare] It's my turn...");

      if(target.piece == undefined && OriginSquare.value == undefined){
        return console.warn("[HandleSelectSquare] ...nothing to select.");
      }

      if(target.piece && target.piece.color == MyColor.value){
        console.warn("[HandleSelectSquare] ...picking up my piece.");
        return pickupPiece(target);
      }

      else if(OriginSquare.value?.coordinate != undefined){
        console.log("...");
        console.log(`[HandleSelectSquare] ...tryCaptureSquare (OriginSquare: ${OriginSquare.value.coordinate.file}${OriginSquare.value.coordinate.row})...`);
        return tryCaptureSquare(target);
      }
    }


  };


  // Private Methods...
  const tryCaptureSquare = (targetSquare: Square) => {


    // ABORT If my piece is already there...
    if(targetSquare.piece?.color == MyColor.value){
      console.warn("[tryCaptureSquare] You already occupy this square.");
      dropAllPieces();
      return;
    }



    // ATTACK If there is a piece to capture...
    if(targetSquare.piece && targetSquare.piece.color  != MyColor.value){
      /* TODO: Validate movement */
      const cloneOfOriginPiece = (JSON.parse(JSON.stringify(OriginSquare.value?.piece)));

      Gameboard.layout.map((row)=>
        row.map((iSquare) => {
          if(iSquare == targetSquare){
            console.log(`[tryCaptureSquare/ ATTACK] ...REPLACE ${iSquare.piece} with ${cloneOfOriginPiece}...`);
            cloneOfOriginPiece.Coordinate = new Coordinate(iSquare.coordinate.file, iSquare.coordinate.row);
            iSquare.piece = cloneOfOriginPiece;

          } else if(iSquare.coordinate == OriginSquare.value?.coordinate){
            console.log(`[tryCaptureSquare/ ATTACK] iSquare 2: ${iSquare.coordinate.file}${iSquare.coordinate.row}`);
            iSquare.piece = OriginSquare.value = undefined;
            console.log(`[tryCaptureSquare/ ATTACK] ...REMOVE piece at origin square: ${iSquare.piece}`);
          }
        })
      );
      nextTick();
      console.warn("[tryCaptureSquare/ ATTACK] Captured piece.");
      return;
    }



    // MOVE If no pieces are there...
    if(targetSquare.piece == undefined){
      const cloneOfOriginPiece = (JSON.parse(JSON.stringify(OriginSquare.value?.piece)));

      Gameboard.layout.map((row)=>
        row.map((iSquare) => {
          if(iSquare == targetSquare){
            console.log(`[tryCaptureSquare/ MOVE] ...REPLACE ${iSquare.piece} with ${cloneOfOriginPiece}...`);
            cloneOfOriginPiece.Coordinate = new Coordinate(iSquare.coordinate.file, iSquare.coordinate.row);
            iSquare.piece = cloneOfOriginPiece;

          } else if(iSquare.coordinate == OriginSquare.value?.coordinate){
            console.log(`[tryCaptureSquare/ MOVE] iSquare 2: ${iSquare.coordinate.file}${iSquare.coordinate.row}`);
            iSquare.piece = OriginSquare.value = undefined;
            console.log(`[tryCaptureSquare/ MOVE] ...REMOVE piece at origin square: ${iSquare.piece}`);
          }
        })
      );
      nextTick();
      console.warn("[tryCaptureSquare/ ATTACK] Captured piece.");
      return;
    }
  };

  const pickupPiece = (square: Square) => {
    dropAllPieces();
    OriginSquare.value = square;
  };

  const dropAllPieces = () => {
    Gameboard.layout.map((row)=>
      row.map((square) => {
        if(square.piece) square.piece.isSelected = false;
      })
    );
  };

  return {
    Gameboard,
    OriginSquare,
    HandleSelectSquare
    // Prj$: Project$,
  };
});

