import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';

export default (state) => {
  return produce(state, (draftState) => {
    if (!draftState.processData?.payorCrs?.nonThCrsList)
      draftState.processData.payorCrs.nonThCrsList = [];
    draftState.processData.payorCrs?.nonThCrsList?.push({
      id: uuidv4(),
    });
  });
};
