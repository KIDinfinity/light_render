// TODO:这个文件到时候去掉
import lodash from 'lodash';
import { Type, TypeCode, Operator } from '../Enum';
import getFormItem from './getFormItem';
import getDropDownFormat from './getDropDownFormat';
import getDictsValue from './getDictsValue';

const MultiOperator = [Operator.in, Operator.belongsTo, Operator.notBelongTo];

interface ISProps {
  atomInputInfo?: any;
  atomCode?: any;
  type?: string;
  booleanArray?: any;
  operator?: any;
  judgementMethod?: string;
  ruleAtomModule?: any;
}

export default ({
  atomInputInfo,
  atomCode,
  type = Type.BasicRule,
  booleanArray = [],
  operator,
  judgementMethod,
  ruleAtomModule = [],
}: ISProps) => {
  const atomInfo = lodash
    .chain(atomInputInfo)
    .cloneDeep()
    .find((el) => el.atomCode === atomCode)
    .value();

  const path = type === Type.Result || type === Type.Scenario ? type : `${type}.${judgementMethod}`;

  const operators = lodash
    .chain(atomInfo)
    .get(`operatorList.${path}`)
    .map((item: any) => ({
      dictName: getDropDownFormat({
        labelId: item,
        type: TypeCode.Operators,
        defaultName: item,
      }),
      dictCode: item,
    }))
    .value();
  const dictPath = lodash.includes(MultiOperator, operator) ? operator : Operator.others;

  const dictsValue = getDictsValue({
    atomInfo,
    booleanArray,
    dictPath,
    ruleAtomModule,
  });

  const { FormType, FormItem, isDate } = getFormItem({
    inputBoxType: atomInfo?.inputBoxType,
    operator,
    dictsValue,
    atomInfo,
    booleanArray,
    dictPath,
    ruleAtomModule,
  });
  return {
    atomInfo,
    operators,
    FormType,
    FormItem,
    isDate,
    dictsValue,
  };
};
