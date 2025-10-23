/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload: { changedFields } }: any) =>
  produce(state, (draftState: any) => {
    if (lodash.isPlainObject(draftState.getUserManagement)) {
      draftState.getUserManagement.organizationList = {
        ...draftState.getUserManagement.organizationList,
        ...formUtils.mapFieldsToObj(changedFields),
      };
    }
  });
