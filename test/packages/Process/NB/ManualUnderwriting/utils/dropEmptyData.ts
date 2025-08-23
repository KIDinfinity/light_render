import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default ({ objItem, loseFileds }: any) => {
  let isDrop = true;
  lodash
    .chain(objItem)
    .entries()
    .forEach(([key, value]) => {
      if (key && !!formUtils.queryValue(value) && !lodash.includes(loseFileds, key)) {
        isDrop = false;
      }
    })
    .value();
  return isDrop;
};
