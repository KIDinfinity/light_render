import { produce } from 'immer';
import lodash from 'lodash';
import checkValidators from './checkValidators';

export default (state: any, action: any) => {
  const { documentId, keyName, id, changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const arrays =
      draftState.claimProcessData.claimEntities.bpoFormDataList[documentId].formData[keyName] || [];
    draftState.claimProcessData.claimEntities.bpoFormDataList[documentId].formData[
      keyName
    ] = lodash.map(arrays, (el: any) =>
      el.id === id
        ? {
            ...el,
            ...changedFields,
          }
        : el
    );
  });

  return checkValidators(nextState, {
    type: 'checkValidators',
    payload: action.payload,
  });
};
