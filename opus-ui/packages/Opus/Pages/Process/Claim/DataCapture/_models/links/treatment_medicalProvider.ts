import lodash from 'lodash';
import { TreatmentListitemOfBasicInfoArray } from 'claim/pages/Enum';

export default ({ draftState, changedFields, treatmentId }: any) => {
  if (!lodash.has(changedFields, 'medicalProvider')) return;
  const isOtherMedicalProvider = lodash.some(
    TreatmentListitemOfBasicInfoArray,
    (item) => item === changedFields.medicalProvider.value
  );
  if (!isOtherMedicalProvider) {
    draftState.claimEntities.treatmentListMap[treatmentId].medicalProviderDescription = null;
  }
};
