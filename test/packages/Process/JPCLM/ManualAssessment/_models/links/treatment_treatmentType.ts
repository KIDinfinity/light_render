import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

export default ({ draftState, changedFields, treatmentId }: any) => {
  if (!lodash.has(changedFields, 'treatmentType') || !changedFields?.treatmentType?.touched) return;
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

  const deletePayableIds = lodash
    .filter(
      draftState.claimEntities.treatmentPayableListMap,
      (payable) =>
        payable.treatmentId === treatmentId &&
        (payable.benefitCategory === eBenefitCategory.Cashless ||
          payable.benefitCategory === eBenefitCategory.LumpSum)
    )
    .map((payable) => ({
      id: payable?.id,
      parentId: payable?.payableId,
      childId: payable?.opTreatmentPayableList,
    }));
  lodash.forEach(deletePayableIds, (item) => {
    draftState.claimEntities.claimPayableListMap[
      item.parentId
    ].treatmentPayableList = lodash.filter(
      draftState.claimEntities.claimPayableListMap[item.parentId].treatmentPayableList,
      (filter) => filter !== item.id
    );
    lodash.forEach(
      item.childId,
      (childId) => delete draftState.claimEntities.opTreatmentPayableListMap[childId]
    );
    delete draftState.claimEntities.treatmentPayableListMap[item.id];
  });

  draftState.claimEntities.treatmentListMap[treatmentId] = {
    ...draftState.claimEntities.treatmentListMap[treatmentId],
    ...changedFields,
  };
};
