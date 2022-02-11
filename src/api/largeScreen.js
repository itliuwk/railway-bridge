import api from './index'
import {
  axios
} from '@/utils/request'



/**
 * 病害损伤等级统计查询
 * @param {*} parameter 
 * @returns 
 */
export function getDiseaseLevel(parameter) {
  return axios({
    url: '/moudle/api/diseaseLevel',
    method: 'get',
    data: parameter
  })
}

/**
 * 所有检测桥梁个数统计
 * @param {*} parameter 
 * @returns 
 */
export function getDetectionBridgeCount(parameter) {
  return axios({
    url: '/moudle/api/detectionBridgeCount',
    method: 'get',
    data: parameter
  })
}


/**
 * 查询年度总检测量 检测信息统计
 * @param {*} parameter 
 * @returns 
 */
export function getBridgeDetectionCountMil(parameter) {
  return axios({
    url: '/moudle/api/BridgeDetectionCountMil',
    method: 'get',
    data: parameter
  })
}


/**
 * 所有检测里程统计
 * @param {*} parameter 
 * @returns 
 */
export function getDetectionLengthCount(parameter) {
  return axios({
    url: '/moudle/api/detectionLengthCount',
    method: 'get',
    data: parameter
  })
}




/**
 * 病害信息图片展示
 * @param {*} parameter 
 * @returns 
 */
export function queryDiseaseUrlList(parameter) {
  return axios({
    url: '/moudle/api/queryDiseaseUrlList',
    method: 'get',
    data: parameter
  })
}