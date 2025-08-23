import { produce }  from 'immer';

const updateRefund = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.refund = {
      ...draftState.claimProcessData.posDataDetail.refund,
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default updateRefund;
