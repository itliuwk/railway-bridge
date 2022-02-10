<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="线名" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeInfoLineName">
              <a-input v-model="model.bridgeInfoLineName" placeholder="请输入线名"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="桥梁名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeInfoName">
              <a-input v-model="model.bridgeInfoName" placeholder="请输入桥梁名称"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="桥梁编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeInfoCode">
              <a-input v-model="model.bridgeInfoCode" placeholder="请输入桥梁编号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="检测时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="detectionTime">
              <a-input v-model="model.detectionTime" placeholder="请输入检测时间"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="病害类型" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="type">
              <a-input v-model="model.type" placeholder="请输入病害类型"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="名称缩写" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="typeValue">
              <a-input v-model="model.typeValue" placeholder="请输入名称缩写"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="形态" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="direction">
              <a-input v-model="model.direction" placeholder="请输入形态"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="面积" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="area">
              <a-input v-model="model.area" placeholder="请输入面积"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="平均宽度" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="widthMean">
              <a-input v-model="model.widthMean" placeholder="请输入平均宽度"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="长度" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="length">
              <a-input v-model="model.length" placeholder="请输入长度"  ></a-input>
            </a-form-model-item>
          </a-col>

          <a-col :span="24">
            <a-form-model-item label="上下行" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="updown">
              <a-input v-model="model.updown" placeholder="请输入上下行"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="区域" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="region">
              <a-input v-model="model.region" placeholder="请输入区域"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="与轨道方向夹角" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="intersectionAngle">
              <a-input v-model="model.intersectionAngle" placeholder="与轨道方向夹角"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="等级" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="levelCode">
              <a-input v-model="model.levelCode" placeholder="请输入等级"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="病害编码" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="typeCode">
              <a-input v-model="model.typeCode" placeholder="请输入病害编码"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="描述信息" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="description">
              <a-textarea v-model="model.description" rows="4" placeholder="请输入描述信息" />
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
    name: 'TkyDiseaseForm',
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
          add: "/moudle/tkyDisease/add",
          edit: "/moudle/tkyDisease/edit",
          queryById: "/moudle/tkyDisease/queryById"
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