import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { changedFields, id, contactId } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.entities.contactInfoMap[contactId] = {
      ...draftState.modalData.entities.contactInfoMap[contactId],
      ...changedFields,
    };
  });

  return {
    ...nextState,
  };
};
