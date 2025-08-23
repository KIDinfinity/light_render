import { produce }  from 'immer';

const saveInsuredList = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { insuredList } = action.payload;
    // eslint-disable-next-line no-param-reassign
    draftState.insuredList = insuredList;
  });
  return { ...nextState };
};

export default saveInsuredList;
