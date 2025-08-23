import { produce } from 'immer';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { documentId, keyName } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const values = lodash.get(
      draftState,
      `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.${keyName}`,
      []
    );
    values.push({
      id: uuidv4(),
    });
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.claimEntities.bpoFormDataList[documentId].formData = {
      ...draftState.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
      [keyName]: values,
    };
  });

  return { ...nextState };
};
