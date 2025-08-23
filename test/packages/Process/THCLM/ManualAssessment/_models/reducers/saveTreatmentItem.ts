import { produce } from 'immer';
import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { MedicalProviderPlace, TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';

const saveTreatmentItem = (state: any, action: any) => {
  const { changedFields, treatmentId } = action.payload;

  const finalChangedFields = { ...changedFields };
  const nextState = produce(state, (draftState) => {
    if (lodash.size(changedFields) === 1) {
      const medicalProviderValue =
        draftState.claimEntities.treatmentListMap[treatmentId].medicalProvider;
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
          finalChangedFields.medicalProvider = formUtils.queryValue(medicalProviderValue);
        }
      }

      if (
        Object.keys(changedFields)
          .join(' ')
          .match(/icuFromDate|icuToDate/)
      ) {
        const icuFromDate = lodash.cloneDeep(
          changedFields?.icuFromDate ||
            draftState.claimEntities.treatmentListMap[treatmentId]?.icuFromDate
        );
        const icuToDate = lodash.cloneDeep(
          changedFields?.icuToDate ||
            draftState.claimEntities.treatmentListMap[treatmentId]?.icuToDate
        );
        const momentIcuFromDate = moment.isMoment(formUtils.queryValue(icuFromDate))
          ? formUtils.queryValue(icuFromDate)
          : moment(formUtils.queryValue(icuFromDate));
        const momentIcuToDate = moment.isMoment(formUtils.queryValue(icuToDate))
          ? formUtils.queryValue(icuToDate)
          : moment(formUtils.queryValue(icuToDate));
        if (icuFromDate && icuToDate && momentIcuToDate?._isValid && momentIcuFromDate?._isValid) {
          const clearIcuFromDate = momentIcuFromDate.hour(0).minute(0).second(0).millisecond(0);
          const clearIcuToDate = momentIcuToDate.hour(24).minute(0).second(0).millisecond(0);
          const duration = clearIcuToDate.diff(clearIcuFromDate, 'days');

          draftState.claimEntities.treatmentListMap[treatmentId] = {
            ...draftState.claimEntities.treatmentListMap[treatmentId],
            icuDays: duration,
          };
        }
      }

      if (lodash.has(changedFields, 'medicalProvider')) {
        finalChangedFields.medicalProviderPlace = null;
        finalChangedFields.hospitalType = null;
      }
      if (lodash.has(changedFields, 'medicalProviderPlace')) {
        if (
          formUtils.queryValue(changedFields.medicalProviderPlace) ===
            MedicalProviderPlace.HongKong ||
          formUtils.queryValue(changedFields.medicalProviderPlace) === MedicalProviderPlace.Macau
        ) {
          finalChangedFields.isHospitalInDevelopedCountry = 1;
        } else {
          finalChangedFields.isHospitalInDevelopedCountry = 0;
        }
      }

      if (lodash.has(changedFields, 'therapiesType')) {
        const therapiesTypeValue = formUtils.queryValue(changedFields.therapiesType);
        if (!!therapiesTypeValue && therapiesTypeValue !== TherapiesTypeEnum.ICU) {
          finalChangedFields.icu = 0;
          finalChangedFields.therapiesType = null;
          finalChangedFields.icuFromDate = null;
          finalChangedFields.icuToDate = null;
          finalChangedFields.icuDays = null;
        }
        if (lodash.isEmpty(therapiesTypeValue)) {
          finalChangedFields.icuFromDate = null;
          finalChangedFields.icuToDate = null;
          finalChangedFields.icuDays = null;
        }
        if (therapiesTypeValue === TherapiesTypeEnum.ICU) {
          finalChangedFields.therapiesType = TherapiesTypeEnum.ICU;
          finalChangedFields.icu = 1;
        }
      }
    }
    draftState.claimEntities.treatmentListMap[treatmentId] = {
      ...draftState.claimEntities.treatmentListMap[treatmentId],
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};

export default saveTreatmentItem;
