<template>
  <div id="ch-header">
    <div class="avue-draggable">
      <svg id="sketchpad" height="90" width="100%">
        <polyline
          fill="transparent"
          points="0,85 315,85 370,20 540,20 595,85 1330,85 1385,20 1555,20 1608,85 1920,85"
          stroke="#00CED1"
          stroke-width="2"
        >
          <animate
            attributeName="stroke-dasharray"
            attributeType="XML"
            from="0,960 0,960"
            to="0,0 2049,0"
            dur="7s"
            begin="0s"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.4,1,0.4,1"
            repeatCount="indefinite"
          ></animate>
        </polyline>

        <!--              <polyline fill="transparent" points="576,35.2 1344,35.2" stroke="#BCF25D" stroke-width="2">-->
        <!--                <animate attributeName="stroke-dasharray" attributeType="XML" begin="0s" calcMode="spline" dur="7s" from="0, 384, 0, 384" keySplines=".4,1,.49,.98" keyTimes="0;1" repeatCount="indefinite" to="0, 0, 768, 0">-->
        <!--                </animate>-->
        <!--              </polyline>-->
      </svg>
    </div>
    <div class="right-btn">
      <a-button ghost type="primary" @click="goPage">
        进入后台系统
        <Icon type="ios-arrow-forward" />
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ch-header",
  methods: {
    goPage() {
      this.$router.push("/tky/TkyBridgeInfoList");
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
#ch-header {
  width: 100%;
  height: 80px;
  position: fixed;
  background: url("../../assets/image/head.png");
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 999;

  .avue-draggable {
    width: 100%;
    height: 90px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .right-btn {
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translate(0, -30%);
    z-index: 9999;
    color: #ededed;

    button {
      color: #ededed !important;
    }
  }
}
</style>
