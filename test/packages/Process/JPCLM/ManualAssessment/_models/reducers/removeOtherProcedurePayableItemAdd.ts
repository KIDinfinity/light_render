import { produce }  from 'immer';


const removeOtherProcedurePayableItemAdd = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;
    draft.otherProcedurePayableItemAdd = {};
  });

  return { ...nextState };
};

export default removeOtherProcedurePayableItemAdd;
