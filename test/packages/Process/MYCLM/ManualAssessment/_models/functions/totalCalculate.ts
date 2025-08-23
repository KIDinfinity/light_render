import lodash from 'lodash';
import { add } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';

/**
 * 根据指定的fields统计指定的fields的total value
 * @param calcuData
 * @param fields
 * @returns
 */
export const totalCalculate = (
  calcuData: any,
  fields: string[] | string,
  attachConditions?: string[] | string
): any => {
  if (!lodash.isString(fields) && !lodash.isArray(fields)) return;

  const attachTemp = lodash.isString(attachConditions) ? [attachConditions] : [];

  const fieldsTemp: string[] = lodash.isString(fields) ? [fields] : fields;

  const calcuObj = lodash.reduce(
    fieldsTemp,
    (collect, data) => {
      lodash.set(collect, data, 0);
      return collect;
    },
    {}
  );

  return lodash
    .chain(formUtils.cleanValidateData(calcuData))
    .reduce((collect, data) => {
      const useAttach = lodash.size(attachTemp);
      let condition = true;
      if (useAttach) {
        condition = lodash
          .chain(data)
          .pick(attachTemp)
          .every((val) => !!val)
          .value();
      }

      if (condition && fieldsTemp.some((val: string) => lodash.has(data, val))) {
        fieldsTemp.forEach((val: string) => lodash.set(collect, val, add(collect[val], data[val])));
      }

      return collect;
    }, calcuObj)
    .value();
};
