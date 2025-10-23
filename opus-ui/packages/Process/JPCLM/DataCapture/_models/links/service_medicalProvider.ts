import lodash from 'lodash';
import { TreatmentListitemOfBasicInfoArray } from 'claim/pages/Enum';

export default ({ draftState, changedFields, serviceItemId }: any) => {
  if (!lodash.has(changedFields, 'medicalProvider')) return;
  const isOtherMedicalProvider = lodash.some(
    TreatmentListitemOfBasicInfoArray,
    (item) => item === changedFields.medicalProvider.value
  );
  if (!isOtherMedicalProvider) {
    draftState.claimEntities.serviceItemListMap[serviceItemId].medicalProviderDescription = null;
  }
};
