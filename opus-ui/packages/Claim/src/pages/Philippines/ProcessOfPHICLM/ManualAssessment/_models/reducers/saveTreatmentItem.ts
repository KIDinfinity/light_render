import { produce } from 'immer';
import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { BenefitCategory } from 'claim/pages/utils/claim';

const saveTreatmentItem = (state: any, action: any) => {
  const { changedFields, treatmentId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    const { claimEntities } = draftState;
    const { treatmentPayableListMap } = claimEntities;
    const editStatus = lodash.keys(changedFields).length === 1;

    if (
      lodash.has(changedFields, 'icu') &&
      lodash.isBoolean(formUtils.queryValue(changedFields.icu))
    ) {
      finalChangedFields.icu = changedFields.icu.value ? 1 : 0;
      finalChangedFields.icuFromDate = null;
      finalChangedFields.icuToDate = null;
    }
    if (lodash.has(changedFields, 'treatmentType')) {
      if (changedFields.treatmentType.value === 'IP') {
        finalChangedFields.dateOfConsultation = null;
      } else if (changedFields.treatmentType.value === 'OP') {
        finalChangedFields.dateOfAdmission = null;
        finalChangedFields.dateOfDischarge = null;
        finalChangedFields.icu = 0;
        finalChangedFields.icuFromDate = null;
        finalChangedFields.icuToDate = null;
      }
    }

    const hasDischarge = lodash.has(changedFields, 'dateOfDischarge');
    const hasAdmission = lodash.has(changedFields, 'dateOfAdmission');

    //对于C类型的benefit，当payable days没有经过用户调整时，自动根据discharge date和admission date进行计算
    if (editStatus && (hasDischarge || hasAdmission)) {
      lodash.forEach(treatmentPayableListMap, (treatmentPayable: any) => {
        const { payableId } = treatmentPayable;
        const claimPayableItem = claimEntities.claimPayableListMap[payableId];
        if (
          formUtils.queryValue(claimPayableItem.benefitCategory) === BenefitCategory.cashless &&
          treatmentPayable?.treatmentId === treatmentId
        ) {
          const treatment = claimEntities.treatmentListMap[treatmentId];
          const { dateOfAdmission, dateOfDischarge } = treatment;
          const dateDischargeVal = hasDischarge
            ? formUtils.queryValue(changedFields?.dateOfDischarge)
            : formUtils.queryValue(dateOfDischarge);
          const dateAdmissionVal = hasAdmission
            ? formUtils.queryValue(changedFields?.dateOfAdmission)
            : formUtils.queryValue(dateOfAdmission);

          if (
            dateDischargeVal &&
            moment(dateDischargeVal).isValid() &&
            dateAdmissionVal &&
            moment(dateAdmissionVal).isValid()
          ) {
            const dateDischarge = moment(dateDischargeVal).dayOfYear();
            const dateAdmission = moment(dateAdmissionVal).dayOfYear();
            treatmentPayable.payableDays = dateDischarge - dateAdmission + 1;
          }
        }
      });
    }

    draftState.claimEntities.treatmentListMap[treatmentId] = {
      ...state.claimEntities.treatmentListMap[treatmentId],
      ...finalChangedFields,
    };
  });
  return { ...nextState };
};

export default saveTreatmentItem;
