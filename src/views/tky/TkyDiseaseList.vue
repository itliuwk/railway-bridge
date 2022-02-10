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
            <a-form-item label="桥梁名称">
              <a-input placeholder="请输入桥梁名称" v-model="queryParam.bridgeInfoName"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="检测时间">
                <a-input placeholder="请输入检测时间" v-model="queryParam.detectionTime"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="病害类型">
                <a-input placeholder="请输入病害类型" v-model="queryParam.type"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="形态">
                <a-input placeholder="请输入形态" v-model="queryParam.direction"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="面积">
                <a-input placeholder="请输入面积" v-model="queryParam.area"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="平均宽度">
                <a-input placeholder="请输入平均宽度" v-model="queryParam.widthMean"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="长度">
                <a-input placeholder="请输入长度" v-model="queryParam.length"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="上下行">
                <a-input placeholder="请输入上下行" v-model="queryParam.updown"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="描述信息">
                <a-input placeholder="请输入描述信息" v-model="queryParam.description"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
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
      <a-button type="primary" icon="download" @click="handleExportXls('tky_disease')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload> -->
      <!-- 高级查询区域 -->
      <j-super-query :fieldList="superFieldList" ref="superQueryModal" @handleSuperQuery="handleSuperQuery"></j-super-query>
      <!-- <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown> -->
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        :scroll="{x:true}"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        class="j-table-force-nowrap"
        @change="handleTableChange">

        <a slot="imgName" slot-scope="text,record" @click="getImage(record)">{{ text }}</a>
       
        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt="" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="downloadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleDetail(record)">详情</a>
          
          <a v-if="record.typeValue=='CK' || record.typeValue=='CC'" @click="lenTrend(record)">
            <a-divider type="vertical" />
            长度趋势
          </a>
          
          <a v-if="record.typeValue=='CK' || record.typeValue=='CC'" @click="widTrend(record)">
            <a-divider type="vertical" />
            宽度趋势
          </a>
          
          <a v-if="record.typeValue!='CK' && record.typeValue!='CC'" @click="areaTrend(record)">
            <a-divider type="vertical" />
            面积趋势
          </a>

          <!-- <a-divider type="vertical" /> -->
          <!-- <a-dropdown>
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
    </div>
    <!-- <a-modal :visible="isShow" :footer="null"  width= 90% height= 90% @cancel="handleCancel">
       getImageCode style="width: 90%;height:90%;"  width= 90% height= 90%-->
      <!-- <img :alt="imageName" style="width: 50%;height:50%;"  :src="src" />
    </a-modal> --> 
    <a-modal :visible="lenShow" :footer="null"  width= 90% height= 90% @cancel="lenCancel">
      <line-chart-multid-len :title="lenTitle" :dataSource="dataSourceLen" :fields="fieldsLen" :aliases="aliasesLen" :height="height" />
    </a-modal>
    <a-modal :visible="widShow" :footer="null"  width= 90% height= 90% @cancel="widCancel">
      <line-chart-multid-wid :title="widTitle" :dataSource="dataSourceWid"  :fields="fieldsWid" :aliases="aliasesWid" :height="height" />
    </a-modal>
    <a-modal :visible="areaShow" :footer="null"  width= 90% height= 90% @cancel="areaCancel">
      <line-chart-multid-area :title="areaTitle"  :dataSource="dataSourceArea" :fields="fieldsArea" :aliases="aliasesArea" :height="height"/>
    </a-modal>
    <tky-image-view :filePreviewShow="isShow" :imgList="imgList" :currentIndex="currentIndex" @parentMethod="cancel"></tky-image-view>
    <tky-disease-modal ref="modalForm" @ok="modalFormOk"></tky-disease-modal>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import TkyDiseaseModal from './modules/TkyDiseaseModal'
  import TkyImageView from './TkyImageView.vue'
  import axios from 'axios'
  import Vue from 'vue'
  import {getAction} from '@/api/manage'
  import LineChartMultidLen from '@/components/chart/LineChartMultid'
  import LineChartMultidWid from '@/components/chart/LineChartMultid'
  import LineChartMultidArea from '@/components/chart/LineChartMultid'


  export default {
    name: 'TkyDiseaseList',
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      TkyDiseaseModal,
      TkyImageView,
      LineChartMultidLen,
      LineChartMultidWid,
      LineChartMultidArea
    },
    data () {
      return {
        description: 'tky_disease管理页面',
        height:520,
        imgList:[],
        currentIndex:0,
        lenShow:false,
        widShow:false,
        areaShow:false,
        dataSourceLen:[],
        dataSourceWid:[],
        dataSourceArea:[],
        lenTitle:"",
        widTitle:"",
        areaTitle:"",
        fieldsLen: ['len'],
        aliasesLen:[{field:'len',alias:'长度'}],
        fieldsWid: ['width'],
        aliasesWid:[{field:'width',alias:'宽度'}],
        fieldsArea: ['area'],
        aliasesArea:[{field:'area',alias:'面积'}],
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title:'线名',
            align:"center",
            dataIndex: 'bridgeInfoLineName'
          },
          {
            title:'桥梁名称',
            align:"center",
            dataIndex: 'bridgeInfoName'
          },
          {
            title:'桥梁编号',
            align:"center",
            dataIndex: 'bridgeInfoCode'
          },
          {
            title:'检测时间',
            align:"center",
            dataIndex: 'detectionTime'
          },
          {
            title:'部件名称',
            align:"center",
            dataIndex: 'componentName'
          },
          {
            title:'病害类型',
            align:"center",
            dataIndex: 'type'
          },
          {
            title:'病害编码',
            align:"center",
            dataIndex: 'typeCode'
          },
          {
            title:'形态',
            align:"center",
            dataIndex: 'direction'
          },
          {
            title:'面积',
            align:"center",
            dataIndex: 'area'
          },
          {
            title:'平均宽度',
            align:"center",
            dataIndex: 'widthMean'
          },
          {
            title:'长度',
            align:"center",
            dataIndex: 'length'
          },
          {
            title:'线路里程',
            align:"center",
            dataIndex: 'lineMil'
          },
          {
            title:'关注程度',
            align:"center",
            dataIndex: 'concernExtent'
          },

          {
            title:'区域',
            align:"center",
            dataIndex: 'region'
          },
          {
            title:'伤损等级',
            align:"center",
            dataIndex: 'levelCode'
          },
          {
            title:'与轨道方向夹角',
            align:"center",
            dataIndex: 'intersectionAngle'
          },
          {
            title:'描述信息',
            align:"center",
            dataIndex: 'description'
          },
          {
            title:'图片名称',
            align:"center",
            dataIndex: 'imgName',
            scopedSlots: { customRender: 'imgName' },
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed:"right",
            width:147,
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/moudle/tkyDisease/list",
          delete: "/moudle/tkyDisease/delete",
          deleteBatch: "/moudle/tkyDisease/deleteBatch",
          exportXlsUrl: "/moudle/tkyDisease/exportXls",
          importExcelUrl: "moudle/tkyDisease/importExcel",
          getImage: "/moudle/tkyDisease/getImage"
          
        },
        dictOptions:{},
        getImageCode:'',
        isShow: false,
        loading: false,
        imageName: '',
        superFieldList:[],
      }
    },
    created() {
    this.getSuperFieldList()
   // this.imgList.push(src)
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      },
    },
    methods: {
      lenCancel(){
        this.lenShow = false
      },
      widCancel(){
        this.widShow = false
      },
      areaCancel(){
        this.areaShow = false
      },
      lenTrend(record){
          let param = {
            typeCode : record.typeCode
          }
          getAction('/moudle/tkyDisease/trendAnalyseLen',param).then(res=>{
              this.lenShow = true
              this.lenTitle = record.typeCode
              this.dataSourceLen = res.result
          });
      },
      widTrend(record){
          let param = {
            typeCode : record.typeCode
          }
          getAction('/moudle/tkyDisease/trendAnalyseWid',param).then(res=>{
              this.widShow = true
              this.widTitle = record.typeCode
              this.dataSourceWid = res.result
          });
      },
      areaTrend(record){
          let param = {
            typeCode : record.typeCode
          }
          getAction('/moudle/tkyDisease/trendAnalyseArea',param).then(res=>{
              this.areaShow = true
              this.areaTitle = record.typeCode
              this.dataSourceArea = res.result
          });
      },
      initDictConfig(){
      },
      cancel() {
        this.isShow = false;
      },
      getImage(record){
        let object = Object.assign({}, record);
        this.getImageCode = "";
         //debugger
        let parameter = {
          name : object.imgName,
          url : object.imgUrl,
          data : "0"
        }
        this.loading = true;
        this.imageName = object.imageName;
        axios({
        method: 'GET',
        url: Vue.prototype.API_BASE_URL+this.url.getImage,
        params: parameter,
        responseType: 'blob'
        }).then(res=>{
          console.log(res)
          this.confirmLoading = false;
          let blob = new Blob([res.data],{type: "application/octet-stream"});

              const src = window.URL.createObjectURL(blob)//这里也是关键,调用window的这个方法URL方法
              this.getImageCode = src
              this.imgList.push(this.getImageCode)
              if(this.imgList.length >= 1)
                this.currentIndex = this.imgList.length-1
              this.isShow = true
              this.loading = false;
     
          }).catch(err=>{
              console.log(err)
          })
      },
      getSuperFieldList(){
        let fieldList=[];
        fieldList.push({type:'string',value:'bridgeInfoLineName',text:'线名',dictCode:''})
        fieldList.push({type:'string',value:'bridgeInfoName',text:'桥梁名称',dictCode:''})
        fieldList.push({type:'string',value:'bridgeInfoCode',text:'桥梁编号',dictCode:''})
        fieldList.push({type:'string',value:'detectionTime',text:'检测时间',dictCode:''})
        fieldList.push({type:'string',value:'componentName',text:'部件名称',dictCode:''})
        fieldList.push({type:'string',value:'type',text:'病害类型',dictCode:''})
        fieldList.push({type:'string',value:'typeValue',text:'名称缩写',dictCode:''})
        fieldList.push({type:'string',value:'direction',text:'形态',dictCode:''})
        fieldList.push({type:'string',value:'area',text:'面积',dictCode:''})
        fieldList.push({type:'string',value:'widthMean',text:'平均宽度',dictCode:''})
        fieldList.push({type:'string',value:'length',text:'长度',dictCode:''})
        // fieldList.push({type:'string',value:'absoluteMilEageStart',text:'线路起始里程',dictCode:''})
        // fieldList.push({type:'string',value:'absoluteMilEageEnd',text:'线路终止里程',dictCode:''})
        // fieldList.push({type:'string',value:'relvtiveMilEageStart',text:'洞身起始里程',dictCode:''})
        // fieldList.push({type:'string',value:'relvtiveMilEageEnd',text:'洞身终止里程',dictCode:''})
        //fieldList.push({type:'string',value:'updown',text:'上下行',dictCode:''})
        //fieldList.push({type:'string',value:'region',text:'区域',dictCode:''})
        fieldList.push({type:'string',value:'intersectionAngle',text:'与轨道方向夹角',dictCode:''})
        fieldList.push({type:'string',value:'level',text:'伤损等级',dictCode:''})
        fieldList.push({type:'string',value:'typeCode',text:'病害编码',dictCode:''})
        fieldList.push({type:'Text',value:'description',text:'描述信息',dictCode:''})
        this.superFieldList = fieldList
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>