import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { changedFields, id, validating } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.entities.clientMap[id].otherInfo = {
      ...draftState.modalData.entities.clientMap[id].otherInfo,
      ...changedFields,
    };
  });

  return {
    ...nextState,
  };
};
