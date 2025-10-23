import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/NewBusiness/DataEntry/activity.config';

export default (state, action) => {
  const { age } = action?.payload || {};
  return produce(state, (draftState) => {
    const insuredAge = lodash.get(draftState, 'processData.insuredInfo.age');
    const insuredIdCard = lodash.get(draftState, 'processData.insuredInfo.idCard');
    const payorIdCard = lodash.get(draftState, 'processData.payorInfo.idCard');

    const draftObject = lodash.get(draftState, 'processData.dividendIcp');
    if (insuredAge >= 20) {
      lodash.set(draftObject, 'idCard', insuredIdCard);
    } else if (insuredAge < 20) {
      lodash.set(draftObject, 'idCard', payorIdCard);
    }
  });
};
