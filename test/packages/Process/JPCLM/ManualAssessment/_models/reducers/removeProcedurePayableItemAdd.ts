import { produce }  from 'immer';


const removeProcedurePayableItemAdd = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;
    draft.procedurePayableItemAdd = {};
  });

  return { ...nextState };
};

export default removeProcedurePayableItemAdd;
