import getClaimProcessData from './getClaimProcessData';
import updateAssignDocumentUtil from './updateAssignDocument';
import getDropDownList from './getDropDownList';
import transferFormData from './transferFormData';
import getApplicationDate from './getApplicationDate';
import setDefaultValue from './setDefaultValue';
import * as documentUtils from './documentUtils';
import * as normalize from './normalize';
import setExtraForm from './setExtraForm';

export {
  getClaimProcessData, // 获取claim数据
  getDropDownList, // 获取dropdown数组
  normalize, // 扁平化公式
  transferFormData, // 处理格式转换
  getApplicationDate, // 获取头部日期字段
  setDefaultValue, // 设置默认值
  documentUtils, // 书类检测工具类
  updateAssignDocumentUtil, // 更新书类与请求书番号
  setExtraForm, // field改变，callback
};
