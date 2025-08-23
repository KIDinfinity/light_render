import { produce }  from 'immer';

const saveOtherProcedurePayableItem = (state: any, action: any) => {
  const { otherProcedurePayableId, changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;

    draft.claimEntities.otherProcedurePayableListMap[otherProcedurePayableId] = {
      ...(draft.claimEntities?.otherProcedurePayableListMap?.[otherProcedurePayableId] || {}),
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveOtherProcedurePayableItem;
