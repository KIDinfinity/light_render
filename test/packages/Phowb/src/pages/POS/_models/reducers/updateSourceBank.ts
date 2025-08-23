import { produce }  from 'immer';

const updateSourceBank = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const { payOutOption } = draftState.claimProcessData.posDataDetail;

    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.payOutOption = {
      ...payOutOption,
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default updateSourceBank;
