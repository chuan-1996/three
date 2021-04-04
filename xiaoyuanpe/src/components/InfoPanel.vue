<template>
  <div v-show="show">
    <normal-table v-for="(table, index) in tables"
                  :title="table.title"
                  :table="table.content"
                  :key="index"
                  class="table">

    </normal-table>
  </div>
</template>

<script>
  import normalTable from "./normalTable.vue";
  import { eventBus } from "../js/bus";
  import { ThingType } from "../js/three/Thing";

  export default {
    components: {
      NormalTable: normalTable
    },
    data() {
      return {
        show: false,
        tables: [],
      }
    },
    mounted() {
      eventBus.on("pickInfo", info => {
        if (info) {
          this.parseInfo(info);
          this.show = true;
          let panel = document.getElementById("panel");
          panel.scrollTo(0, 0);
        } else {
          this.show = false
        }

      });
    },
    methods: {
      // 解析thing里的info
      parseInfo(info) {
        this.tables = [];
        switch (info.type) {
          case ThingType.VENUE:
            this.tables.push({
              title: info.name,
              content: [
                ["器材租赁", "储物柜、球拍，租拍5块钱一只，不限时间"],
                ["器材维护", "拉线"],
                ["更多服务", "WIFI、支持刷卡、会员卡、专业培训、羽毛球培训"],
                ["洗浴设施", "更衣室、提供洗浴、热水供应、免费热水淋浴"],
                ["场馆卖品", "饮料、羽毛球、球拍、球鞋、球衣、拍线"],
                ["发票", "趣运动提供发票，仅限发票套餐"],
                ["停车", "工业园停车（5块钱一小时，30元封顶）"],
                ["地板", "塑胶地板、木质地板"], ["灯光", "侧灯"], ["休息区", "风扇"]
              ]
            });
            this.tables.push({
              title: "交通信息",
              content: [
                ["公交", "赤岗路口，步行约5分钟"], ["地铁", "客村地铁D出口，步行约10-15分钟"],
              ]
            });
            break;
          case ThingType.BUILDING:
          case ThingType.STUDENT:
          case ThingType.INSTRUMENT:
          case ThingType.ACTIVITY:
          default:
            this.tables.push({
              title: info.name,
              content: [
                [info.name, info.name],
                [info.name, info.name],
              ]
            });
            break;
        }

      }
    }
  }
</script>

<style>
  .table {
    margin-bottom: 10px;
  }
</style>
