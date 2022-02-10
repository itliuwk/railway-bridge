<template>
  <div>
    <!-- <index-chart v-if="indexStyle==1"></index-chart>
    <index-bdc v-if="indexStyle==2"></index-bdc>
    <index-task v-if="indexStyle==3"></index-task>
    <div style="width: 100%;text-align: right;margin-top: 20px">
      请选择首页样式：
      <a-radio-group v-model="indexStyle">
        <a-radio :value="1">统计图表</a-radio>
        <a-radio :value="2">统计图表2</a-radio>
        <a-radio :value="3">任务表格</a-radio>
      </a-radio-group>

    </div> -->
    <!-- <img :src="imgSrc" style="width:100%; margin-top: 1%; height: 100%;"/> -->
    <p>重载铁路桥梁空地协同保障大数据管理平台</p>
  </div>
</template>

<script>
import IndexChart from "./IndexChart";
import IndexTask from "./IndexTask";
import IndexBdc from "./IndexBdc";
import imgSrc from "@/views/tky/index.jpg";

export default {
  name: "Analysis",

  components: {
    IndexChart,
    IndexTask,

    IndexBdc,
  },
  data() {
    return {
      indexStyle: 1,
      imgSrc: imgSrc,
    };
  },
  created() {},
  methods: {},
};
</script>
