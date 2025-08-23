import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const ntuDataObject = lodash.get(draftState, 'ntuDataObject', {});
    // eslint-disable-next-line no-param-reassign
    draftState.ntuDataObject = {
      ...draftState.ntuDataObject,
      ...changedFields,
    };
    lodash.set(draftState, 'businessData.ntuDataObject', {
      ...ntuDataObject,
      ...changedFields,
    });
  });
  return { ...nextState };
};
