import { produce }  from 'immer';
import { get } from 'lodash';

const saveInformation = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { changedFields } = action.payload;
    const indexInformation = get(draftState, 'claimProcessData.indexInformation', {});
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.indexInformation = {
      ...indexInformation,
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveInformation;
