<template>
  <div
    class="gameboard-div"
  >
    <Gameboard></Gameboard>
  </div>
</template>
<script setup lang="ts">
import Gameboard from "../components/GameBoard/Gameboard.vue";
</script>
<style scoped lang="scss">

.gameboard-div {
  // position: relative;
  // left:0; top:0; right:0; bottom:0;
  height: 160px;
  font-size: 1em;
}

  @media screen and (min-height: 280px) {
    .gameboard-div {
      height: 220px;
      font-size: 1.5em;
      // background-color: #551712;
    }
  }
  @media screen and (min-height: 350px) {
    .gameboard-div {
      height: 280px;
      font-size: 2em;
      // background-color: #aa2e25;
    }
  }
  @media screen and (min-height: 480px) {
    .gameboard-div {
      height: 400px;
      font-size: 2em;
      // background-color: #551712;
    }
  }

  @media screen and (min-height: 640px) {
    .gameboard-div {
      height: 550px;
      font-size: 2.75em;
      // background-color: #aa2e25;
    }
  }

  @media screen and (min-height: 768px) {
    .gameboard-div {
      height: 680px;
      font-size: 3.5em;
      // background-color: #551712;
    }
  }
  @media screen and (min-height: 1024px) {
    .gameboard-div {
      height: 900px;
      font-size: 4em;
      // background-color: #aa2e25;

    }
  }
  @media screen and (min-height: 1280px) {
    .gameboard-div {
      font-size: 5em;
    }
  }
</style>
