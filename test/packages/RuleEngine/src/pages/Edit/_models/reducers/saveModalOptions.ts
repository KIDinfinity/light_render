import { produce }  from 'immer';

const saveModalOptions = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.modalOptions = {
      ...draftState.modalOptions,
      ...action.payload,
    };
  });

  return { ...nextState };
};

export default saveModalOptions;
