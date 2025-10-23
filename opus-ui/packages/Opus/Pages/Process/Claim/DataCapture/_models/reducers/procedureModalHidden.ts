import { produce } from 'immer';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.procedureModal = {
      ...draftState.procedureModal,
      show: false,
      searchContent: '',
      searchList: [],
      treatmentId: '',
      procedureId: '',
      current: 1,
      total: 0,
    };
  });

  return { ...nextState };
};
