/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { item } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    if (lodash.isEmpty(item)) {
      draftState.PopUpEditPayable = {
        data: {
          incidentId: '',
          children: [],
        },
      };
      draftState.showPopUpEditPayable = false;
    } else if (!lodash.isEmpty(item?.children)) {
      draftState.PopUpEditPayable = {
        data: {
          ...formUtils.cleanValidateData(item),
        },
      };
      draftState.showPopUpEditPayable = true;
    }
  });
  return { ...nextState };
};
