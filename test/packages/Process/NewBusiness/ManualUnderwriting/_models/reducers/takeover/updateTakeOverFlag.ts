import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

type TAction = {
  type: any;
  payload: {
    changedFields: any;
  };
};

export default (state: any, action: TAction) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const extraChangeFields: any = {};
    if(lodash.size(changedFields) === 1 && formUtils.queryValue(changedFields.takeOverFlag) === 'N') {
      extraChangeFields.extTakeOverFlag = '';
    }
    draftState.modalData.takeOver = {
      ...draftState.modalData.takeOver,
      ...changedFields,
      ...extraChangeFields,
    };
  });
  return { ...nextState };
};
