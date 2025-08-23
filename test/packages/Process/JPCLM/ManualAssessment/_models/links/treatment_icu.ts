import lodash from 'lodash';

export default ({ draftState, changedFields, treatmentId }: any) => {
  if (lodash.has(changedFields, 'icu')) {
    changedFields.icuFromDate = null;
    changedFields.icuToDate = null;

    draftState.claimEntities.treatmentListMap[treatmentId] = {
      ...draftState.claimEntities.treatmentListMap[treatmentId],
      ...changedFields,
    };
  }
};
