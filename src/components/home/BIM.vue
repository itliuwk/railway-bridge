<template>
  <div id="Bim">

  </div>
</template>

<script>
export default {
  name: "BIM",
  methods:{
    initMap(){
      let that = this;
      //初始化地图
      that.viewer = new Cesium.Viewer('Bim');
      let scene = that.viewer.scene;
      try{
        // var promise = scene.open("http://localhost:8090/iserver/services/3D-CeShi/rest/realspace");
        scene.open("http://localhost:8090/iserver/services/3D-hongshanya_zuo_biao/rest/realspace");
      }
      catch(e){

      }


    },
  },
  mounted() {
    this.initMap();
  }
}
</script>

<style scoped>
#Bim{
  width: 100%;
  height: 100%;
}
</style>
