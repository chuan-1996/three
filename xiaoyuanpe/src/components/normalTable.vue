<template>
  <table class="pure-table pure-table-horizontal">
    <thead>
    <tr>
      <th :colspan="col">{{title}}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(tr, index) in table" :key="index">
      <td v-for="td in tr">{{td}}</td>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    props: {
      title: {
        default: ""
      },
      table: {
        default: []
      },
    },
    data() {
      return {
        col: null
      }
    },
    watch: {
      table() {
        this.col = this.table[0].length;
      }
    },
    methods: {
      deleteTr(index) {
        this.table.splice(index, 1);
      }
    },
    mounted() {
      if(this.table.length !== 0 ) {
        this.col = this.table[0].length;
      }
    }
  }
</script>
<style scoped>
  table {
    border-collapse: collapse;
    border-spacing: 0;
    background-color: white;
  }

  td, th {
    padding: 0;
  }

  .pure-table {
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #cbcbcb;
  }

  .pure-table caption {
    color: #000;
    font: italic 85%/1 arial, sans-serif;
    padding: 1em 0;
    text-align: center;
  }

  .pure-table td, .pure-table th {
    border-left: 1px solid #cbcbcb;
    border-width: 0 0 0 1px;
    font-size: inherit;
    margin: 0;
    overflow: visible;
    padding: .5em 1em;
  }

  .pure-table thead {
    background-color: #e0e0e0;
    color: #000;
    text-align: left;
    vertical-align: bottom;
  }

  .pure-table td {
    background-color: transparent;
  }
  .delete{
    cursor: pointer;
  }
  .delete:hover{
    color: red;
  }
</style>
