import lodash from 'lodash';
import { TypeCode, InputBoxType, FormType } from '../Enum';
import getDropDownFormat from './getDropDownFormat';

export default ({ atomInfo, booleanArray, dictPath, ruleAtomModule, formType }: any) => {
  let dictsValue = !lodash.isEmpty(atomInfo)
    ? lodash.filter(atomInfo?.dataMap[dictPath], (el: any) => {
        return !lodash.isEmpty(el.itemCode) && !lodash.isEmpty(el.itemName);
      }) || []
    : [];
  if (atomInfo?.inputBoxType === InputBoxType['07']) {
    dictsValue = lodash.map(booleanArray, (item) => ({
      itemCode: item.dictCode,
      itemName: item.dictName,
    }));
  } else if (atomInfo?.inputBoxType === InputBoxType['08'] || formType === FormType.DateComboBox) {
    dictsValue = lodash.map(ruleAtomModule, (item) => ({
      itemCode: item.atomCode,
      itemName: getDropDownFormat({
        labelId: item.atomCode,
        type: TypeCode.AtomCode,
        defaultName: item.atomName || item.atomCode,
      }),
    }));
  }
  return dictsValue;
};
