import lodash from 'lodash';
import getDisplayResonFlag from 'opus/NewBusiness/ManualUnderwriting/_utils/getDisplayResonFlag';
import { Visible } from 'basic/components/Form';

export default (config) => {
  const reasonVisibleConditions = getDisplayResonFlag();
  if (!lodash.isArray(config)) {
    return [];
  }
  const hiddenList = config?.filter((item) => {
    let flag = false;
    if (item?.['field-props']?.visible === Visible.Conditions) {
      switch (item?.field) {
        case 'reason':
          flag = !reasonVisibleConditions;
          break;
        default:
          flag = false;
      }
    }
    return flag;
  });
  return hiddenList?.map((item) => item?.field) || [];
};
