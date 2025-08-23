/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) =>
  produce(state, (draftState: any) => {
    if (action.payload && lodash.isArray(action.payload.roleData)) {
      draftState.roleData = action.payload.roleData;
    }
  });
