import { produce }  from 'immer';
import lodash from 'lodash';

const updateEditData = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.editData = {
      ...draftState.editData,
      ...changedFields,
    };

    draftState.advanceModeError =
      lodash.size(draftState.editData.ruleContent) === 0 ? 'Required' : '';
  });

  return { ...nextState };
};

export default updateEditData;
