<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="线名">
              <a-input placeholder="请输入线名" v-model="queryParam.bridgeInfoLineName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="桥梁编号">
              <a-input placeholder="请输入桥梁编号" v-model="queryParam.bridgeInfoCode"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="桥梁名称">
                <a-input placeholder="请输入桥梁名称" v-model="queryParam.bridgeInfoName"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="检测时间">
                <a-input placeholder="请输入检测时间" v-model="queryParam.detectionTime"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">
                查询
              </a-button>
              <a-button  @click="searchReset" icon="reload" style="margin-left: 8px">
                重置
              </a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!-- <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('tky_imgdata_full')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload> -->
      <!-- 高级查询区域 -->
      <j-super-query
        :fieldList="superFieldList"
        ref="superQueryModal"
        @handleSuperQuery="handleSuperQuery"
      ></j-super-query>
      <!-- <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown> -->
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>
        已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>
        项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        :scroll="{ x: true }"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        class="j-table-force-nowrap"
        @change="handleTableChange"
      >
        <!--<a slot="names" slot-scope="text, record" @click="getFullImage(record)" v-for="(item,i) in superFieldListtt">-->
          <!--{{ text }}11111-->
        <!--</a>-->

        <template slot="names" slot-scope="text, record, index">
          <div >
            <!--<a-avatar shape="square" :src="getAvatarView(record.avatar)" icon="user"/> v-for="(item,i) in superFieldListtt"-->
            <!--<p v-for="(item,i) in record.name.split(';')">-->

              <a slot="namess" v-for="(item,i) in record.name.split(';')" @click="getFullImage(item,record)" >
              {{ item }}<br>
                <!--<span>-->
<!--<a-divider type="vertical" />-->
                <!--<img src="http://192.168.0.28:8006/朔黄线/潴龙河大桥/001/20200508130155/imgData/full/B-R/SH-ZLH-S-01_190405_K1195+482_0001-001-2-00-00_VL-Q.JPG"-->
                     <!--class="anty-img-wrap" title= {{ item }}>-->
                  <!--</span>-->
              </a>

                  <!--</p>-->
                </div>
              </template>

              <!-- <template slot="name" slot-scope="text">

              </template> -->
        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px; font-style: italic">
            无图片
          </span>
          <img
            v-else
            :src="getImgView(text)"
            height="25px"
            alt=""
            style="max-width: 80px; font-size: 12px; font-style: italic"
          />
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px; font-style: italic">
            无文件
          </span>
          <a-button v-else :ghost="true" type="primary" icon="download" size="small" @click="downloadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleDetail(record)">详情</a>

          <!-- <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown> -->
        </span>
      </a-table>

      <!-- <img :src="getImageCode" height="80%" alt="" style="max-width:80%;font-size: 12px;font-style: italic;"/> -->
    </div>

    <tky-imgdata-full-modal ref="modalForm" @ok="modalFormOk"></tky-imgdata-full-modal>
    <!-- <a-modal :visible="isShow" :footer="null" @cancel="handleCancel" width="98%" height="90%">
      
       <a-row>
        <a-col :span="22">
          <canvas width="3210" height="1504" id="myCanvas"  ref="canvas"></canvas>
            <img id="scream" src="http://192.168.0.8:8000/2.jpg"  alt="" /> 
        </a-col>
        <a-col :span="2">
          <a-button type="primary" @click="loadCrack()">加载病害</a-button>
          <a-button type="primary" style="margin-top: 10px;" @click="cancelCrack()">取消病害</a-button>
        </a-col>
       </a-row>
    </a-modal> -->
    <tky-image-view :filePreviewShow="isShow" :imgList="newImgList" :carckDataSet="carckDataSet" :timeCurrentIndex="timeCurrentIndex"
        :dataSourceTime="dataSourceTime" :currentIndex="currentIndex" @parentCancel="cancel" @parentGetFullImage="getFullImage"></tky-image-view>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import axios from 'axios'
import Vue from 'vue'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import TkyImgdataFullModal from './modules/TkyImgdataFullModal'
import TkyImageView from './TkyImageView2.vue'
import src from '@/views/tky/9.jpg'

import {getAction} from '@/api/manage'
import SplitPanel from "../jeecg/SplitPanel";
export default {
  name: 'TkyImgdataFullList',
  mixins: [JeecgListMixin, mixinDevice],
  components: {
    SplitPanel,
    TkyImgdataFullModal,
    TkyImageView
  },
  data() {
    return {
    
      description: 'tky_imgdata_full管理页面',
      dataSourceTime:[],
      imgList:[],
      newImgList:[],
      src:src,
      currentIndex:0,
      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '线名',
          align: 'center',
          dataIndex: 'bridgeInfoLineName'
        },
        {
          title: '桥梁编号',
          align: 'center',
          dataIndex: 'bridgeInfoCode'
        },
        {
          title: '桥梁名称',
          align: 'center',
          dataIndex: 'bridgeInfoName'
        },
        {
          title: '检测时间',
          align: 'center',
          dataIndex: 'detectionTime'
        },
        {
          title: '图片名称',
          align: 'center',
          dataIndex: 'name',
          scopedSlots: { customRender: 'names' }
        }
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   align:"center",
        //   fixed:"right",
        //   width:147,
        //   scopedSlots: { customRender: 'action' }
        // }
      ],
      url: {
        list: '/moudle/tkyImgdataFull/list',
        delete: '/moudle/tkyImgdataFull/delete',
        deleteBatch: '/moudle/tkyImgdataFull/deleteBatch',
        exportXlsUrl: '/moudle/tkyImgdataFull/exportXls',
        importExcelUrl: 'moudle/tkyImgdataFull/importExcel',
        getImage: '/moudle/tkyImgdataFull/getImage'
      },
      dictOptions: {},
      getImageCode: '',
      imageName: '',
      isShow: false,
      loading: false,
      timeCurrentIndex:false,
      superFieldList: [],
      parameter:{
        name:""
      },
      crackData:[],
      crackDataList:[],
      carckDataSet:[],
      superFieldListtt: ['11','22'],
      ctx:""
    }
  },
  created() {
    this.getSuperFieldList()
  },
  mounted() {
    // this.getPointData()
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    cancelCrack(){
        this.getPointData();
    },
    cancel() {
        this.isShow = false;
    },
    // loadCrack(){
    //       if(this.crackData.length>0){

    //         let newArr = this.formatStr(this.crackData)

    //         newArr.map(item => {
    //           var color = 'black'
    //           if(item.type_value=='CK')
    //               color = 'rgba(255,0,0)'
    //             if(item.type_value=='CC')
    //               color = 'rgba(43,213,43)'
    //             if(item.type_value=='MC')
    //               color = 'rgba(255,0,255)'
    //             if(item.type_value=='JK')
    //               color = 'rgba(238,238,17,0.3)'
    //             if(item.type_value=='PO')
    //               color = 'rgba(255,0,255,0.3)'
    //             if(item.type_value=='CJ')
    //               color = 'rgba(0,102,255,0.3)'  
    //             if(item.type_value=='SW')
    //               color = 'rgba(247,247,9,0.6)'  
    //           //画线
    //           if(item.type_value=='CK' ||item.type_value=='CC' || item.type_value=='MC'){
    //             for(let i=0; i < item.newData.length; i++){
    //               if(i == item.newData.length-1) return 
    //               //console.log("i",i)
    //               this.ctx.beginPath();
    //               this.ctx.moveTo(item.newData[i].x/10,item.newData[i].y/10);
    //               this.ctx.lineWidth = 2
    //               this.ctx.lineTo(item.newData[i+1].x/10,item.newData[i+1].y/10)
    //               this.ctx.strokeStyle= color
    //               this.ctx.stroke();
    //             }
    //           }else{
    //             this.ctx.beginPath();//清除所有的点
    //             for(let i=0; i < item.newData.length; i++){
    //               this.ctx.lineTo(item.newData[i].x/10,item.newData[i].y/10)
    //             }
    //             this.ctx.closePath();
    //             this.ctx.lineWidth = 2
    //             this.ctx.strokeStyle= color
    //             this.ctx.stroke();
    //             if(item.type_value=='JK'|| item.type_value=='PO' || item.type_value=='CJ' || item.type_value=='SW'){
    //               this.ctx.fillStyle=color
    //               this.ctx.fill();
    //             }
    //           }
            
    //        })
    //       }
    // },
    // getPointData() {
    //   var canvas = document.getElementById('myCanvas')
    //   if (canvas.getContext) {
    //     var ctx = canvas.getContext('2d')
    //     var img = new Image()
    //      img.src = this.getImageCode
    //     //img.src =  "http://192.168.0.8:8000/长珲城际/榆树川/20210513005031/imgData/full/CH-YSC-S-65_210513_K352+0_T17_0003_C11_VL-Q.jpg"
    //     img.crossOrigin = 'Anonymous'
    //     img.onload = function() {
    //       ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height)
    //     }

    //     this.ctx = ctx
    //   }
    // },
    // formatStr(crackData) {
    //   let newArr = crackData.map(val => {
    //     let tempVal = val.data.substring(1, val.data.length - 1).split(')(')
    //     let newData = tempVal.map(val => {
    //       return {
    //         x: val.split(',')[0],
    //         y: val.split(',')[1]
    //       }
    //     })
    //     return {
    //       ...val,
    //       newData
    //     }
    //   })
    //   return newArr
    // },
    // drawPoint(ctx, x, y, r, pointColor) {
    //   var startAngle = 0
    //   var endAngle = 2 * Math.PI
    //   ctx.beginPath()
    //   ctx.arc(x, y, r, startAngle, endAngle, false)
    //   ctx.fillStyle = pointColor
    //   ctx.fill()
    //   ctx.closePath()
    // },
    // initDictConfig() {},
    handleCancel() {
      this.isShow = false
    },

    async getFullImage(item,record) {
      let object = Object.assign({}, record)
      this.getImageCode = ''
       debugger
      let parameter = {
        //name: object.name,
        name: item,
        url: object.url
      }
      //this.imageName = object.name
      this.imageName = item
      this.loading = true
      this.queryParam.name = this.imageName

        //读取病害坐标信息
       await getAction('/moudle/tkyDisease/getDiseaseCrack',this.queryParam).then(res=>{
              debugger
              this.crackData = res.result
              let map = {
                name : this.imageName,
                data : this.crackData
              } 
              this.crackDataList.push(map)
              if(this.crackDataList.length>=1)
                this.carckDataSet = [...new Set(this.crackDataList)]
              console.log("1",this.crackData)
              console.log("this.carckDataSet",this.carckDataSet)

        });
        //读取相同图片不同检测时间点信息
        await getAction('/moudle/tkyImgdataFull/trendAnalyseFullTime',this.queryParam).then(res=>{            
              this.dataSourceTime = res.result;
        })
          console.log(object)
          var ip = window._CONFIG['ip']
          for(let i=0; i < ip.length; i++){
            //let imgsrc = "http://"+ip[i]+"/"+object.url+"/"+object.name
            let imgsrc = "http://"+ip[i]+"/"+object.url+"/"+item
            //长珲城际/榆树川/20210513005031/imgData/full/CH-YSC-S-65_210513_K352+0_T17_0003_C11_VL-Q.jpg.jpg
            //let imgsrc = "http://192.168.0.8:8001/长珲城际/榆树川/20210513005031/imgData/full/CH-YSC-S-65_210513_K351+991_T8_0002_C9_VL-Q.jpg"
              axios({
                method: 'GET',
                url: imgsrc
              }).then(res => {
                  //console.log("res",res)
                  console.log(imgsrc)
                this.imgList.push(imgsrc)
                if(this.imgList.length >= 1){
                  this.newImgList = [...new Set(this.imgList)]
                }
                for(let i =0;i<this.newImgList.length;i++){
                  console.log("this.newImgList[i]",this.newImgList[i])
                  if(this.newImgList[i]==imgsrc){
                    this.currentIndex = i
                    console.log("this.currentIndex",this.currentIndex)
                  }
                }
                if(!this.isShow)
                  this.isShow = true
                else
                  this.timeCurrentIndex = true
                this.loading = false
                // this.$nextTick(()=>{
                //     this.getPointData()
                // })
              })
         }

            // let img = new Image()
         
            // img.onload =  function() {
            //   this.getImageCode = imgsrc
            //   b = true
            //   console.log("img加载成功")
            //   this.isShow = true
            //   //this.getImageCode = "http://192.168.0.8:8000/长珲城际/榆树川/20210513005031/imgData/full/CH-YSC-S-65_210513_K352+0_T17_0003_C11_VL-Q.jpg"
             
            // }
            // img.src = imgsrc
            // if(b){
            //   console.log("img加载成功111")
            //   this.$nextTick(()=>{
            //       this.getPointData()
            //   })
            //   break
            // }

          //}
        //  this.getImageCode = "http://192.168.0.8:8001/长珲城际/榆树川/20210513005031/imgData/full/4.jpg"
        //   this.newImgList.push(this.getImageCode)
        //   console.log("img加载成功2222")
        //       if(this.imgList.length >= 1)
        //           this.currentIndex = this.imgList.length-1
        //   this.isShow = true
          //  this.$nextTick(()=>{
          //         this.getPointData()
          //     })
          


    //   await axios({
    //     method: 'GET',
    //     url: Vue.prototype.API_BASE_URL + this.url.getImage,
    //     params: parameter,
    //     responseType: 'blob'
    //   })
    //     .then(res => {
    //       console.log(res)
    //       this.confirmLoading = false
    //       let blob = new Blob([res.data], { type: 'application/octet-stream' })

    //       const src = window.URL.createObjectURL(blob) //这里也是关键,调用window的这个方法URL方法
    //       //this.getImageCode = src
    //       this.getImageCode = this.src
    //       this.imgList.push(this.getImageCode)
    //       if(this.imgList.length >= 1)
    //         this.currentIndex = this.imgList.length-1
    //       console.log("this.crackData33333333333333333333",this.crackData)
    //       setTimeout(() => {
    //             this.loading = false
    //             this.isShow = true
    //             this.$nextTick(()=>{
    //               this.getPointData()
    //             })
    //         }, 3);
          
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
        
    },
    
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({
        type: 'string',
        value: 'bridgeInfoLineName',
        text: '线名',
        dictCode: ''
      })
      fieldList.push({
        type: 'string',
        value: 'bridgeInfoCode',
        text: '桥梁编号',
        dictCode: ''
      })
      fieldList.push({
        type: 'string',
        value: 'bridgeInfoName',
        text: '桥梁名称',
        dictCode: ''
      })
      fieldList.push({
        type: 'string',
        value: 'detectionTime',
        text: '检测时间',
        dictCode: ''
      })
      fieldList.push({
        type: 'string',
        value: 'name',
        text: '图片名称',
        dictCode: ''
      })
      this.superFieldList = fieldList
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
#myCanvas {
  width: 98%;
}
</style>
