<template>
  <div id="app">
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

  import {stompClient} from "../socket/stompClient";

  export default {
    data() {
      return {
        message: 'Dynamic Content',
        list1: [],
        list2: []
      }
    },
    mounted() {
      let client = new stompClient().subscribe('/topic/price', val => {
        this.list1 = val;
      });
      let client2 = new stompClient().subscribe('/topic/price-fast', val => {
        this.list2 = val;
      });
    },
  }
</script>

<style>

</style>
