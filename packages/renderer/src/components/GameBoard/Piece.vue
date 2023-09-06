<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <span
    :class="`${piece?.color} ${isPickedUp ? 'is-picked-up' : ''}`"
  >
    {{ piece?.icon }}
  </span>
</template>

<script setup lang="ts">
import type { PropType} from "vue";
import { computed, ref } from "vue";
import type { ChessPiece } from "../../models/PieceModel";
import { useGameState } from "../../state/Game.state";
const game$ = useGameState();

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  piece: Object as PropType<ChessPiece>
});

const piece = ref(props.piece);

const isPickedUp = computed((): boolean => {
  return game$.PiecePickedUp?.coordinate == piece.value?.coordinate;
});

</script>
<style scoped lang="scss">
.white-piece {
  color: white;
  // -webkit-text-stroke-width: 1px;
  // -webkit-text-stroke-color: gold;
  text-shadow: 2px 3px 2px black;
}
.black-piece {
  color: black;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: grey;
  text-shadow: -2px -4px 2px white;
}
.is-picked-up {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: gold;
}

</style>


