<template>
    <div :id="highchartsID" ref="highcharts"></div>
</template>

<script>
  import highCharts from "highcharts";
  import variablePie from 'highcharts/modules/variable-pie'
  import oldie from 'highcharts/modules/oldie'

  require('highcharts/modules/variable-pie')(highCharts);
  require('highcharts/modules/oldie')(highCharts);
  export default {
    name: "highcharts",
    props: ['options', 'styles','highchartsID'],
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      highCharts.setOptions({
        lang: {
          contextButtonTitle: "图表导出菜单",
          decimalPoint: ".",
          downloadJPEG: "下载JPEG图片",
          downloadPDF: "下载PDF文件",
          downloadPNG: "下载PNG文件",
          downloadSVG: "下载SVG文件",
          drillUpText: "返回 {series.name}",
          loading: "加载中",
          months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
          noData: "没有数据",
          numericSymbols: ["千", "兆", "G", "T", "P", "E"],
          printChart: "打印图表",
          resetZoom: "恢复缩放",
          resetZoomTitle: "恢复图表",
          shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          thousandsSep: ",",
          weekdays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"]
        }
      })
      this.$nextTick(() => {
        this.initChart();
      })
      setTimeout(() => {
        // this.chart.hideLoading();
      }, 1000);

    },
    watch:{
      options(data){
        //  console.log(data)
         this.initChart()
      }
    },
    methods: {
      initChart() {
        this.$el.style.width = (this.styles.width || 800) + 'px';
        this.$el.style.height = (this.styles.height || 353) + 'px';
        this.chart = highCharts.chart(this.highchartsID, this.options)

        // this.chart.showLoading();
      },
    },
  }
</script>

<style  lang="less">
    #highcharts-container {
        width: 100%;
        height: 280px;


    }
</style>
