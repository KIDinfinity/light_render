import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';

export default ({ keyName, list }: any) => {
  let total = 0;
  lodash.map(list, (item: any) => {
    total = add(Number(total), Number(formUtils.queryValue(item[keyName]) || 0));
  });
  return total;
};
