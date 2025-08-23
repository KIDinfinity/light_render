import { produce }  from 'immer';

const saveShowInsuredList = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { showInsuredList } = action.payload;
    // eslint-disable-next-line no-param-reassign
    draftState.showInsuredList = showInsuredList;
  });
  return { ...nextState };
};

export default saveShowInsuredList;
