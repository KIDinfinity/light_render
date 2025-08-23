import lodash from 'lodash';
import { checkValueClass, hasValueClass } from '../constants/index';

export default (targetDom: any) => {
  const hasClass = lodash.some(
    hasValueClass,
    (valueClass) => targetDom?.getElementsByClassName(valueClass)?.length > 0
  );

  const hasValue = lodash.some(checkValueClass, (valueClass) =>
    lodash.some(
      targetDom?.getElementsByClassName(valueClass),
      (ele) => ele?.value || ele?.innerText
    )
  );

  return hasClass || hasValue;
};
