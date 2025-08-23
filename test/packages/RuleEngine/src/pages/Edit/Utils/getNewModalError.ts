import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { Operator } from '../Enum';

export default (conditions: [], results: []) => {
  const getErrorArr = (list: any) => {
    return (
      lodash
        .chain(list)
        .map((item: any) => {
          const { id, atomCode, operator, value } = formUtils.cleanValidateData(item) || {};

          return {
            id,
            atomCodeError: lodash.isEmpty(atomCode),
            valueError: lodash.includes([Operator.isBlank, Operator.isNotBlank], operator)
              ? false
              : lodash.isEmpty(value),
          };
        })
        .filter((el: any) => el.atomCodeError || el.valueError)
        .value() || []
    );
  };
  return [...getErrorArr(conditions), ...getErrorArr(results)];
};
