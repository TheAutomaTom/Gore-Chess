import { GameboardModel } from "../models/GameboardModel";
import type { Square } from "../models/GameboardModel";
import { defineStore } from "pinia";
import { nextTick, reactive, ref } from "vue";
import { PieceColor } from "../models/PieceModel";

export const useGameState = defineStore("GameState", () => {

  const Gameboard= reactive(new GameboardModel());
  const MyColor= ref(PieceColor.white);
  const IsMyTurn= ref(true);
  const OriginSquare= ref({} as Square | undefined);


  const HandleSelectSquare = (square: Square) => {
    console.log("[HandleSelectSquare] ...");
    if(IsMyTurn.value == false || undefined){
      console.warn("[HandleSelectSquare] It's not my turn.");
      return;
    }

    if(IsMyTurn.value == true){
      console.log("[HandleSelectSquare] It's my turn...");

      if(square.piece == undefined && OriginSquare.value == undefined){
        console.warn("[HandleSelectSquare] Nothing to move here.");
        return;
      }

      if(square.piece && square.piece.color == MyColor.value){
          console.warn("[HandleSelectSquare] ...picking up my piece.");
          pickupPiece(square);
          return;
      }

      else {
          console.log("[HandleSelectSquare] ...tryCaptureSquare...");
          tryCaptureSquare(square);
          return;
        }
    }


  };


  // Private Methods...
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

  const tryCaptureSquare = (targetSquare: Square) => {

    // If my piece is already there...
    if(targetSquare.piece?.color == MyColor.value){
      console.warn("[tryCaptureSquare] You already occupy this square.");
      dropAllPieces();
      return;
    }

    // If no pieces are there...
    else if(targetSquare.piece == undefined){
      console.log("[tryCaptureSquare] ...moving to Empty square...");

      OriginSquare.value!.coordinate = targetSquare.coordinate;

      Gameboard.layout.map((row)=>
        row.map((square) => {
          if(square == targetSquare){
            square.piece = OriginSquare.value?.piece;
            square.piece!.coordinate = square.coordinate;
            console.log("[tryCaptureSquare] ...targetSquare modified...");
            console.log(`[tryCaptureSquare] ...modified targetSquare: ${targetSquare.piece}`);
            nextTick();
          }
          if(square.coordinate == OriginSquare.value?.coordinate){
            square.piece = undefined;
            console.log(`[tryCaptureSquare] ...modified origin square: ${square.piece}`);
            nextTick();

          }
        })
      );
      OriginSquare.value = undefined;
      console.warn("[tryCaptureSquare] OriginSquare.value = " + OriginSquare.value + " (expected to be undefined).");
        nextTick();
      return;
    }

    // If there is a piece to capture...
    else if(targetSquare.piece.color  != MyColor.value){
        console.warn("[tryCaptureSquare] Capturing piece.");
          // TODO: Validate movement


        OriginSquare.value!.coordinate = targetSquare.coordinate;
        targetSquare.piece = OriginSquare.value!.piece;
        OriginSquare.value = undefined;
        return;

    }


  };

  return {
    Gameboard,
    PiecePickedUp: OriginSquare,
    HandleSelectSquare
    // Prj$: Project$,
  };
});

