// TODO:这个文件到时候去掉
import React from 'react';
import lodash from 'lodash';
import {
  FormItemInput,
  FormItemSelect,
  FormItemNumber,
  FormItemTextArea,
  FormItemDatePicker,
  FormItemDateSelect,
  FormItemNumberSelect,
} from 'basic/components/Form';
import { Operator, FormType, InputBoxType } from '../Enum';
import getDictsValue from './getDictsValue';

const multiple = [Operator.in, Operator.notIn, Operator.belongsTo, Operator.notBelongTo];

const voidValue = [Operator.max, Operator.min, Operator.isBlank, Operator.isNotBlank];

const comboBox = [
  Operator.equal,
  Operator.lessThan,
  Operator.lessThanEqual,
  Operator.grantThanEqual,
  Operator.grantThan,
];

const FormItemMap = {
  [FormType.Text]: (props: any) => <FormItemInput {...props} />,
  [FormType.Number]: (props: any) => <FormItemNumberSelect {...props} />,
  // [FormType.Number]: (props: any) => <FormItemNumber precision={0} {...props} />,
  [FormType.Amount]: (props: any) => <FormItemNumber precision={0} {...props} />,
  [FormType.Select]: (props: any) => <FormItemSelect {...props} />,
  [FormType.MultiSelect]: (props: any) => (
    <FormItemSelect {...props} mode="multiple" multipleString />
  ),
  [FormType.TextArea]: (props: any) => <FormItemTextArea {...props} />,
  [FormType.Date]: (props: any) => <FormItemDatePicker {...props} />,
  [FormType.Boolean]: (props: any) => <FormItemSelect {...props} />,
  [FormType.DateComboBox]: (props: any) => <FormItemDateSelect {...props} />,
};

const FormTypes = {
  '01': FormType.Text,
  '02': FormType.Number,
  '03': FormType.Amount,
  '04': (operator: string) =>
    lodash.includes(multiple, operator) ? FormType.MultiSelect : FormType.Select,
  '05': FormType.TextArea,
  '06': FormType.Date,
  '07': FormType.Boolean,
  '08': FormType.DateComboBox,
};

export default ({
  inputBoxType = InputBoxType['01'],
  operator,
  dictsValue,
  booleanArray,
  dictPath,
  ruleAtomModule,
}: any) => {
  const curType = FormTypes[inputBoxType];
  let newDictsValue = dictsValue;
  let curFormType = lodash.isFunction(curType) ? curType(operator) : curType;

  if (inputBoxType === InputBoxType['04'] && lodash.isEmpty(dictsValue)) {
    curFormType = FormType.Text;
  }

  if (lodash.includes(comboBox, operator) && curFormType === FormType.Date) {
    curFormType = FormType.DateComboBox;
    newDictsValue = getDictsValue({
      formType: curFormType,
      booleanArray,
      dictPath,
      ruleAtomModule,
    });
  }

  const FormItem = !lodash.includes(voidValue, operator) ? FormItemMap[curFormType] : null;
  return {
    FormType: curFormType,
    isDate: curFormType === FormType.Date,
    FormItem,
    newDictsValue,
  };
};
