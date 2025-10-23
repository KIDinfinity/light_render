import React from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { TypeCode, FormType as FormTypeEnum } from '../../Enum';
import getDropDownFormat from '../../Utils/getDropDownFormat';
import getOperators from '../../Utils/getOperators';

const getDictValue = ({ dictsValue, value }) => {
  return lodash
    .chain(value)
    .split(',')
    .map((el: string) => {
      const itemValue = lodash.find(dictsValue, { itemCode: el })
      return !!itemValue ? itemValue.itemName : el
    })
    .join(' , ')
    .value();
};

export default ({
  record,
  key,
  atomCode,
  match = true,
  options = [],
  allRuleAtoms = [],
  atomInputInfo = [],
  ruleAtomModule = [],
  booleanArray = [],
  type,
}: any) => {
  return lodash
    .chain(record)
    .get(key)
    .filter((el) => {
      if (match) {
        return el.atomCode === atomCode;
      }
      return !lodash.some(options, (item) => el.atomCode === item.atomCode && item.standalone);
    })
    .map((item, index) => {
      const parameter = item?.formulaInfo?.parameter;
      const formula = item?.formulaInfo?.formula;
      const isFlagF = item?.atomFlag === 'F';
      let formatName = '';
      if (
        !isFlagF &&
        formula &&
        parameter &&
        !lodash.isEmpty(formula) &&
        !lodash.isEmpty(parameter)
      ) {
        formatName = `${formula.substring(formula.indexOf('.') + 1, formula.length)}(${lodash
          .values(parameter)
          .map((value) => value)
          .join(',')})`;
      } else {
        formatName = getDropDownFormat({
          labelId: item.atomCode,
          type: TypeCode.AtomCode,
          defaultName:
            lodash.chain(allRuleAtoms).find({ atomCode: item.atomCode }).get('atomName').value() ||
            item.atomCode,
        });
      }

      const formatOperator = formatMessageApi({
        [TypeCode.Operators]: item.operator,
      });

      const { FormType, dictsValue } = getOperators({
        atomInputInfo,
        atomCode: item.atomCode,
        type,
        ruleAtomModule,
        booleanArray,
        operator: item.operator,
        judgementMethod: record?.judgementMethod,
      });

      let { value } = item;
      if (!lodash.isEmpty(value)) {
        if (!lodash.isEmpty(item.valueName)) {
          value = item.valueName;
        } else if (!lodash.isEmpty(dictsValue)) {
          value = getDictValue({ value, dictsValue });
        } else if (FormType === FormTypeEnum.Date) {
          value = moment(value).format('L');
        } else if (FormType === FormTypeEnum.DateComboBox) {
          if (!lodash.isNaN(Date.parse(value))) {
            value = moment(value).format('L');
          } else {
            value = getDictValue({ value, dictsValue });
          }
        }
      }

      return (
        <div key={`${item.atomCode}_${String(index)}`}>
          {!match && formatName} {formatOperator} {value || item.value}
        </div>
      );
    })
    .value();
};
