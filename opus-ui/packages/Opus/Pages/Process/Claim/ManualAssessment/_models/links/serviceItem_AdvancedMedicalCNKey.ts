import lodash from 'lodash';

export default ({ draftState, changedFields, serviceItemId }: any) => {
  if (!lodash.has(changedFields, 'advancedMedicalCNKey')) return;

  draftState.claimEntities.serviceItemListMap[serviceItemId] = {
    ...draftState.claimEntities.serviceItemListMap[serviceItemId],
    medicalProvider: null,
    medicalProviderExpireDate: null,
    medicalProviderEffectiveDate: null,
  };
};
