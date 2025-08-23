import { produce }  from 'immer';

const saveSerialClaimHidden = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.serialClaim = {
      ...draftState.serialClaim,
      show: false,
      allList: [],
      filterList: [],
      payableData: {},
      filterParams: {},
    };
  });

  return { ...nextState };
};

export default saveSerialClaimHidden;
