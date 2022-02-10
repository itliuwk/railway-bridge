<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="段名">
              <a-input placeholder="请输入段名" v-model="queryParam.duanName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="线名">
              <a-input placeholder="请输入线名" v-model="queryParam.lineName"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="桥梁号">
                <a-input
                  placeholder="请输入桥梁号"
                  v-model="queryParam.bridgeNumber"
                ></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span
              style="float: left; overflow: hidden"
              class="table-page-search-submitButtons"
            >
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
                >重置</a-button
              >
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? "收起" : "展开" }}
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
      <a-button @click="handleAdd" type="primary" class="add_btn" icon="plus">新增</a-button>
      <a-button type="primary" class="export_btn" icon="download" @click="handleExportXls('tky_bridge_info')"
        >导出</a-button
      >
      <a-upload
        name="file"
        :showUploadList="false"
        :multiple="false"
        :headers="tokenHeader"
        :action="importExcelUrl"
        @change="handleImportExcel"
      >
        <a-button type="primary" class="import_btn" icon="import">导入</a-button>
      </a-upload>
      <!-- 高级查询区域 -->
      <j-super-query
        :fieldList="superFieldList"
        ref="superQueryModal"
        @handleSuperQuery="handleSuperQuery"
      ></j-super-query>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"
            ><a-icon type="delete" />删除</a-menu-item
          >
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a
        >项
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
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        class="j-table-force-nowrap"
        @change="handleTableChange"
      >
        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px; font-style: italic">无图片</span>
          <img
            v-else
            :src="getImgView(text)"
            height="25px"
            alt=""
            style="max-width: 80px; font-size: 12px; font-style: italic"
          />
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px; font-style: italic">无文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="downloadFile(text)"
          >
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm
                  title="确定删除吗?"
                  @confirm="() => handleDelete(record.id)"
                >
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>

    <tky-bridge-info-modal ref="modalForm" @ok="modalFormOk"></tky-bridge-info-modal>
  </a-card>
</template>

<script>
import "@/assets/less/TableExpand.less";
import { mixinDevice } from "@/utils/mixin";
import { JeecgListMixin } from "@/mixins/JeecgListMixin";
import TkyBridgeInfoModal from "./modules/TkyBridgeInfoModal";

export default {
  name: "TkyBridgeInfoList",
  mixins: [JeecgListMixin, mixinDevice],
  components: {
    TkyBridgeInfoModal,
  },
  data() {
    return {
      description: "tky_bridge_info管理页面",
      // 表头
      columns: [
        {
          title: "序号",
          dataIndex: "",
          key: "rowIndex",
          width: 60,
          align: "center",
          customRender: function (t, r, index) {
            return parseInt(index) + 1;
          },
        },
        {
          title: "路局",
          align: "center",
          dataIndex: "bureauName",
        },
        {
          title: "段名",
          align: "center",
          dataIndex: "duanName",
        },
        {
          title: "线名",
          align: "center",
          dataIndex: "lineName",
        },
        {
          title: "桥梁号",
          align: "center",
          dataIndex: "bridgeNumber",
        },
        {
          title: "桥梁名",
          align: "center",
          dataIndex: "bridgeName",
        },
        {
          title: "桥孔数量",
          align: "center",
          dataIndex: "bridgeOpenCount",
        },
        {
          title: "行别",
          align: "center",
          dataIndex: "bridgeXingbie",
        },
        {
          title: "起始里程",
          align: "center",
          dataIndex: "bridgeStartMil",
        },
        {
          title: "中心里程",
          align: "center",
          dataIndex: "bridgeCentreMil",
        },
        {
          title: "终止里程",
          align: "center",
          dataIndex: "bridgeEndMil",
        },
        {
          title: "全长",
          align: "center",
          dataIndex: "bridgeLength",
        },
        {
          title: "所在区间",
          align: "center",
          dataIndex: "bridgeSector",
        },
        {
          title: "桥梁编码",
          align: "center",
          dataIndex: "bridgeCode",
        },
        {
          title: "桥梁类型",
          align: "center",
          dataIndex: "bridgeType",
        },
        {
          title: "工程局",
          align: "center",
          dataIndex: "bulidBureau",
        },
        {
          title: "运营状态",
          align: "center",
          dataIndex: "opreationState",
        },
        {
          title: "建成年度",
          align: "center",
          dataIndex: "buildYear",
        },
        {
          title: "工务段编号",
          align: "center",
          dataIndex: "buildDuanNumber",
        },
        {
          title: "备注1",
          align: "center",
          dataIndex: "remark1",
        },
        {
          title: "备注2",
          align: "center",
          dataIndex: "remark2",
        },
        {
          title: "操作",
          dataIndex: "action",
          align: "center",
          fixed: "right",
          width: 147,
          scopedSlots: { customRender: "action" },
        },
      ],
      url: {
        list: "/moudle/tkyBridgeInfo/list",
        delete: "/moudle/tkyBridgeInfo/delete",
        deleteBatch: "/moudle/tkyBridgeInfo/deleteBatch",
        exportXlsUrl: "/moudle/tkyBridgeInfo/exportXls",
        importExcelUrl: "moudle/tkyBridgeInfo/importExcel",
      },
      dictOptions: {},
      superFieldList: [],
    };
  },
  created() {
    this.getSuperFieldList();
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG["domianURL"]}/${this.url.importExcelUrl}`;
    },
  },
  methods: {
    initDictConfig() {},
    getSuperFieldList() {
      let fieldList = [];
      fieldList.push({ type: "string", value: "bureauName", text: "路局", dictCode: "" });
      fieldList.push({ type: "string", value: "duanName", text: "段名", dictCode: "" });
      fieldList.push({ type: "string", value: "lineName", text: "线名", dictCode: "" });
      fieldList.push({
        type: "int",
        value: "bridgeNumber",
        text: "桥梁号",
        dictCode: "",
      });
      fieldList.push({
        type: "string",
        value: "bridgeName",
        text: "桥梁名",
        dictCode: "",
      });
      fieldList.push({
        type: "string",
        value: "bridgeOpenCount",
        text: "桥孔数量",
        dictCode: "",
      });
      fieldList.push({
        type: "string",
        value: "bridgeXingbie",
        text: "行别",
        dictCode: "",
      });
      fieldList.push({
        type: "string",
        value: "bridgeStartMil",
        text: "起始里程",
        dictCode: "",
      });
      fieldList.push({
        type: "string",
        value: "bridgeCentreMil",
        text: "中心里程",
        dictCode: "",
      });
      fieldList.push({
        type: "string",
        value: "bridgeEndMil",
        text: "终止里程",
        dictCode: "",
      });
      fieldList.push({
        type: "string",
        value: "bridgeLength",
        text: "全长",
        dictCode: "",
      });
      fieldList.push({
        type: "string",
        value: "bridgeSector",
        text: "所在区间",
        dictCode: "",
      });
      fieldList.push({
        type: "string",
        value: "bridgeCode",
        text: "桥梁编码",
        dictCode: "",
      });
      fieldList.push({
        type: "string",
        value: "bridgeType",
        text: "桥梁类型",
        dictCode: "",
      });
      fieldList.push({
        type: "string",
        value: "bulidBureau",
        text: "工程局",
        dictCode: "",
      });
      fieldList.push({
        type: "string",
        value: "opreationState",
        text: "运营状态",
        dictCode: "",
      });
      fieldList.push({
        type: "string",
        value: "buildYear",
        text: "建成年度",
        dictCode: "",
      });
      fieldList.push({
        type: "string",
        value: "buildDuanNumber",
        text: "工务段编号",
        dictCode: "",
      });
      fieldList.push({ type: "Text", value: "remark1", text: "备注1", dictCode: "" });
      fieldList.push({ type: "Text", value: "remark2", text: "备注2", dictCode: "" });
      this.superFieldList = fieldList;
    },
  },
};
</script>
<style scoped>
@import "~@assets/less/common.less";
</style>
