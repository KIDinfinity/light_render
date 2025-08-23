import { produce }  from 'immer';

const showDrugsDetailList= (state: any, action: any) => {
  const { show,month,idx } = action.payload;

  const newState = produce(state, (draftState: any) => {
    draftState.DrugsDetail.show= show;
    draftState.DrugsDetail.month= month;
    draftState.DrugsDetail.idx=idx
  });
  return { ...newState };
};

export default showDrugsDetailList;
