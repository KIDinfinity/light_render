import { produce } from 'immer';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.otherProcedureModal = {
      ...draftState.otherProcedureModal,
      show: false,
      searchContent: '',
      searchList: [],
      treatmentId: '',
      otherProcedureId: '',
      current: 1,
      total: 0,
    };
  });

  return { ...nextState };
};
