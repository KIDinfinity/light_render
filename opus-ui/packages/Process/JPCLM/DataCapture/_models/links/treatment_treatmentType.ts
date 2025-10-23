import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default ({ draftState, changedFields, treatmentId }: any) => {
  if (!lodash.has(changedFields, 'treatmentType')) return;
  const medicalProviderValue =
    draftState.claimEntities.treatmentListMap[treatmentId]?.medicalProvider;
  if (changedFields.treatmentType.value === 'IP') {
    changedFields.dateOfConsultation = null;
  }
  if (changedFields.treatmentType.value === 'OP') {
    changedFields.dateOfAdmission = null;
    changedFields.dateOfDischarge = null;
    changedFields.isDischarged = null;
    changedFields.icu = 0;
    changedFields.icuFromDate = null;
    changedFields.icuToDate = null;
    changedFields.medicalProvider = formUtils.queryValue(medicalProviderValue);
  }

  draftState.claimEntities.treatmentListMap[treatmentId] = {
    ...draftState.claimEntities.treatmentListMap[treatmentId],
    ...changedFields,
  };
};
