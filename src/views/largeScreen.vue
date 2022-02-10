<template>
  <div id="home">
    <header-c-h></header-c-h>
    <div class="content">
      <div id="cesiumContainer">
        <div class="left-view">
          <div class="des-card">
            <div style="width: 100%; line-height: 35px; margin-bottom: 20px">
              <span>飞行总里程</span>
              <Input value="56846" disabled style="width: 82%"></Input> m
            </div>
            <div style="width: 100%; line-height: 35px; margin-bottom: 20px">
              <span>本年飞行里程</span>
              <Input value="568" disabled style="width: 82%"></Input> m
            </div>
          </div>
          <div class="des-card">
            <div style="width: 100%; line-height: 35px; margin-bottom: 20px">
              <span>飞行总时间</span>
              <Input value="56846" disabled style="width: 82%"></Input> min
            </div>
            <div style="width: 100%; line-height: 35px; margin-bottom: 20px">
              <span>本年飞行时间</span>
              <Input value="568" disabled style="width: 82%"></Input> min
            </div>
          </div>
        </div>
        <div class="right-view">
          <div class="r-des-card">
            <div class="dse-c-header">
              <p>桥梁检测统计</p>
            </div>
            <div class="dse-c-main">
              <div class="circle">
                <p>
                  <span class="bg-color">32%</span>
                  <br />
                  <span class="dse-color">检测占比</span>
                </p>
              </div>
              <div class="content-cir">
                <div class="c-c-l">
                  <div class="c-header">桥梁总数</div>
                  <div class="c-content">98</div>
                </div>
                <div class="c-c-r">
                  <div class="c-header">本年已检测</div>
                  <div class="c-content">56</div>
                </div>
              </div>
            </div>
          </div>
          <div class="r-des-card">
            <div class="dse-c-header">
              <p>检测里程统计</p>
            </div>
            <div class="dse-c-main">
              <div class="circle">
                <p>
                  <span class="bg-color">32%</span>
                  <br />
                  <span class="dse-color">检测占比</span>
                </p>
              </div>
              <div class="content-cir">
                <div class="c-c-l">
                  <div class="c-header">检测总里程</div>
                  <div class="c-content">98m</div>
                </div>
                <div class="c-c-r">
                  <div class="c-header">本年已检测</div>
                  <div class="c-content">56m</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-view">
          <div class="b-card">
            <div class="b-c-header">
              <div class="left-title">
                <img
                  alt=""
                  src="../assets/image/形状8.png"
                  style="margin-left: -12px"
                  width="45"
                />
                <span>检测信息统计</span>
              </div>
              <div class="right-image">
                <img alt="" src="../assets/image/组45.png" />
              </div>
            </div>
            <div class="b-c-content">
              <highcharts
                ref="highcharts"
                :highcharts-i-d="highcharts.highchartsID"
                :options="highcharts.options"
                :styles="highcharts.styles"
              ></highcharts>
            </div>
          </div>
          <div class="b-card">
            <div class="b-c-header">
              <div class="left-title">
                <img
                  alt=""
                  src="../assets/image/形状8.png"
                  style="margin-left: -12px"
                  width="45"
                />
                <span>病害伤损等级统计</span>
              </div>
              <div class="right-image">
                <img alt="" src="../assets/image/组45.png" />
              </div>
            </div>
            <div class="b-c-content">
              <highcharts
                ref="highcharts"
                :highcharts-i-d="highcharts1.highchartsID"
                :options="highcharts1.options"
                :styles="highcharts1.styles"
              >
              </highcharts>
            </div>
          </div>
          <div class="b-card">
            <div class="b-c-header">
              <div class="left-title">
                <img
                  alt=""
                  src="../assets/image/形状8.png"
                  style="margin-left: -12px"
                  width="45"
                />
                <span>病害伤损等级统计</span>
              </div>
              <div class="right-image">
                <img alt="" src="../assets/image/组45.png" />
              </div>
            </div>
            <div class="b-c-content" style="position: relative">
              <highcharts
                ref="highcharts"
                :highcharts-i-d="highcharts2.highchartsID"
                :options="highcharts2.options"
                :styles="highcharts2.styles"
              ></highcharts>
              <div style="position: absolute; top: -5px; right: 75px">
                病害总数：<span style="font-size: 16px; color: rgba(236, 72, 72, 1)"
                  >456</span
                >
              </div>
            </div>
          </div>
          <div class="b-card">
            <div class="b-c-header">
              <div class="left-title">
                <img
                  alt=""
                  src="../assets/image/形状8.png"
                  style="margin-left: -12px"
                  width="45"
                />
                <span>典型病害图片展示</span>
              </div>
              <div class="right-image">
                <img alt="" src="../assets/image/组45.png" />
              </div>
            </div>
            <div class="b-c-content" style="overflow-y: auto">
              <div style="height: 170px; width: 195px">
                <el-image
                  style="width: 100%; height: 140px; border: 1px solid #1a7683"
                  :src="url"
                  :preview-src-list="srcList"
                >
                </el-image>
                <div class="dse_img">
                  SH-ZLH-S01_190405_K1195+482_0001-001-1-00-01_CK_VL-R
                </div>
              </div>
              <div style="height: 140px; width: 195px">
                <el-image
                  style="width: 100%; height: 140px; border: 1px solid #1a7683"
                  :src="url"
                  :preview-src-list="srcList"
                >
                </el-image>
                <div class="dse_img">
                  SH-ZLH-S01_190405_K1195+482_0001-001-1-00-01_CK_VL-R
                </div>
              </div>
              <div style="height: 140px; width: 195px">
                <el-image
                  style="width: 100%; height: 140px; border: 1px solid #1a7683"
                  :src="url"
                  :preview-src-list="srcList"
                >
                </el-image>
                <div class="dse_img">
                  SH-ZLH-S01_190405_K1195+482_0001-001-1-00-01_CK_VL-R
                </div>
              </div>
              <div style="height: 140px; width: 195px">
                <el-image
                  style="width: 100%; height: 140px; border: 1px solid #1a7683"
                  :src="url"
                  :preview-src-list="srcList"
                >
                </el-image>
                <div class="dse_img">
                  SH-ZLH-S01_190405_K1195+482_0001-001-1-00-01_CK_VL-R
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-show="popupDisplay"
        id="popup"
        :style="{
          opacity: popupOpcatity,
          left: popupLeft,
          top: popupTop,
        }"
        class="stationInfo"
      >
        <div class="popup-line"></div>
        <div class="content-boxs">
          <p class="content-title">
            <Icon type="ios-paper-outline" /><span
              style="font-size: 15px; margin-left: 10px"
              >桥梁1</span
            >
            <Button icon="ios-close" size="small" @click="closePopup"></Button>
          </p>
          <p class="content-main">
            桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介桥梁简介
          </p>
          <!--          <p class="content-bottom">-->
          <!--            <Button  ghost type="primary" @click="openBim">-->
          <!--              BIM展示-->
          <!--              <Icon type="ios-arrow-forward" />-->
          <!--            </Button>-->
          <!--          </p>-->
        </div>
      </div>
    </div>

    <!-- <Modal v-model="modal11" fullscreen title="BIM展示" footer-hide>
      <b-i-m></b-i-m>
    </Modal> -->
  </div>
</template>

<script>
import headerCH from "@/components/home/header";
import highcharts from "@/components/home/highcharts";

import BIM from "@/components/home/BIM";
// import  '@supermap/vue-iclient3d-webgl/dist/styles/vue-iclient3d-webgl.min.css';
export default {
  components: { headerCH, highcharts, BIM },
  name: "home",
  data() {
    return {
      map: "",
      popup: "",
      point_overlay: "",
      overall_lastfeature: "",
      highcharts: {
        highchartsID: "highchartsRainModal",
        options: {
          chart: {
            type: "spline",
            marginTop: 40,
            marginLeft: 0,
            marginRight: 0,
            backgroundColor: "rgba(26, 118, 131, 0)",
          },
          plotOptions: {
            spline: {
              marker: {
                enabled: false,
              },
            },
          },
          title: {
            text: "",
          },
          xAxis: {
            lineColor: "rgba(4, 187, 255, 1)",
            tickInterval: 2,
            categories: ["2015", "2016", "2017", "2018", "2019", "2020", "2021"],
            crosshair: true,
            labels: {
              style: {
                color: "#ffffff",
              },
            },
          },
          yAxis: [
            {
              gridLineDashStyle: "longdash",
              gridLineColor: "rgba(4, 187, 255, .5)",
              floor: 200,
              ceiling: 1500,
              tickInterval: 200,
              title: {
                text: "里程（m）",
                align: "high",
                offset: -62,
                rotation: 0,
                y: -30,
                style: {
                  color: "#ffffff",
                },
              },
              labels: {
                align: "left",
                x: 0,
                y: -10,
                format: "{value:.,0f}",
                style: {
                  color: "#ffffff",
                },
              },
              // showFirstLabel: false
            },
            {
              opposite: true, // 通过此参数设置坐标轴显示在对立面
              floor: 0,
              ceiling: 10,
              tickInterval: 1,
              gridLineDashStyle: "longdash",
              gridLineColor: "rgba(4, 187, 255, .5)",
              title: {
                text: "座数（个）",
                align: "high",
                offset: -57,
                rotation: 0,
                y: -30,
                style: {
                  color: "#ffffff",
                },
              },
              labels: {
                align: "right",
                x: 0,
                y: -10,
                format: "{value:.,0f}",
                style: {
                  color: "#ffffff",
                },
              },
              // showFirstLabel: false
            },
          ],
          legend: {
            align: "right",
            verticalAlign: "top",
            x: -70,
            y: -17,
            floating: true,
            borderWidth: 0,
            symbolRadius: 0,
          },
          tooltip: {
            shared: true,
            useHTML: true,
          },
          series: [
            {
              name: "检测里程",
              type: "spline",
              yAxis: 0,
              data: [400, 500, 600, 700, 500, 400, 800],
              color: "rgba(255, 252, 0, 1)",
            },
            {
              name: "座数",
              type: "spline",
              yAxis: 1,
              data: [1, 4, 3, 7, 3, 6, 7],
              color: "rgba(79, 248, 255, 1)",
            },
          ],
          // navigation: {
          //   menuItemStyle: {
          //     fontSize: '10px'
          //   }
          // },
          credits: { enabled: false },
        },
        styles: {
          width: "100%",
          height: 180,
        },
      },
      highcharts1: {
        highchartsID: "highchartsRainModal1",
        options: {
          chart: {
            type: "variablepie",
            // marginTop: 40,
            // marginLeft: 0,
            // marginRight: 0,
            backgroundColor: "rgba(26, 118, 131, 0)",
          },
          title: {
            text: "",
          },
          plotOptions: {
            variablepie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: false,
              },
              showInLegend: true,
            },
          },
          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle",
            itemMarginBottom: 10,
            itemMarginTop: 5,
            labelFormatter: function () {
              return this.name + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.y;
            },
          },
          series: [
            {
              minPointSize: 10,
              innerSize: "20%",
              zMin: 0,
              name: "countries",
              data: [
                {
                  color: "rgba(0, 247, 255, 1)",
                  name: "损失等级AA",
                  y: 16,
                  z: 40,
                },
                {
                  color: "rgba(1, 52, 155, 1)",
                  name: "损失等级A",
                  y: 22,
                  z: 50,
                },
                {
                  color: "rgba(254, 239, 77, 1)",
                  name: "损失等级B",
                  y: 26,
                  z: 80,
                },
                {
                  color: "rgba(168, 168, 168, 1)",
                  name: "损失等级C",
                  y: 28,
                  z: 140,
                },
              ],
            },
          ],
          credits: { enabled: false },
        },
        styles: {
          width: "100%",
          height: 180,
        },
      },
      highcharts2: {
        highchartsID: "highchartsRainModal2",
        options: {
          chart: {
            type: "column",
            marginTop: 40,
            marginLeft: 0,
            marginRight: 0,
            backgroundColor: "rgba(26, 118, 131, 0)",
          },
          plotOptions: {
            spline: {
              marker: {
                enabled: false,
              },
            },
          },
          title: {
            text: "",
          },
          xAxis: {
            lineColor: "rgba(4, 187, 255, 1)",
            tickInterval: 2,
            categories: [
              "钢梁铆钉",
              "钢梁铆钉",
              "钢梁铆钉",
              "钢梁铆钉",
              "钢梁铆钉",
              "钢梁铆钉",
            ],
            crosshair: true,
            labels: {
              style: {
                color: "#ffffff",
              },
            },
          },
          yAxis: [
            {
              gridLineDashStyle: "longdash",
              gridLineColor: "rgba(4, 187, 255, .5)",

              title: {
                text: "单位（个）",
                align: "high",
                offset: -62,
                rotation: 0,
                y: -30,
                style: {
                  color: "#ffffff",
                },
              },
              labels: {
                align: "left",
                x: 0,
                y: -10,
                format: "{value:.,0f}",
                style: {
                  color: "#ffffff",
                },
              },
              // showFirstLabel: false
            },
          ],
          legend: {
            align: "right",
            verticalAlign: "top",
            x: 0,
            y: -17,
            floating: true,
            borderWidth: 0,
            symbolRadius: 0,
          },
          tooltip: {
            shared: true,
            useHTML: true,
          },
          series: [
            {
              name: "病害",
              data: [15, 40, 52, 18, 20, 44],
              color: "rgba(143, 223, 254, .8)",
              borderColor: "#7DD8FE",
              maxPointWidth: 20,
            },
          ],
          // navigation: {
          //   menuItemStyle: {
          //     fontSize: '10px'
          //   }
          // },
          credits: { enabled: false },
        },
        styles: {
          width: "100%",
          height: 180,
        },
      },
      url: "../assets/image/1.PNG",
      srcList: ["../assets/image/1.PNG", "../assets/image/1.PNG"],
      popupDisplay: false,
      popupOpcatity: 1.0,
      popupLeft: "",
      popupTop: "",
      scene: "",
      isLeft: true,
      isRight: true,
      modal11: false,
    };
  },
  methods: {
    initMap() {
      let _this = this;
      let that = this;
      let token = "0b018552994f71a9467d24461a8f8238";
      //添加底图
      let imageryProvider = new Cesium.WebMapTileServiceImageryProvider({
        //加载天地图底图
        url:
          "http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
          token,
        layer: "tdtImgBasicLayer",
        style: "default",
        format: "image/jpeg",
        show: false,
        tileMatrixSetID: "GoogleMapsCompatible",
      });
      //添加注记图
      let imageryProviderList = new Cesium.WebMapTileServiceImageryProvider({
        url:
          "http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
          token,
        layer: "tdtImgAnnoLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
        show: false,
      });

      //初始化地图
      that.viewer = new Cesium.Viewer("cesiumContainer", {
        imageryProvider: new Cesium.BingMapsImageryProvider({
          key: "AnnNEbBANf3y_eVVM0_QAtFH5uzVYQcEk7VR1E4u-TDGggaE5jsfLAcuJHVWpp-s", //可至官网（https://www.bingmapsportal.com/）申请key
          url: "http://dev.virtualearth.net",
        }),
        terrainProvider: new Cesium.CesiumTerrainProvider({
          url:
            "https://www.supermapol.com/realspace/services/3D-stk_terrain/rest/realspace/datas/info/data/path",
          // requestWaterMask : true,
          // requestVertexNormals : true,
          isSct: false,
        }),
        navigationHelpButton: false, //是否显示右上角的帮助按钮
        infoBox: false, //是否显示信息框
        selectionIndicator: false, //是否显示选取指示器组件

        sceneMode: Cesium.SceneMode.SCENE3D,

        // clampToGround: true //开启贴地
      });

      that.viewer.imageryLayers.addImageryProvider(imageryProviderList);
      that.scene = that.viewer.scene;
      // 获取当前镜头位置的笛卡尔坐标
      let cameraPos = that.viewer.camera.position;

      // 获取当前坐标系标准
      let ellipsoid = that.viewer.scene.globe.ellipsoid;

      // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
      let cartographic = ellipsoid.cartesianToCartographic(cameraPos);

      //默认展示地图的位置

      let promise1 = that.scene.open(
        "http://localhost:8090/iserver/services/3D-qiao2_332ganghengqiao_zuobiao/rest/realspace"
      );
      let promise2 = that.scene.open(
        "http://localhost:8090/iserver/services/3D-qiao2_hongshanya_zuobiao/rest/realspace"
      );
      let promise3 = that.scene.open(
        "http://localhost:8090/iserver/services/3D-part1/rest/realspace"
      );
      let promise4 = that.scene.open(
        "http://localhost:8090/iserver/services/3D-part2/rest/realspace"
      );
      let promise5 = that.scene.open(
        "http://localhost:8090/iserver/services/3D-part3/rest/realspace"
      );

      // let promise = that.scene.open("http://localhost:8090/iserver/services/3D-RAIL/rest/realspace");
      // let promise1= that.scene.open("http://localhost:8090/iserver/services/3D-hongshanya_zuo_biao/rest/realspace");
      // let promise1= that.scene.open("https://iserver.supermap.io/iserver/services/3D-CBD/rest/realspace");

      Cesium.when.all(
        [promise1, promise2, promise3, promise4, promise5],
        function (layers) {
          that.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
              113.249753578609,
              38.5248505060184,
              2000 //设置镜头拉近高度用/ 拉远用*
            ),
            duration: 5,
            orientation: {
              heading: Cesium.Math.toRadians(0, 0),
              pitch: Cesium.Math.toRadians(-25, 0),
              roll: 0,
            },
          });
        }
      );

      let handler = new Cesium.ScreenSpaceEventHandler(that.viewer.scene.canvas); //获取事件句柄
      handler.setInputAction(function (pick) {
        //左键点击事件
        that.eventFunction(pick);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    mapFun() {
      let _this = this;
      _this.viewer.camera.changed.addEventListener(function (percentage) {
        let height = _this.getHeight();
        if (height > 4000) {
          _this.viewer.scene.globe.show = false; //不显示地球，这条和地球透明度选一个就可以
        } else {
          _this.viewer.scene.globe.show = true; //不显示地球，这条和地球透明度选一个就可以
        }
      });
    },
    getCenterPosition() {
      let _this = this;
      var result = _this.viewer.camera.pickEllipsoid(
        new Cesium.Cartesian2(
          _this.viewer.canvas.clientWidth / 2,
          _this.viewer.canvas.clientHeight / 2
        )
      );
      var curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);
      var lon = (curPosition.longitude * 180) / Math.PI;
      var lat = (curPosition.latitude * 180) / Math.PI;
      var height = _this.getHeight();
      return {
        lon: lon,
        lat: lat,
        height: height,
      };
    },
    getHeight() {
      let _this = this;
      if (_this.viewer) {
        var scene = _this.viewer.scene;
        var ellipsoid = scene.globe.ellipsoid;
        var height = ellipsoid.cartesianToCartographic(_this.viewer.camera.position)
          .height;
        return height;
      }
    },

    addMarker(data) {
      for (let i = 0; i <= data.length; i++) {
        let item = data[i];
        let img = "../../assets/image/map_icon.png",
          width = 25,
          height = 25;
        let objs = {
          id: i,
          position: Cesium.Cartesian3.fromDegrees(
            data[i].lgtd,
            data[i].lttd,
            data[i].height
          ),
          billboard: {
            image: img,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            scale: 1,
            width: 25,
            height: 25,
            heightReference: Cesium.HeightReference.NONE,
            disableDepthTestDistance: Number.POSITIVE_INFINITY, //广告牌不进行深度检测
          },
          label: {
            //创建一个Label实体
            text: item.name,
            pixelOffset: new Cesium.Cartesian2(30, -15),
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            font: "normal 12px MicroSoft YaHei",
            // fillColor: Cesium.Color.ORANGERED, //字体颜色
            fillColor: Cesium.Color.fromCssColorString("#EFF0F1"),
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 10,
            style: Cesium.LabelStyle.FILL,
          },
          monitoItems: {
            item,
          },
        };
        this.viewer.entities.add(objs);
      }
    },
    //关闭popup
    closePopup() {
      let that = this;
      let handler = new Cesium.ScreenSpaceEventHandler(that.viewer.scene.canvas); //获取事件句柄
      handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      this.popupDisplay = false;
    },
    eventFunction(pick, ev) {
      let that = this;
      // console.log(that.scene.pick(pick.position));
      let picks = that.scene.pick(pick.position);

      if (picks && picks.id) {
        var oEvent = ev || event;
        let obj = {
          x: oEvent.clientX,
          y: oEvent.clientY,
        };
        let px = obj.x + 10;
        let py = obj.y - 180;
        console.log(obj);
        this.popupLeft = px + "px";
        this.popupTop = py + "px";
        this.popupDisplay = true;
      }
      // }else{
      //   this.popupDisplay = false;
      // }
    },
    openBim() {
      // let that=this;
      // that.modal11=true;
    },
  },
  mounted() {
    let that = this;
    this.$nextTick(() => {
      this.initMap();
      this.mapFun();
      setTimeout(() => {
        let point = [
          {
            ids: 1,
            lgtd: 113.25126886027387,
            lttd: 38.54373842172771,
            height: 900,
            name: "桥隧1",
          },
          {
            ids: 2,
            lgtd: 115.009923077255,
            lttd: 38.4853634457961,
            height: 900,
            name: "钢桁桥",
          },
          {
            ids: 3,
            lgtd: 113.259753578609,
            lttd: 38.5248505060184,
            height: 900,
            name: "红山崖",
          },
        ];
        this.addMarker(point);
      }, 3000);
    });
  },
  watch: {
    popupDisplay(val) {
      let that = this;
    },
  },
};
</script>

<style lang="less" scoped>
#home {
  width: 100%;
  height: 100%;
  .content {
    height: 100%;
  }

  #cesiumContainer {
    padding: 0;
    margin: 0;
    position: relative;
    background-color: black;
    overflow: hidden;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    /deep/.cesium-viewer-navigationContainer,
    .cesium-viewer-bottom {
      display: none !important;
    }

    .left-view {
      position: absolute;
      top: 90px;
      left: 30px;
      width: 200px;
      height: 590px;
      background-image: url("../assets/image/无人机.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      z-index: 99;
      padding-top: 100px;
      padding-left: 10px;
      padding-right: 10px;
      .des-card {
        width: 100%;
        height: 80px;
        color: #ffffff;
        font-weight: 400;
        input {
          background: #133a61 !important;
          border: 1px solid #196c7a !important;
          border-radius: 4px !important;
          height: 36px;
          font-size: 24px;
          font-weight: bold;
          color: #29b3d5;
        }
        span {
          font-size: 14px;
          font-weight: 400;
          color: #ffffff;
          opacity: 0.8;
          margin-bottom: 5px;
        }
      }
      .des-card:last-child {
        margin-top: 160px;
      }
    }

    .right-view {
      position: absolute;
      right: 30px;
      top: 113px;
      //width: 410px;
      min-height: 600px;
      //background-color: red;
      z-index: 99;
      padding: 10px;
      box-sizing: border-box;

      .r-des-card {
        width: 209px;
        height: 270px;
        background-image: url("../assets/image/右侧线框.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        margin: 0 auto;
        position: relative;
        padding: 5px;

        .dse-c-header {
          width: 100%;
          height: 31px;
          background-color: rgba(0, 164, 250, 0.5);

          p {
            text-align: center;
            font-size: 15px;
            line-height: 31px;
            color: #ffffff;
          }
        }

        .dse-c-main {
          height: calc(100% - 31px);
          width: 100%;
          background-color: rgba(119, 227, 239, 0.15);
          .circle {
            width: 100%;
            height: 170px;
            background-image: url("../assets/image/ce.gif");
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 170px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;

            .bg-color {
              font-size: 20px;
              font-weight: bold;
              color: #ca5a33;
            }

            .dse-color {
              font-size: 12px;

              font-weight: 400;
              color: #e6e6e6;
            }
          }

          .content-cir {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 15px;

            .c-c-l,
            .c-c-r {
              width: 50%;
              height: 100%;
              padding: 0 15px;
              position: relative;
              line-height: 28px;

              .c-header {
                font-size: 12px;
                font-weight: 400;
                color: #f0f0f0;
              }

              .c-header::before {
                content: "";
                position: absolute;
                border-color: #ca5a33;
                border-style: solid;
                height: 4px;
                top: 50%;
                left: 5px;
                margin-top: -20px;
                width: 4px;
              }

              .c-content {
                font-size: 20px;
                font-weight: bold;
                color: #ca5a33;
              }
            }
          }
        }
      }

      .r-des-card:last-child {
        margin-top: 20px;
        .circle {
          background-image: url("../assets/image/ce.gif");

          .bg-color {
            color: #eccf48;
          }
        }

        .content-cir {
          .c-header::before {
            border-color: #eccf48 !important;
          }

          .c-content {
            color: #eccf48 !important;
          }
        }
      }
    }

    .bottom-view {
      width: 100%;
      height: 250px;
      position: absolute;
      bottom: 10px;
      left: 0;
      z-index: 999;
      display: flex;
      justify-content: space-around;

      .b-card {
        width: 450px;
        height: 100%;
        background-image: url("../assets/image/底部框.png");
        background-repeat: no-repeat;
        background-size: 100% 250px;
        //border-right: 1.5px solid rgba(26, 118, 131, 0.8);
        padding: 10px 20px;

        .b-c-header {
          width: 100%;
          height: 50px;
          background-image: url("../assets/image/白线.png");
          background-repeat: no-repeat;
          background-position: bottom;
          //padding: 0 20px;
          display: flex;

          .left-title {
            height: 100%;
            width: 40%;
            //float: left;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            span {
              font-size: 16px;
              font-weight: bold;
              color: #ffffff;
            }
          }

          .right-image {
            width: 60%;
            height: 100%;
            //float: right;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
        }

        .b-c-content {
          margin-top: 10px;

          /deep/ .highcharts-legend-item {
            text {
              color: #ffffff !important;
              fill: #ffffff !important;
            }
          }
        }
      }
      .b-card:last-child {
        .b-c-content {
          max-height: calc(100% - 50px);
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .dse_img {
            text-align: left;
            width: 100%;
            height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  #popup {
    position: fixed;
    width: 460px;
    .popup-line {
      position: absolute;
      top: 0;
      left: 0;
      width: 140px;
      height: 179px;
      background-image: url("../assets/image/链接.png");
    }
    .content-boxs {
      width: 321px;
      height: 195px;
      position: absolute;
      right: 0;
      top: -35px;
      background-image: url("../assets/image/简介框.png");
      background-repeat: no-repeat;
      background-size: cover;
      padding: 12px;
      .content-title {
        width: 296px;
        height: 36px;
        background: rgba(25, 103, 131, 0.6);
        //border: 1px solid rgba(68, 231, 253, .6);
        line-height: 36px;
        font-weight: bold;
        color: #f0f0f0;
        font-size: 18px;
        padding: 0 10px;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 10px;
        .ivu-icon {
          vertical-align: middle !important;
        }
        button {
          position: absolute;
          right: 10px;
          top: 6px;
          border: 1px solid #187380;
          background: rgba(27, 91, 104, 0.3);
          color: #1eb7d6;
          font-weight: bold;
          font-size: 14px;
          border-radius: 0;
          /deep/.ivu-icon {
            font-size: 22px;
            font-weight: bold;
            line-height: normal;
          }
        }
      }
      .content-main {
        width: 100%;
        height: 100px;
        color: #ffffff;
        padding: 0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        line-height: 25px;
        -webkit-line-clamp: 3;
        text-indent: 26px;
        letter-spacing: 1.6px;
        margin-bottom: 10px;
      }
      .content-bottom {
        padding: 0 10px;
        button {
          border-radius: 0;
          color: #ffffff;
          background: rgba(3, 87, 182, 0.4);
        }
      }
    }
  }
}

@media screen and (min-height: 1329px) {
  .left-view {
    top: 250px !important;
  }
}
</style>
