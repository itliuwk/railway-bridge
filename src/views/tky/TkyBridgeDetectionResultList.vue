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
              <a-form-item label="桥梁编号">
                <a-input placeholder="请输入桥梁编号" v-model="queryParam.bridgeInfoCode"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="检测时间">
                <a-input placeholder="请输入检测时间" v-model="queryParam.detectionTime"></a-input>
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
      <a-button @click="dataSynchronose" :disabled="dis" type="primary" icon="plus">同步数据</a-button>
      <!-- <a-button type="primary" icon="download" @click="handleExportXls('tky_bridge_detection_result')">导出</a-button>
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
       <a-input placeholder="报告区段长度" v-model="length" style="width : 10%;margin-left: 0%"></a-input>
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
           <a-divider type="vertical" />
          <a @click="reportWord1(record)">轨道车报告</a> 
           <a-divider type="vertical" />
          <a @click="reportExcel2(record)">excel报告</a>
           <a-divider type="vertical" />
          <a @click="reportWord3(record)">轮胎车报告</a>

        <!--  <a-dropdown>
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
    
    <tky-bridge-detection-result-modal ref="modalForm" @ok="modalFormOk"></tky-bridge-detection-result-modal>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {getAction} from '@/api/manage'
  import axios from 'axios'
  import Vue from 'vue'

  import TkyBridgeDetectionResultModal from './modules/TkyBridgeDetectionResultModal'

  export default {
    name: 'TkyBridgeDetectionResultList',
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      TkyBridgeDetectionResultModal
    },
    data () {
      return {
        description: 'tky_bridge_detection_result管理页面',
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
            title:'检测长度',
            align:"center",
            dataIndex: 'detectionLength'
          },
          {
            title:'检测区段',
            align:"center",
            dataIndex: 'detectionSector'
          },
          {
            title:'检测行别',
            align:"center",
            dataIndex: 'detectionXingbie'
          },
          {
            title:'起点里程',
            align:"center",
            dataIndex: 'detectionStartmil'
          },
          {
            title:'终点里程',
            align:"center",
            dataIndex: 'detectionEndmil'
          },
          {
            title:'acq地址',
            align:"center",
            dataIndex: 'acqurl'
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
          list: "/moudle/tkyBridgeDetectionResult/list",
          delete: "/moudle/tkyBridgeDetectionResult/delete",
        deleteBatch: "/moudle/tkyBridgeDetectionResult/deleteBatch",
          exportXlsUrl: "/moudle/tkyBridgeDetectionResult/exportXls",
          importExcelUrl: "moudle/tkyBridgeDetectionResult/importExcel",
          reportWord: "/moudle/tkyBridgeDetectionResult/reportWord"
          
        },
        length: "",
        dictOptions:{},
        dis: false,
        
        loading: false,
        superFieldList:[],
      }
    },
    created() {
    this.getSuperFieldList();
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      },
    },
    methods: {
      initDictConfig(){
      },
      
      handleCancel(){
        this.isShow = false
        this.length = ""
      },
      reportWord1(record){
            this.loading = true
            if(record.detectionLength===""){
              this.$message.warning("报告检测长度必填！")
              this.loading = false
              return false
            }
            debugger;
            //debugger
            let parameter = {
              id : record.id,
              lineName : record.bridgeInfoLineName,
              name : record.bridgeInfoName,
              detectionTime : record.detectionTime,
              detectionStartmil : record.detectionStartmil,
              length : record.detectionLength/1000,
              detectionEndmil : record.detectionEndmil
            }
           
            getAction('/moudle/tkyBridgeDetectionResult/reportWord',parameter).then(res=>{
               if(res.success){
                  this.$message.success(res.message);
                  this.$emit('ok');
                  this.loading = false;
                }else{
                  this.$message.warning(res.message);
                  this.loading = false;
                }
            })
      },
      reportExcel2(record){
            this.loading = true;
            //debugger
            let parameter = {
              id : record.id,
              name : record.bridgeInfoName,
              detectionTime : record.detectionTime
            }
           
            getAction('/moudle/tkyBridgeDetectionResult/reportExcel2',parameter).then(res=>{
               if(res.success){
                  this.$message.success(res.message);
                  this.$emit('ok');
                  this.loading = false;
                }else{
                  this.$message.warning(res.message);
                  this.loading = false;
                }
            })
      },
      reportWord3(record){
            this.loading = true;
            //debugger
            let parameter = {
              id : record.id,
              name : record.bridgeInfoName,
              detectionTime : record.detectionTime
            }
           
            getAction('/moudle/tkyBridgeDetectionResult/reportWord3',parameter).then(res=>{
               if(res.success){
                  this.$message.success(res.message);
                  this.$emit('ok');
                  this.loading = false;
                }else{
                  this.$message.warning(res.message);
                  this.loading = false;
                }
            })
      },
      dataSynchronose(){
            this.loading = true;
            this.dis = true;
            getAction('/moudle/tkyBridgeDetectionResult/dataSynchronose').then(res=>{
               if(res.success){
                  this.$message.success(res.message);
                  this.$emit('ok');
                  this.loading = false;
                  this.dis = false;
                }else{
                  this.$message.warning(res.message);
                  this.loading = false;
                  this.dis = false;
                }
            })

    
      },
      getSuperFieldList(){
        let fieldList=[];
        fieldList.push({type:'string',value:'bridgeInfoLineName',text:'线名',dictCode:''})
        fieldList.push({type:'string',value:'bridgeInfoName',text:'桥梁名称',dictCode:''})
        fieldList.push({type:'string',value:'bridgeInfoCode',text:'桥梁编号',dictCode:''})
        fieldList.push({type:'string',value:'detectionTime',text:'检测时间',dictCode:''})
        //fieldList.push({type:'string',value:'lineLevel',text:'线路时速',dictCode:''})
        fieldList.push({type:'string',value:'detectionSector',text:'检测区段',dictCode:''})
        fieldList.push({type:'string',value:'detectionXingbie',text:'检测行别',dictCode:''})
        fieldList.push({type:'string',value:'detectionStartmil',text:'起始里程',dictCode:''})
        fieldList.push({type:'string',value:'detectionEndmil',text:'终止里程',dictCode:''})
        fieldList.push({type:'string',value:'detectionLength',text:'检测长度',dictCode:''})
        // fieldList.push({type:'string',value:'detectionSpeed',text:'检测速度',dictCode:''})
        // fieldList.push({type:'string',value:'detectionStartpulse',text:'开始脉冲',dictCode:''})
        // fieldList.push({type:'string',value:'detectionEndpulse',text:'结束脉冲',dictCode:''})
        // fieldList.push({type:'string',value:'detectionChannelnum',text:'频道数',dictCode:''})
        fieldList.push({type:'string',value:'destfilenames',text:'结果文件',dictCode:''})
        this.superFieldList = fieldList
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>