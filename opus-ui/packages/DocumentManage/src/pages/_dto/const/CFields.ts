import { EComponentType } from '../enums';

export const InputProps = {
  component: EComponentType.Input,
  formName: '',
  labelId: '',
  disabled: false,
  required: false,
  orderNo: null,
};

export const SelectProps = {
  component: EComponentType.Select,
  formName: '',
  labelId: '',
  dictCode: '',
  dictName: '',
  dicts: [],
  disabled: false,
  required: false,
  orderNo: null,
};

export const DatePickerProps = {
  component: EComponentType.DatePicker,
  format: 'L HH:mm:ss',
  formName: '',
  labelId: '',
  disabled: false,
  required: false,
  orderNo: null,
};

export const LabelIdPrefix = 'document.label';

export default {
  InputProps,
  SelectProps,
  DatePickerProps,
  LabelIdPrefix,
};
