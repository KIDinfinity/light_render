import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { documentId, keyName, id, isSort = false } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const values =
      draftState.claimProcessData.claimEntities.bpoFormDataList[documentId].formData[keyName] || [];
    const newValues = values.filter((el) => el.id !== id);
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.claimEntities.bpoFormDataList[documentId].formData = {
      ...draftState.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
      [keyName]: isSort ? lodash.sortBy(newValues, []) : newValues,
    };
  });

  return { ...nextState };
};
