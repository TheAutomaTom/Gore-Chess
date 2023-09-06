<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="gameboard">
    <template v-for="r in 8" :key="r">
      <template v-for="s in 8" :key="s">
        <square-and-piece :square="board.layout[r-1][s-1]" />
      </template>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useGameState } from "../../state/Game.state";
import SquareAndPiece from "./SquareAndPiece.vue";
const game$ = useGameState();
const board = ref(game$.Gameboard);

</script>
<style scoped lang="scss">

.gameboard {
  max-height: 100%;
  margin: auto;
  aspect-ratio: 1 / 1;

  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  column-gap: 0px;
  row-gap: 0px;

}
</style>
