<template>
  <div>
    <h1>Stock Price</h1>
    <div>
      <ul>
        <li v-for="m in list1">{{m.name}}: {{m.price}}</li>
      </ul>
    </div>
    <div>
      <ul>
        <li v-for="m in list2">{{m.name}}: {{m.price}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { initStomp } from "../js/socket/stompClient";

  export default {
    data() {
      return {
        list1: [],
        list2: []
      }
    },
    mounted() {
      initStomp();
    },
  }
</script>

<style>

</style>
