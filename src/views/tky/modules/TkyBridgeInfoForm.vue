<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="路局" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bureauName">
              <a-input v-model="model.bureauName" placeholder="请输入路局"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="段名" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="duanName">
              <a-input v-model="model.duanName" placeholder="请输入段名"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="线名" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="lineName">
              <a-input v-model="model.lineName" placeholder="请输入线名"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="桥梁号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeNumber">
              <a-input-number v-model="model.bridgeNumber" placeholder="请输入桥梁号" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="桥梁名" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeName">
              <a-input v-model="model.bridgeName" placeholder="请输入桥梁名"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
          <a-form-model-item label="桥孔数量" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeOpenCount">
            <a-input v-model="model.bridgeOpenCount" placeholder="请输入桥孔数量"  ></a-input>
          </a-form-model-item>
        </a-col>

          <a-col :span="24">
            <a-form-model-item label="行别" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeXingbie">
              <a-input v-model="model.bridgeXingbie" placeholder="请输入行别"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="起始里程" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeStartMil">
              <a-input v-model="model.bridgeStartMil" placeholder="请输入起始里程"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="中心里程" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeCentreMil">
              <a-input v-model="model.bridgeCentreMil" placeholder="请输入中心里程"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="终止里程" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeEndMil">
              <a-input v-model="model.bridgeEndMil" placeholder="请输入终止里程"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="全长" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeLength">
              <a-input v-model="model.bridgeLength" placeholder="请输入全长"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="所在区间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeSector">
              <a-input v-model="model.bridgeSector" placeholder="请输入所在区间"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="桥梁编码" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeCode">
              <a-input v-model="model.bridgeCode" placeholder="请输入桥梁编码"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="桥梁类型" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeType">
              <a-input v-model="model.bridgeType" placeholder="请输入桥梁类型"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="工程局" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bulidBureau">
              <a-input v-model="model.bulidBureau" placeholder="请输入工程局"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="运营状态" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="opreationState">
              <a-input v-model="model.opreationState" placeholder="请输入运营状态"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="建成年度" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="buildYear">
              <a-input v-model="model.buildYear" placeholder="请输入建成年度"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="工务段编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="buildDuanNumber">
              <a-input v-model="model.buildDuanNumber" placeholder="请输入工务段编号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="备注1" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="remark1">
              <a-textarea v-model="model.remark1" rows="4" placeholder="请输入备注1" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="备注2" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="remark2">
              <a-textarea v-model="model.remark2" rows="4" placeholder="请输入备注2" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </j-form-container>
  </a-spin>
</template>

<script>

  import { httpAction, getAction } from '@/api/manage'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: 'TkyBridgeInfoForm',
    components: {
    },
    props: {
      //表单禁用
      disabled: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    data () {
      return {
        model:{
         },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        validatorRules: {
        },
        url: {
          add: "/moudle/tkyBridgeInfo/add",
          edit: "/moudle/tkyBridgeInfo/edit",
          queryById: "/moudle/tkyBridgeInfo/queryById"
        }
      }
    },
    computed: {
      formDisabled(){
        return this.disabled
      },
    },
    created () {
       //备份model原始值
      this.modelDefault = JSON.parse(JSON.stringify(this.model));
    },
    methods: {
      add () {
        this.edit(this.modelDefault);
      },
      edit (record) {
        this.model = Object.assign({}, record);
        this.visible = true;
      },
      submitForm () {
        const that = this;
        // 触发表单验证
        this.$refs.form.validate(valid => {
          if (valid) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            httpAction(httpurl,this.model,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
            })
          }
         
        })
      },
    }
  }
</script>