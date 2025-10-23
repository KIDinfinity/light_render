import lodash from 'lodash';
import { produce } from 'immer';

import { ApplicationType } from 'opus/Enums';

export default (state: any, action: Object) => {
  const activityCategory = lodash.get(action, 'payload.activityCategory', {});
  const nextState = produce(state, (draftState: any) => {
    draftState.activityCategory = {
      ...(activityCategory || {}),
      activityCategoryList: lodash.filter(
        activityCategory?.activityCategoryList,
        (item: any) => item?.applicationType !== ApplicationType.readOnly
      ),
    };
  });
  return {
    ...nextState,
  };
};
