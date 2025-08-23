import { produce }  from 'immer';

const updateUsTaxDeclarations = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.usTaxDeclarations = {
      ...draftState.claimProcessData.posDataDetail.usTaxDeclarations,
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default updateUsTaxDeclarations;
