<template>
  <a-card :bordered="false"  >
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
     桥梁编号： <a-input placeholder="请输入桥梁编号" style="width: 10%" v-model="queryParam.bridgeCode"></a-input>

     病害名称： <a-select default-value="请选择" style="width: 10%;" @change="handleChange">
      <a-select-option value="请选择">
        请选择
      </a-select-option>
      <a-select-option value="裂缝">
        裂缝
      </a-select-option>
      <a-select-option value="网状裂缝">
        网状裂缝
      </a-select-option>
      <a-select-option value="夹块" >
        夹块
      </a-select-option>
      <a-select-option value="施工冷缝">
        施工冷缝
      </a-select-option>
      <a-select-option value="剥落（掉块）">
        剥落（掉块）
      </a-select-option>
      <a-select-option value="渗漏水">
        渗漏水
      </a-select-option>
      <a-select-option value="施工缝破损">
        施工缝破损
      </a-select-option>
      
    </a-select>
   

      起始里程： <a-input-number placeholder="起始里程" style="width: 8%" v-model="queryParam.startMil"/>
      终止里程： <a-input-number placeholder="终止里程" style="width: 8%" v-model="queryParam.endMil"/>
      起始版本： <a-input-number placeholder="大版图专用" style="width: 8%" v-model="queryParam.fullStartVersion"/>
      终止版本： <a-input-number placeholder="大版图专用" style="width: 8%" v-model="queryParam.fullEndVersion"/>
         <a-button type="primary" @click="trendAnalyse" style="margin-left:3%">分析</a-button>
    </div>
    <a-tabs @change="callback" :loading="loading">
      <!-- 多行折线图 -->
      <a-tab-pane tab="长度趋势图" key="1">

        <line-chart-multid-len  :dataSource="dataSourceLen" :fields="fieldsLen" :aliases="aliasesLen"  :height="height"/>
      </a-tab-pane>
      <a-tab-pane tab="宽度趋势图" key="2">
        <line-chart-multid-wid  :dataSource="dataSourceWid"  :fields="fieldsWid" :aliases="aliasesWid" :height="height"/>
      </a-tab-pane>
      <a-tab-pane tab="面积趋势图" key="3">
        <line-chart-multid-area  :dataSource="dataSourceArea" :fields="fieldsArea" :aliases="aliasesArea" :height="height"/>
      </a-tab-pane>
       <a-tab-pane tab="大版趋势" key="4" >
        <template>
          <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"  :data-source="dataSourceFull">
            <a-list-item :key="index" slot="renderItem" slot-scope="record, index">
              <a href="javascript:void(0)" @click="getFullImage(record)">{{record.name}}</a>
            </a-list-item>
          </a-list>
        </template>
      </a-tab-pane>
    </a-tabs>
    <a-modal :visible="isShow" :close-on-click-modal = "false"  :footer="null" @cancel="handleCancel" width= 100% height= 90%>
      <a-row>
        <a-col :span="22">
          <img :alt="imageName" :visible="imagShow" style="width: 98%;height:90%;" :src="getImageCode" />
        </a-col>
        <a-col :span="2">
          <div :key="index" v-for="(record, index) in dataSourceTime">
              <a href="javascript:void(0)" @click="getFullImage(record)">{{record.detection_time}}</a>
          </div>
        </a-col>
      </a-row>

        <!-- getImageCode -->

     
      
    </a-modal>
  </a-card>
</template>

<script>

  import LineChartMultidLen from '@/components/chart/LineChartMultid'
  import LineChartMultidWid from '@/components/chart/LineChartMultid'
  import LineChartMultidArea from '@/components/chart/LineChartMultid'
  import {getAction} from '@/api/manage'
  import axios from 'axios'
  import Vue from 'vue'


  export default {
    name: 'ViserChartDemo',
    components: {
      LineChartMultidLen,
      LineChartMultidWid,
      LineChartMultidArea
    },
    data() {
      return {
        height: 420,
        loading:false,
       
        queryParam: {
           bridgeCode : "",
           type: "",
           startMil :"",
           endMil:"",
           fullStartVersion:"",
           fullEndVersion:"",
           imageName:""

        },
        fieldsLen: ['len'],
        aliasesLen:[{field:'len',alias:'长度'}],
        fieldsWid: ['width'],
        aliasesWid:[{field:'width',alias:'宽度'}],
        fieldsArea: ['area'],
        aliasesArea:[{field:'area',alias:'面积'}],
        dataSourceLen:[],
        dataSourceWid:[],
        dataSourceArea:[],
        dataSourceFull:[],
        dataSourceTime:[],
        imageName:'',
        getImageCode:'',
        isShow: false,
        imagShow:false,
        key:"1"
      }
    },
    created() {
        
    },
    methods: {
      callback(key){
        this.key = key;
      },
      handleCancel() {
        this.isShow = false;
      },
      getFullImage(record){
        let object = Object.assign({}, record);
        this.imagShow = false;
        this.getImageCode = "";
        
        // debugger
        let parameter = {
          name : object.name,
          url : object.url
        }
        this.imageName = object.name;
        this.loading = true;
        axios({
        method: 'GET',
        url: Vue.prototype.API_BASE_URL+"/moudle/tkyImgdataFull/getImage",
        params: parameter,
        responseType: 'blob'
        }).then(res=>{
          console.log(res)
          this.confirmLoading = false;
          let blob = new Blob([res.data],{type: "application/octet-stream"})

              const src = window.URL.createObjectURL(blob)//这里也是关键,调用window的这个方法URL方法
              this.getImageCode = src
                            //等待图片加载
              setTimeout(() => {
                if(!this.isShow) //已经打开显示图片窗口，不用再次设置为ture
                  this.isShow = true
                  this.imagShow = true
                this.loading = false
              }, 5);
     
          }).catch(err=>{
              console.log(err)
          })
          this.queryParam.imageName = this.imageName
          getAction('/moudle/tkyImgdataFull/trendAnalyseFullTime',this.queryParam).then(res=>{
            
                  this.dataSourceTime = res.result
                  console.log(this.dataSourceTime);
                 
          })

      },
      trendAnalyse(){
        if(this.key!="4"&& (this.queryParam.type=="请选择" || this.queryParam.bridgeCode==""||this.queryParam.startMil==""||this.queryParam.endMil=="")){
            this.$message.warning("检索项必填！");
            return false;
        }
        if(this.queryParam.bridgeCode=="" ||this.queryParam.startMil==""||this.queryParam.endMil==""){
            this.$message.warning("检索项必填！");
            return false;
        }
         
          debugger
        if(this.queryParam.type=='裂缝' || this.queryParam.type=='施工冷缝'){
          if(this.key=="1")
          getAction('/moudle/tkyDisease/trendAnalyseLen',this.queryParam).then(res=>{
              this.dataSourceLen = res.result
          });
          if(this.key=="2")
            getAction('/moudle/tkyDisease/trendAnalyseWid',this.queryParam).then(res=>{             
              this.dataSourceWid = res.result;
            })
        }
        else{
          if(this.key=="3")
            getAction('/moudle/tkyDisease/trendAnalyseArea',this.queryParam).then(res=>{            
              this.dataSourceArea = res.result;
            })
          
        }
        if(this.key=="4")
              getAction('/moudle/tkyImgdataFull/trendAnalyseFull',this.queryParam).then(res=>{            
              this.dataSourceFull = res.result;
        })
      },
      handleChange(value){
        this.queryParam.type = value;
      }
  
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>