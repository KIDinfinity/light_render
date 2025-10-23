import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { changedFields, clientId } = payload;
  const nextState = produce(state, (draftState: any) => {
    if (lodash.has(changedFields, 'companyLegalForm')) {
      draftState.modalData.entities.clientMap[clientId] = {
        ...draftState.modalData.entities.clientMap[clientId],
        ['companyLegalForm']: changedFields.companyLegalForm,
      };
    }
  });

  return {
    ...nextState,
  };
};
