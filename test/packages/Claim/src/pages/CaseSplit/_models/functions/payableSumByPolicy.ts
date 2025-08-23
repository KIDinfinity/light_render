import lodash from 'lodash';
import { add } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';

export default (treatmentPayables: any) => {
  return lodash.compact(treatmentPayables).reduce((total: number, item: any) => {
    return add(total, formUtils.queryValue(item.payableAmount));
  }, 0);
};
