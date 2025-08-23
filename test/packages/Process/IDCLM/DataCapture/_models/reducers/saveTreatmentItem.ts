import { produce }  from 'immer';
import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { MedicalProviderPlace, TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';
import { TreatmentListitemOfBasicInfoArrayHK } from 'claim/pages/Enum/TreatmentItemBasicInfoArr';
import { tenant } from '@/components/Tenant';
import { filterInvoiceList, getInvoiceNo } from 'claim/pages/utils/handleInvoiceData';
import addInvoiceItem from './addInvoiceItem';

const saveTreatmentItem = (state: any, action: any) => {
  const { changedFields, treatmentId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState) => {
    const fieldsArray = Object.entries(changedFields);

    if (fieldsArray.length === 1) {
      const medicalProviderValue =
        draftState.claimEntities.treatmentListMap[treatmentId]?.medicalProvider;
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
        finalChangedFields.roomType = null;
      }
      if (lodash.has(changedFields, 'medicalProvider')) {
        const isOtherMedicalProvider = lodash.some(
          TreatmentListitemOfBasicInfoArrayHK,
          (item) => item === changedFields.medicalProvider.value
        );
        if (!isOtherMedicalProvider) {
          finalChangedFields.medicalProviderDescription = null;
        }
      }

      if (lodash.has(changedFields, 'dateOfConsultation')) {
        const dateOfConsultation = formUtils.queryValue(changedFields?.dateOfConsultation);
        draftState.claimEntities.treatmentListMap[
          treatmentId
        ].dateOfConsultation = dateOfConsultation;
        const { treatmentListMap } = draftState.claimEntities;

        // const invoiceListMapData = formUtils.cleanValidateData(invoiceListMap);
        // lodash.map(invoiceListMapData, (item: any, key) => {
        //   if (treatmentId === item.treatmentId) {
        //     draftState.claimEntities.invoiceListMap[key].invoiceDate = dateOfConsultation;
        //   }
        // });
        if (tenant.isHK()) {
          lodash.map(treatmentListMap, (treatment: any) => {
            const invoiceListMapDataN = formUtils.cleanValidateData(
              draftState.claimEntities.invoiceListMap
            );
            const newInvoiceList = filterInvoiceList(
              invoiceListMapDataN,
              treatment.dateOfConsultation
            );
            lodash.map(newInvoiceList, (item: any, key) => {
              const invoiceNumber = key + 1;
              draftState.claimEntities.invoiceListMap[item.id].invoiceNo = getInvoiceNo(
                invoiceNumber,
                item.invoiceDate
              );
            });
          });
        }
        const invoiceList = draftState.claimEntities.treatmentListMap[treatmentId]?.invoiceList;
        if (lodash.isEmpty(invoiceList)) {
          const changedFields = {
            invoiceDate: dateOfConsultation,
          };
          const draft = addInvoiceItem(draftState, {
            payload: {
              treatmentId,
              changedFields,
            },
          });
          draftState.claimEntities = {
            ...draft?.claimEntities,
          };
        }
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
        // finalChangedFields.medicalProviderPlace = null;
        finalChangedFields.hospitalType = null;
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

    draftState.claimEntities.treatmentListMap[treatmentId] = {
      ...draftState.claimEntities.treatmentListMap[treatmentId],
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};

export default saveTreatmentItem;
