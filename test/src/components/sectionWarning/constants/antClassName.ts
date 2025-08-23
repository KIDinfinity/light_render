// 需要检查有没有值的class
const checkValueClass = [
  'ant-input', // 输入框 自动完成框 日期选择框
  'ant-cascader-picker-label', // 级联选择
  'ant-input-number-input', // 数字输入框
  'ant-time-picker-input', // 时间选择框
  'ant-select-selection__choice__content', // 多选选择器 多选树选择
  'ant-select-selection-selected-value', // 单选选择器 单选树选择
];
// 只要有值就有的class
const hasValueClass = [
  'ant-checkbox-checked', // 多选框
  'ant-radio-checked', // 单选框
  'ant-switch-checked', // 开关
  'ant-upload-list-item-info', // 上传
];

export { checkValueClass, hasValueClass };
