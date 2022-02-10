<template>
  <a-modal
    class="picPreview"
    :title="title"
    :visible="imgListShow"
    @cancel="onCancel"
    :bodyStyle="moduleCenter"
  >
    <span id="test_3" @mousemove="move" @mouseup="stop" @mouseleave="mouseLeave">
      <!-- <img @mousedown="start" :src="furl" ref="singleImg" class="originStyle" /> width="3210" height="1504"-->
      <canvas
        @mousedown="start"
        id="myCanvas"
        ref="singleImg"
        class="originStyle"
        width="3210"
        height="1504"
      ></canvas>
    </span>
    <template>
      <span style="width: 150px">
        <a-table
          :pagination="false"
          :columns="columns"
          :data-source="dataSourceTime"
          class="j-table-force-nowrap"
          rowKey="detection_time"
          :scroll="{ y: 240 }"
        >
          <a
            slot="detection_time"
            slot-scope="text, record"
            @click="getSourceTimeImage(record)"
          >
            {{ text }}
          </a>
        </a-table>
        <!-- <a-list :itemLayout="vertical" :size ="small" :data-source="dataSourceTime">
                    <a-list-item :key="index" slot="renderItem" slot-scope="record, index">
                      <a href="javascript:void(0)" >{{record.detection_time}}</a>
                    </a-list-item>
              </a-list> -->
      </span>
    </template>

    <template slot="footer">
      <div class="allImg">
        <a-button @click="handleCurrentChange(-1)" class="changeImg">
          <a-icon type="left" />
        </a-button>
        <div class="imgbox" :class="imgList.length > 6 ? '' : 'min'" ref="imgbox">
          <img
            v-for="(item, index) in imgList"
            :key="item"
            :src="item"
            :class="{ changeColor: changeColor == index }"
            @click="handlerImg(item, index)"
          />
        </div>
        <a-button @click="handleCurrentChange(1)" class="changeImg right">
          <a-icon type="left" style="transform: rotate(180deg)" />
        </a-button>
      </div>
      <div class="ctr-box">
        <a-button @click="loadCrack" title="加载病害">
          <a-icon type="redo" />
        </a-button>
        <a-button @click="cancelCrack" title="取消加载">
          <a-icon type="undo" />
        </a-button>
        <a-button @click="scale(-1)" title="缩小">
          <a-icon type="zoom-out" />
        </a-button>
        <a-button @click="scale(1)" title="放大">
          <a-icon type="zoom-in" />
        </a-button>
        <!-- <a-button @click="download" title="下载">
                <a-icon type="download" />
              </a-button> -->
      </div>
      <div v-if="isCrack">
        <a-table
          :pagination="false"
          :columns="crackColumns"
          :data-source="crackData"
          class="j-table-force-nowrap"
          rowKey="img_name"
          :scroll="{ y: 240 }"
          style="max-height: 380px !important; height: 380px !important"
        />
      </div>
    </template>
  </a-modal>
</template>
<script>
export default {
  name: "PicPreview",
  data() {
    return {
      imgListShow: false,
      isCrack: false,
      columns: [
        {
          title: "检测时间",
          dataIndex: "detection_time",
          width: 50,
          scopedSlots: { customRender: "detection_time" },
        },
      ],
      crackColumns: [
        {
          title: "病害类型",
          dataIndex: "type",
          width: 50,
        },
        {
          title: "宽度",
          dataIndex: "width_mean",
          width: 50,
        },
        {
          title: "长度",
          dataIndex: "length",
          width: 50,
        },
        {
          title: "面积",
          dataIndex: "area_text",
          width: 50,
        },
        {
          title: "区域",
          dataIndex: "region",
          width: 50,
        },
        {
          title: "距人行道板距离",
          dataIndex: "length_from_bottom",
          width: 50,
        },
        {
          title: "描述信息",
          dataIndex: "description",
          width: 50,
        },
      ],
      num: 0,
      furl: "",
      changeColor: -1,
      currentRotate: 0,
      currentScale: 1,
      canDrag: false,
      offset_x: 0,
      offset_y: 0,
      mouse_x: 0,
      mouse_y: 0,
      moduleCenter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "650px",
      },
      width: 0,
      height: 0,
      downUrl: "",
      crackData: [],
      ctx: "",
    };
  },
  props: {
    title: {
      //弹框名称
      type: String,
      required: false,
      default: "图片预览",
    },
    filePreviewShow: {
      //是否显示
      type: Boolean,
      required: false,
      default: false,
    },
    imgList: {
      //图像数组
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },

    carckDataSet: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
    dataSourceTime: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
    currentImg: {
      //当前图像
      type: String,
      required: false,
      default: "",
    },
    currentIndex: {
      //当前图像下标
      type: Number,
      required: false,
      default: 0,
    },
    timeCurrentIndex: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    filePreviewShow(newv) {
      //debugger
      if (newv) {
        this.imgListShow = this.filePreviewShow;
        this.imgList = this.trimSpace(this.imgList);
        if (this.imgList.length === 0) {
          this.furl = "";
          this.changeColor = -1;
        } else {
          this.changeColor = this.currentIndex;
          if (this.currentImg) {
            this.changeColor = this.imgList.findIndex((a) => a === this.currentImg);
          }
          setTimeout(() => {
            this.scrollImg(this.changeColor - 5, this.changeColor < 5);
          }, 500);
          //debugger
          this.furl = this.imgList[this.changeColor];

          this.handlerImg(this.furl, this.changeColor);
        }
      } else {
        this.imgListShow = this.filePreviewShow;
        this.$refs.imgbox.scrollLeft = 0;
        window.removeEventListener("mousewheel", this.handleScroll, true) ||
          window.removeEventListener("DOMMouseScroll", this.handleScroll, true);
      }
    },
    timeCurrentIndex(b) {
      if (b) {
        this.changeColor = this.currentIndex;
        console.log("什么时候执行");
        this.furl = this.imgList[this.changeColor];
        console.log("什么时候执行this.furl", this.furl);
        console.log("什么时候执行this.changeColor", this.changeColor);
        this.handlerImg(this.furl, this.changeColor);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.scrollImg(this.changeColor - 5, this.changeColor < 5);
    }, 500);
  },
  // created(){
  //   for(let i=0;i<20;i++){
  //    var m = {
  //      detection_time : "20210513005031"
  //    }
  //    //m.push("detection_time","20210513005031")
  //     this.dataSourceTime.push(m)
  //   }
  // },
  methods: {
    getSourceTimeImage(record) {
      this.$emit("parentGetFullImage", record);
      // setTimeout(() => {
      //     this.changeColor = this.currentIndex
      //   }, 500);
    },

    loadCrack() {
      debugger;
      if (this.crackData.length > 0) {
        console.log("this.crackData", this.crackData);
        this.isCrack = true;
        let newArr = this.formatStr(this.crackData);

        newArr.map((item) => {
          var color = "black";
          if (item.type_value == "CK") color = "rgba(255,0,0)";
          if (item.type_value == "CC") color = "rgba(43,213,43)";
          if (item.type_value == "MC") color = "rgba(255,0,255)";
          if (item.type_value == "JK") color = "rgba(238,238,17,0.3)";
          if (item.type_value == "PO") color = "rgba(255,0,255,0.3)";
          if (item.type_value == "CJ") color = "rgba(0,102,255,0.3)";
          if (item.type_value == "SW") color = "rgba(247,247,9,0.6)";
          //画线
          if (
            item.type_value == "CK" ||
            item.type_value == "CC" ||
            item.type_value == "MC"
          ) {
            for (let i = 0; i < item.newData.length; i++) {
              if (i == item.newData.length - 1) return;
              //console.log("i",i)
              this.ctx.beginPath();
              this.ctx.moveTo(item.newData[i].x / 10, item.newData[i].y / 10);
              this.ctx.lineWidth = 2;
              this.ctx.lineTo(item.newData[i + 1].x / 10, item.newData[i + 1].y / 10);
              this.ctx.strokeStyle = color;
              this.ctx.stroke();
            }
          } else {
            this.ctx.beginPath(); //清除所有的点
            for (let i = 0; i < item.newData.length; i++) {
              this.ctx.lineTo(item.newData[i].x / 10, item.newData[i].y / 10);
            }
            this.ctx.closePath();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
            if (
              item.type_value == "JK" ||
              item.type_value == "PO" ||
              item.type_value == "CJ" ||
              item.type_value == "SW"
            ) {
              this.ctx.fillStyle = color;
              this.ctx.fill();
            }
          }
        });
      }
    },
    formatStr(crackData) {
      let newArr = crackData.map((val) => {
        let tempVal = val.data.substring(1, val.data.length - 1).split(")(");
        let newData = tempVal.map((val) => {
          return {
            x: val.split(",")[0],
            y: val.split(",")[1],
          };
        });
        return {
          ...val,
          newData,
        };
      });
      return newArr;
    },
    cancelCrack() {
      this.furl = this.imgList[this.changeColor];
      this.handlerImg(this.furl, this.changeColor);
      this.isCrack = false;
    },
    onCancel() {
      this.$emit("parentCancel");
    },
    trimSpace(array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] == " " || array[i] == null || typeof array[i] == "undefined") {
          array.splice(i, 1);
          i = i - 1;
        }
      }
      return array;
    },
    //判断滚动方向
    handleScroll(e) {
      this.scale(-e.deltaY);
    },

    //点击图片显示
    handlerImg(furl, index) {
      debugger;
      this.$nextTick(() => {
        //debugger
        this.currentRotate = 0;
        this.currentScale = 0.4;
        this.rotateScale();
        if (this.$refs.singleImg) {
          this.$refs.singleImg.style.left = 0;
          this.$refs.singleImg.style.top = 0;
        }
        this.furl = furl;
        var image = new Image();

        var canvas2 = this.$refs.singleImg;
        var context = canvas2.getContext("2d");
        this.ctx = context;
        var that = this;

        console.log("this.furl", this.furl);
        image.onload = function () {
          console.log("image.width", image.width);
          console.log("context", context);
          console.log("context.canvas.width", context.canvas.width);
          context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
          that.loadCrack();
        };
        image.src = this.furl;
        image.crossOrigin = "*";
        console.log("image.src", image.src);
        this.changeColor = index;
        if (
          document.getElementsByClassName("originStyle") &&
          document.getElementsByClassName("originStyle")[0] &&
          document.getElementsByClassName("originStyle")[0].style
        ) {
          console.log("style");
          document.getElementsByClassName("originStyle")[0].style.position = "relative";
        }
        //得到对应的病害信息
        var imgName = this.furl.split("/")[10];
        console.log("imgName", imgName);
        this.carckDataSet.map((val) => {
          console.log("val.name", val.name);
          if (val.name == imgName) {
            this.crackData = val.data;
            console.log("val.data", val.data);
          }
        });
        console.log("this.crackData", this.crackData);
      });
    },
    handleCurrentChange(val) {
      const changeColor = this.changeColor + val;
      if (changeColor === this.imgList.length || changeColor === -1) {
        return;
      }
      this.currentRotate = 0;
      this.currentScale = 1;
      this.rotateScale();
      this.$refs.singleImg.style.left = 0;
      this.$refs.singleImg.style.top = 0;
      this.furl = this.imgList[changeColor];
      this.changeColor = changeColor;
      const noScroll =
        (val > 0 && changeColor <= 5) ||
        (val < 0 && changeColor + 1 >= this.imgList.length - 5);
      this.scrollImg(val, noScroll);
    },
    scrollImg(val, noScroll) {
      if (noScroll || !this.$refs.imgbox) {
        return;
      }
      this.$refs.imgbox.scrollLeft += 60 * val;
    },
    start(e) {
      //鼠标左键点击
      e.preventDefault && e.preventDefault(); //去掉图片拖动响应
      if (e.button == 0) {
        this.canDrag = true;
        //获取需要拖动节点的坐标
        this.offset_x = document.getElementsByClassName("originStyle")[0].offsetLeft; //x坐标
        this.offset_y = document.getElementsByClassName("originStyle")[0].offsetTop; //y坐标
        //获取当前鼠标的坐标
        this.mouse_x = e.pageX;
        this.mouse_y = e.pageY;
      }
    },
    move(e) {
      e.preventDefault && e.preventDefault();
      window.addEventListener("mousewheel", this.handleScroll, true) ||
        window.addEventListener("DOMMouseScroll", this.handleScroll, false);
      if (this.canDrag == true) {
        let _x = e.pageX - this.mouse_x;
        let _y = e.pageY - this.mouse_y;
        //设置移动后的元素坐标
        let now_x = this.offset_x + _x + "px";
        let now_y = this.offset_y + _y + "px";
        document.getElementsByClassName("originStyle")[0].style.position = "absolute";
        document.getElementsByClassName("originStyle")[0].style.top = now_y;
        document.getElementsByClassName("originStyle")[0].style.left = now_x;
      }
    },
    mouseLeave(e) {
      this.canDrag = false;
      window.removeEventListener("mousewheel", this.handleScroll, true) ||
        window.removeEventListener("DOMMouseScroll", this.handleScroll, true);
    },
    stop(e) {
      this.canDrag = false;
    },
    //旋转放大
    rotateScale() {
      if (!this.$refs.singleImg) {
        return;
      }

      this.$refs.singleImg.style.Transform =
        "rotate(" + this.currentRotate + "deg)" + "scale(" + this.currentScale + ")";
      this.$refs.singleImg.style.webkitTransform =
        "rotate(" + this.currentRotate + "deg)" + "scale(" + this.currentScale + ")";
      this.$refs.singleImg.style.MozTransform =
        "rotate(" + this.currentRotate + "deg)" + "scale(" + this.currentScale + ")";
      this.$refs.singleImg.style.msTransform =
        "rotate(" + this.currentRotate + "deg)" + "scale(" + this.currentScale + ")";
      this.$refs.singleImg.style.transform =
        "rotate(" + this.currentRotate + "deg)" + "scale(" + this.currentScale + ")";
    },
    //旋转
    rotateL() {
      this.currentRotate += 15;
      this.rotateScale();
    },
    rotateR() {
      this.currentRotate -= 15;
      this.rotateScale();
    },
    //缩放 放大
    scale(type) {
      if (type >= 0) {
        this.currentScale += 0.1;
        this.rotateScale();
      } else {
        this.currentScale -= 0.1;
        if (this.currentScale <= 0.1) {
          this.currentScale = 0.1;
          this.rotateScale();
        } else {
          this.rotateScale();
        }
      }
    },
    downloadIamge(imgsrc, name) {
      //下载图片地址和图片名
      var image = new Image();
      // 解决跨域 Canvas 污染问题
      image.src = imgsrc + "?v=" + Math.random(); // 处理缓存
      image.crossOrigin = "*"; // 支持跨域图片
      image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "img"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
    },
    download() {
      this.downloadIamge(this.furl, new Date().getTime());
    },
  },
};
</script>
<style lang="less" scoped>
// /deep/ .ant-table-body{
//   max-height: 580px !important;
// }
/deep/ .ant-table {
  height: 580px !important;
}
.picPreview {
  /deep/ .ant-modal {
    width: 1500px !important;
  }
  // /deep/ .ant-table-body {
  //   max-height: 580px !important;
  // }

  /deep/ .ant-modal-footer {
    border-top: 0;
    .allImg {
      width: 91%;
      height: 60px;
      margin-bottom: 10px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      .changeImg {
        height: 100%;
        width: 50px;
        cursor: pointer;
        padding: 0;
        border: 0;
        i {
          font-size: 60px;
        }
        &.right {
          i {
            bottom: 2px;
            right: 7px;
            position: relative;
          }
        }
      }
      .imgbox {
        width: 370px;
        height: 100%;
        overflow: hidden;
        margin: 0 auto;
        border: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: start;
        &.min {
          justify-content: center;
        }
        img {
          width: 50px;
          height: 50px;
          margin: 5px;
          cursor: pointer;
        }
        .changeColor {
          border: 2px solid #42b983;
        }
      }
    }
    .ctr-box {
      display: flex;
      width: 1350px;
      justify-content: center;
      align-content: center;
    }
  }

  /deep/ .ant-modal-body {
    padding: 0 24px;
    .originStyle {
      // position: absolute;
      left: 0;
      top: 0;
      cursor: pointer;
      // transform-origin: 50% 50%;
    }
    #test_3 {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border: 1px solid #eeeeee;
      // overflow: scroll;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        cursor: move;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>
