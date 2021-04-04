<template>
  <canvas id="canvas"> </canvas>
</template>

<script>
  import { sceneConstructor } from "../js/three/scene";
  export default {
    data() {
      return {

      }
    },
    mounted() {
      sceneConstructor.createScene("canvas");
    }
  }
</script>

<style>

</style>
