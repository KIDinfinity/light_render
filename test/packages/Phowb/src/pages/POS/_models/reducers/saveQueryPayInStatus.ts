import { produce }  from 'immer';

const saveQueryPayInStatus = (state: any, action: any) => {
  const { payInStatus } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.requestForIssuanceOfDuplicatePolicy = {
      ...draftState.claimProcessData.posDataDetail.requestForIssuanceOfDuplicatePolicy,
      payInStatus,
    };
  });
  return { ...nextState };
};

export default saveQueryPayInStatus;
