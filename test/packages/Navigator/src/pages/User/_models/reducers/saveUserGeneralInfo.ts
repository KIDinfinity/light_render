/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload: { userGeneralInfo, userId } }: any) =>
  produce(state, (draftState: any) => {
    if (lodash.isString(userId) && userId && lodash.isPlainObject(userGeneralInfo)) {
      draftState.userGeneralInfo = userGeneralInfo;
      draftState.userId = userId;
    }
  });
