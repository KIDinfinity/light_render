import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import getValueList from './getValueList';
import { Operator, ValueType } from '../Enum';

const GType = [Operator.belongsTo, Operator.notBelongTo];
const HiddenValue = [Operator.isBlank, Operator.isNotBlank];

export default ({ item, changedFields, ruleAtoms, atomInputInfo }: any) => {
  const changedAtomCode = formUtils.queryValue(changedFields.atomCode);
  const changedValue = formUtils.queryValue(changedFields.value);
  const changedOperator = formUtils.queryValue(changedFields.operator);
  const changedTimePick = formUtils.queryValue(changedFields.timePick);

  const newCondition = !changedTimePick
    ? {
        ...item,
        ...changedFields,
      }
    : {
        ...item,
        value: moment(changedTimePick).format('L'),
      };
  const atomCode = formUtils.queryValue(newCondition.atomCode);
  const operator = formUtils.queryValue(newCondition.operator);
  const atomFlag = lodash.chain(ruleAtoms).find({ atomCode }).get('atomFlag').value();

  let comparisonValueType = formUtils.queryValue(item.comparisonValueType);

  if (HiddenValue.includes(changedOperator) && changedOperator) {
    comparisonValueType = ValueType.F;
  }

  if (changedValue) {
    const atomInfo = lodash.chain(atomInputInfo).find({ atomCode }).value() || {};
    const list = getValueList({ atomInfo, operator });
    comparisonValueType = ValueType.F;
    if (lodash.includes(GType, operator)) {
      comparisonValueType = ValueType.G;
    }
    if (!lodash.isEmpty(list) && changedValue) {
      comparisonValueType =
        lodash
          .chain(list)
          .find((el: any) => el.itemCode === changedValue)
          .get('itemType')
          .value() || comparisonValueType;
    }

    if (lodash.isArray(changedValue)) {
      newCondition.value = changedValue.join(',');
    }
  }

  return changedAtomCode && Object.keys(changedFields).length === 1
    ? {
        // 清空数据
        ...newCondition,
        operator: '',
        value: '',
        atomFlag: '',
        comparisonValueType: '',
      }
    : {
        ...newCondition,
        atomFlag,
        comparisonValueType,
      };
};
