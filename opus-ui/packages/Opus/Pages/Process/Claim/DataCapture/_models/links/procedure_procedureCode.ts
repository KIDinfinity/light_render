import lodash from 'lodash';

export default ({ draftState, changedFields, procedureId }: any) => {
  if (!lodash.has(changedFields, 'procedureCode')) return;
  const draft = draftState;
  if (changedFields.procedureCode.value !== 'OTHS') {
    draft.claimEntities.procedureListMap[procedureId] = {
      ...draft.claimEntities.procedureListMap[procedureId],
      procedureDescription: null,
    };
  }
};
