<template>
  <div>
    <info-panel id="panel" class="scrol" @click.stop="stop"/>
    <div>
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
  import { scene } from "../js/three/scene";
  import InfoPanel from "../components/InfoPanel";

  export default {
    components: {
      InfoPanel
    },
    data() {
      return {}
    },
    mounted() {
      let canvas = document.getElementById("canvas");
      new scene(canvas);
    },
    methods: {
      stop() {
        // 阻止画布事件
      }
    }

  }
</script>

<style>
  #panel {
    position: absolute;
    right: 20px;
    top: 20px;
    max-height: 300px;
    overflow: auto;
    z-index: 9999;
  }

  .scrol {
    overflow: auto;
  }
  .scrol::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 7px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .scrol::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #b1b1b1;
  }

  .scrol::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 10px;
    background: #ededed;
  }
</style>
