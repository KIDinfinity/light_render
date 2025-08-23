// import { FormItemProps as AntFormItemProps } from 'antd/es/form';

// FormItem 通用属性
export interface CommonProps {
  disabled?: boolean; // 不可编辑
  required?: boolean; // 必填
  rules?: any[]; // 规则
  triggerEvent?: string; // 触发事件
  initialValue?: any; // 初始化值
  value?: any; // 值
  form?: any;
  onChange?: any; // 值改变事件
  onBlur?: Function; // 失焦事件
  onFocus?: Function;
  placeholder?: any;
  valuePropName?: string; // 值的key， 默认value，checkbox: checked
  allowClear?: boolean; // 允许清除
  pattern?: any; // 规则正则表达式
  maxLength?: number; // 最大长度
  suffix?: any; // 后缀
  prefix?: any; // 前缀
  children?: any;
  defaultValue?: any; // 默认值
  getPopupContainer?: any; // 渲染节点
  bordered?: boolean; // 边框显示
}

// 自定义属性（理赔）
export interface DefinedProps {
  formName?: string; // 表单名
  labelId?: string; // 国际化dictCode
  formItemLayout?: Object; // 布局
  labelTypeCode?: string; // 国际化label typeCode
  labelType?: string; // label布局方式， isInline， 要改成isInline属性
  isInline?: boolean; // 行内布局
  hideRequired?: boolean; // 隐藏必填校验
  dicts?: any; // 下拉选项数组
  dictCode?: string; // 下拉值key
  dictName?: string; // 下拉显示name
  dictTypeCode?: string; // 下拉typeCode
  recoverValue?: any; // 回滚值
  OnRecover?: any; // 回滚触发事件
  setVisible?: Function; // 设置ErrorToolTips可见
  warningMessage?: any[]; // 显示警告
  onClick?: any; // 点击事件
  view?: string; // 纯显示值
}

export interface FormItemProps extends CommonProps, DefinedProps {
  className?: any;
}

// Lable & ErrorToolTips
export interface LabelProps {
  warningMessage?: any[];
  labelId?: string; // 国际化dictCode
  form?: any; // 表单
  formName?: string; // 表单名
  visible?: boolean; // 显示与否
  reload?: string; // 显示刷新按钮
  labelTypeCode?: string; // 国际化typeCode
  refreshStyle?: any; // 与reload关联，reload样式
  reminder?: any; // 提示reminder
  title?: string; // 标题
  useError?: any; // 显示错我
  tipMsg?: any; // 提示tooltip语句
  tagText?: any; // 提示语句
  errors?: any; // 错误数组，由rc-form赋值
  errorTake?: number;
  disabled?: boolean;
  reloadSpin?: boolean;
}

type DictKey = 'dictCode' | 'dictName';

export interface DictProps {
  dictCode?: string;
  dictName?: string;
}

export interface CommonFormItemProps extends LabelProps, DefinedProps, CommonProps {
  className?: any;
  labelId?: string;
  propsDefaultValue?: any;
  propChildren?: any;
  prefix?: any;
  extra?: any;
  children?: any;
  title?: any;
  noFormItemAppend?: boolean;
  requiredTriggerValidate?: boolean;
}

export interface ErrorRefProps {
  form: any;
  formName: string;
  nodeRef: any;
  disabled?: boolean;
}

export interface NumberDefinedProps {
  objectName?: any;
  objectFieldName?: any;
  objectFieldValueType?: any;
  isShowCalculation?: boolean;
  handleOpen?: any;
  precision?: any;
  min?: any;
  max?: any;
  formatter?: any;
  parser?: any;
  defaultParser?: boolean;
}

export interface FormItemInputProps extends FormItemProps {
  cusTitle?: string | boolean;
  isEllipsis?: boolean;
  onKeyDown?: any;
  onPressEnter?: any;
  onFocus?: any;
  maxLength?: any;
  warningMessage?: any;
  prefix?: any;
  suffix?: any;
  useArray?: boolean;
  useDict?: string;
  reload?: any;
  transform?: any;
  type?: string;
  autoComplete?: string;
  noFormItemAppend?: boolean;
  required?: boolean;
  requiredTriggerValidate?: boolean;
}

export interface FormItemDatePickerProps extends FormItemProps {
  defaultPickerValue?: any;
  open?: boolean;
  onOpenChange?: any;
  onOk?: any;
  renderExtraFooter?: any;
  disabledDate?: any;
  showTime: any;
  allowFreeSelect?: boolean;
  requiredTriggerValidate?: boolean;
}
export interface FormItemMonthDatePickerProps extends FormItemProps {
  defaultPickerValue?: any;
  open?: boolean;
  onOpenChange?: any;
  onOk?: any;
  renderExtraFooter?: any;
  disabledDate?: any;
  showTime: any;
  allowFreeSelect?: boolean;
  requiredTriggerValidate?: boolean;
}
export interface FormItemSelectProps extends FormItemProps {
  choiseHighlight?: boolean;
  placeholderHighlight?: boolean;
  mode?: any;
  multipleString?: any;
  loading?: boolean;
  onSelect?: any;
  editable?: boolean;
  filterList?: string[];
  existCodes?: string[];
  showOnlyOneItem?: boolean;
  defaultSelectFirst?: boolean;
  dictCode?: string;
  optionLabelProp?: string;
  specifyTitleField?: string;
  autoClearSearchValue?: boolean;
  requiredTriggerValidate?: boolean;
}

export interface FormItemCheckboxProps extends FormItemProps {
  valueType?: string;
  requiredTriggerValidate?: boolean;
}

export interface FormItemNumberProps extends FormItemProps, NumberDefinedProps {
  suffix?: any;
  onHover?: any;
  setTipMsg?: any;
  labelRight?: boolean;
  reload?: string; // 显示刷新按钮
  cusTitle?: string | boolean;
  title?: string;
  isShowType?: string;
  freePrecision?: boolean;
  hiddenPrefix?: boolean;
  loading?: any;
  requiredTriggerValidate?: boolean;
}

export interface FormItemSelectPlusProps extends FormItemProps {
  dropdownCode?: any;
  otherParams?: any;
  disabledDictCodes?: any;
  onSelectCallback?: any;
  saveName?: any;
  selectCallbackExProp?: any;
  internationalizationType?: any;
  extraData?: any;
  searchName?: any;
  typeCode?: any;
  mode?: any;
  optionShowType?: any;
  searchCustom?: any;
  selectCallbackItem?: boolean;
  customUrl?: Function;
  callBackSetDataList?: Function;
  callBackCurrentItem?: Function;
  isFreeText?: boolean;
  freeTextHiddenName?: boolean;
  isPassCodeName?: boolean;
  allowEmptySearch?: boolean;
  requiredTriggerValidate?: boolean;
}

export interface FormItemCurrencyProps extends FormItemProps, NumberDefinedProps {
  currencyCode?: any;
  currencies?: any;
  hiddenPrefix?: boolean;
  onSuffixChange?: Function;
  suffixEditable?: boolean;
  hiddenDropDown?: boolean;
  requiredTriggerValidate?: boolean;
}

export interface FormItemAutoCompleteProps extends FormItemProps {
  onSearch: Function;
  onSelect: Function;
  dataSource: string[];
  requiredTriggerValidate?: boolean;
}

export type FormItemCascaderProps = FormItemProps

export interface FormItemCheckboxGroupProps extends Omit<FormItemProps, DictKey>, DictProps {
  itemOnChange?: Function; // checkBoxGroup某一项触发
  colSpan?: number;
  tooltip?: string;
  requiredTriggerValidate?: boolean;
}

export interface FormItemTimePickerProps extends FormItemProps {
  format?: any;
  setExtraWarningMessage?: any;
  valueFormat?: any;
  requiredTriggerValidate?: boolean;
}

export interface FormItemTextAreaProps extends FormItemProps {
  inside?: boolean;
  hasError?: boolean;
  cusTitle?: any;
  autoSize?: boolean;
  row?: number;
  onType?: Function;
  requiredTriggerValidate?: boolean;
}

export interface FormItemAutoSizeTextArea extends FormItemProps {
  inside?: boolean;
  hasError?: boolean;
  cusTitle?: any;
  autoSize?: boolean;
  row?: number;
  setModalVisible?: any;
  isModelTextArea?: boolean | undefined;
  requiredTriggerValidate?: boolean;
}

export interface FormItemPhoneProps extends FormItemProps {
  cusTitle?: any;
}
export type FormItemSelectAutoProps = FormItemProps

export interface FormItemRadioProps extends Omit<FormItemProps, DictKey>, DictProps {}

export interface FormItemRadioGroupProps extends Omit<FormItemProps, DictKey>, DictProps {
  colSpan?: number;
  requiredTriggerValidate?: boolean;
}

export type FormItemDateSelectProps = FormItemProps

export interface FormItemNumberSelectProps extends Omit<FormItemProps, DictKey>, DictProps {
  cusTitle?: any;
  warningMessage?: any;
  existCodes?: any;
  optionShowType?: any;
  requiredTriggerValidate?: boolean;
}
