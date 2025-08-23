import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { changedFields, id } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.entities.clientMap[id].personalInfo = {
      ...draftState.modalData.entities?.clientMap[id]?.personalInfo,
      ...changedFields,
    };
  });

  return {
    ...nextState,
  };
};
