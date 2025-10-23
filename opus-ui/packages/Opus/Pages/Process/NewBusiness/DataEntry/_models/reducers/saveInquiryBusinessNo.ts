import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default (state, action) => {
  return produce(state, (draftState) => {
    lodash.set(draftState, 'processData.inquiryBusinessNo', action?.payload);
  });
};
