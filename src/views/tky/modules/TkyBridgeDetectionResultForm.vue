<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="线名" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeInfoLineName">
              <a-input v-model="model.bridgeInfoLineName" placeholder="请输入线名" disabled ></a-input>
            </a-form-model-item>
          </a-col>
        
          <a-col :span="12">
            <a-form-model-item label="桥梁名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeInfoName">
              <a-input v-model="model.bridgeInfoName" placeholder="请输入桥梁名称" disabled ></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="11">
          <a-form-model-item label="管段" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="trackDivision">
          <a-input v-model="model.trackDivision" placeholder="请输入管段" disabled ></a-input>
          </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="桥梁编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="bridgeInfoCode">
              <a-input v-model="model.bridgeInfoCode" placeholder="请输入桥梁编号" disabled ></a-input>
            </a-form-model-item>
          </a-col>

          </a-row>
          <a-row>

            <a-col :span="12">
              <a-form-model-item label="检测时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="detectionTime">
                <a-input v-model="model.detectionTime" placeholder="请输入检测时间" disabled ></a-input>
              </a-form-model-item>
            </a-col>
          <a-col :span="12">
            <a-form-model-item label="检测区段" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="detectionSector">
              <a-input v-model="model.detectionSector" placeholder="请输入检测区段" disabled ></a-input>
            </a-form-model-item>
          </a-col>
          </a-row>
          <a-row>
          <a-col :span="12">
            <a-form-model-item label="检测行别" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="detectionXingbie">
              <a-input v-model="model.detectionXingbie" placeholder="请输入检测行别" disabled ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="起始里程" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="detectionStartmil">
              <a-input v-model="model.detectionStartmil" placeholder="请输入起始里程" disabled ></a-input>
            </a-form-model-item>
          </a-col>
          </a-row>
          <a-row>
          <a-col :span="12">
            <a-form-model-item label="终止里程" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="detectionEndmil">
              <a-input v-model="model.detectionEndmil" placeholder="请输入终止里程" disabled ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="检测长度" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="detectionLength">
              <a-input v-model="model.detectionLength" placeholder="请输入检测长度" disabled ></a-input>
            </a-form-model-item>
          </a-col>
          </a-row>
          <!--<a-row>-->
          <!--<a-col :span="12">-->
            <!--<a-form-model-item label="检测速度" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="detectionSpeed">-->
              <!--<a-input v-model="model.detectionSpeed" placeholder="请输入检测速度" disabled ></a-input>-->
            <!--</a-form-model-item>-->
          <!--</a-col>-->
          <!--<a-col :span="12">-->
            <!--<a-form-model-item label="开始脉冲" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="detectionStartpulse">-->
              <!--<a-input v-model="model.detectionStartpulse" placeholder="请输入开始脉冲" disabled ></a-input>-->
            <!--</a-form-model-item>-->
          <!--</a-col>-->
          <!--</a-row>-->
          <!--<a-row>-->
          <!--<a-col :span="12">-->
            <!--<a-form-model-item label="结束脉冲" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="detectionEndpulse">-->
              <!--<a-input v-model="model.detectionEndpulse" placeholder="请输入结束脉冲" disabled ></a-input>-->
            <!--</a-form-model-item>-->
          <!--</a-col>-->
          <!--<a-col :span="12">-->
            <!--<a-form-model-item label="频道数" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="detectionChannelnum">-->
              <!--<a-input v-model="model.detectionChannelnum" placeholder="请输入频道数" disabled ></a-input>-->
            <!--</a-form-model-item>-->
          <!--</a-col>-->
          <!--</a-row>-->
          <a-row>
          <a-col :span="12">
            <a-form-model-item label="结果文件" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="destfilenames">
              <a-upload 
                :file-list="fileList" 
                @download="handleDownload"
                :showUploadList="{
                  showRemoveIcon: false,
                  showDownloadIcon: true
                }"
              
              ></a-upload>
              <!-- <j-upload v-model="model.destfilenames"  disabled ></j-upload> -->
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </j-form-container>
  </a-spin>
</template>

<script>

  import { httpAction, getAction,downloadFile } from '@/api/manage'
  import axios from 'axios'
  import Vue from 'vue'
  import { validateDuplicateValue } from '@/utils/util'
import { downFile } from '../../../api/manage'

  export default {
    name: 'TkyBridgeDetectionResultForm',
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
         confirmLoading: false,
         fileList: [
         
        ],
        resultForm:{

        },
        
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
    
        validatorRules: {
        },
        url: {
          add: "/moudle/tkyBridgeDetectionResult/add",
          edit: "/moudle/tkyBridgeDetectionResult/edit",
          queryById: "/moudle/tkyBridgeDetectionResult/queryById",
          down: "/moudle/tkyBridgeDetectionResult/downFile"
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
      handleDownload (file){
        let file2 = file;
        let obj = this.model;
        let parameter = {
          destfilenames : file.name,
          destfileurl : this.model.destfileurl
        }
        this.confirmLoading = true;
        axios({
        method: 'GET',
        url: Vue.prototype.API_BASE_URL+this.url.down,
        params: parameter,
        responseType: 'blob'
        }).then(res=>{
        console.log(res)
        this.confirmLoading = false;
        let blob = new Blob([res.data],{type: "application/octet-stream"});
        // let url = window.URL.createObjectURL(blob);
        // window.location.href = url;
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(blob, file.name)
          } else {
            let url = window.URL.createObjectURL(blob)
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', file.name)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link) //下载完成移除元素
            window.URL.revokeObjectURL(url) //释放掉blob对象
          }
    }).catch(err=>{
        console.log(err)
    })

        // downloadFile().then()
        // getAction(this.url.down, parameter,{responseType: 'blob' }).then((data) => {
        //   if (!data || data.size === 0) {
        //     this.$message.warning('文件下载失败')
        //     return
        //   }
        //   var blob = new Blob([data],{type: "application/octet-stream"});
        //   if (typeof window.navigator.msSaveBlob !== 'undefined') {
        //     window.navigator.msSaveBlob(blob, file.name)
        //   } else {
        //     let url = window.URL.createObjectURL(blob)
        //     let link = document.createElement('a')
        //     link.style.display = 'none'
        //     link.href = url
        //     link.setAttribute('download', file.name)
        //     document.body.appendChild(link)
        //     link.click()
        //     document.body.removeChild(link) //下载完成移除元素
        //     window.URL.revokeObjectURL(url) //释放掉blob对象
        //   }
        // })
        //debugger;
        // getAction(this.url.down,parameter).then((res)=>{

              
        //     })
        //   this.$message.success("测试成功");
      },
      edit (record) {
        this.model = Object.assign({}, record);
          // this.fileList.push({
          //   uid: '-1',
          //   name: 'xxx.png',
          //   status: 'done',
          //   url: 'http://www.baidu.com/xxx.png',
          // });
        // debugger
         let arr = this.model.destfilenames.split(",");
        for(var a=0;a<arr.length;a++){
          //let url = getFileAccessHttpUrl(arr[a]);
          
          this.fileList.push({
            uid:a,
            name:arr[a],
            fileUrl:this.model.destfileurl,
            status: 'done'
          })
        }
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