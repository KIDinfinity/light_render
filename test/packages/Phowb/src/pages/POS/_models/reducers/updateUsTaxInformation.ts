import { produce }  from 'immer';

const updateUsTaxInformation = (state: any, action: any) => {
  const { usTaxDeclarations } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.usTaxDeclarations = usTaxDeclarations;
  });
  return { ...nextState };
};

export default updateUsTaxInformation;
