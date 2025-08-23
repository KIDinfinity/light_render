import { produce } from 'immer';
import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { MedicalProviderPlace, TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';
import { tenant } from '@/components/Tenant';
import { filterInvoiceList, getInvoiceNo } from 'claim/pages/utils/handleInvoiceData';
import addInvoiceItem from './addInvoiceItem';

const saveTreatmentItem = (state: any, action: any) => {
  const { changedFields, treatmentId, incidentId, hospitalType } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    const item = draftState.claimEntities.treatmentListMap[treatmentId] || {};
    const fieldsArray = Object.entries(changedFields);

    if (fieldsArray.length === 1) {
      const medicalProviderValue = item?.medicalProvider;
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
          const incidentId2 = item?.incidentId;
          const includesOp = lodash.includes(
            formUtils.queryValue(
              lodash.get(
                draftState,
                `claimEntities.incidentListMap[${incidentId2}].claimTypeArray`,
                []
              )
            ),
            'OP'
          );
          if (includesOp) {
            finalChangedFields.roomType = 'OU';
          }
        }
      }

      if (lodash.has(changedFields, 'medicalProvider')) {
        if (changedFields.medicalProvider.value !== '999') {
          finalChangedFields.medicalProviderDescription = '';
        }
      }

      if (lodash.has(changedFields, 'dateOfConsultation')) {
        const dateOfConsultation = formUtils.queryValue(changedFields?.dateOfConsultation);
        draftState.claimEntities.treatmentListMap[treatmentId].dateOfConsultation =
          dateOfConsultation;
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

        const invoiceList = item?.invoiceList;
        if (lodash.isEmpty(invoiceList)) {
          const changedFields = {
            invoiceDate: dateOfConsultation,
          };
          const draft = addInvoiceItem(draftState, {
            payload: {
              incidentId,
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
        const medicalProviderPlaceValue = formUtils.queryValue(changedFields.medicalProviderPlace);
        finalChangedFields.isHospitalInDevelopedCountry = lodash.includes(
          [MedicalProviderPlace.HongKong, MedicalProviderPlace.Macau],
          medicalProviderPlaceValue
        )
          ? 1
          : 0;
        finalChangedFields.hospitalType = !!hospitalType
          ? hospitalType
          : !lodash.includes(
                [
                  MedicalProviderPlace.HongKong,
                  MedicalProviderPlace.Macau,
                  MedicalProviderPlace.China,
                ],
                medicalProviderPlaceValue
              ) && formUtils.queryValue(item.medicalProvider) === '999'
            ? 'O'
            : '';

        finalChangedFields.medicalProviderDescription = '';
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
      if (
        lodash.has(changedFields, 'medicalProviderPlace') ||
        lodash.has(changedFields, 'hospitalType') ||
        lodash.has(changedFields, 'medicalProvider')
      ) {
        const {
          medicalProviderPlace,
          medicalProvider,
          hospitalType: oldHospitalType,
        }: any = formUtils.cleanValidateData({ ...item, ...finalChangedFields });
        finalChangedFields.doctor =
          medicalProvider === '999' && medicalProviderPlace === 'CN'
            ? 'MAINLAND DOCTOR'
            : oldHospitalType === 'G'
              ? 'HA'
              : '';
      }
    }

    const dateOfDischarge = lodash.cloneDeep(item?.dateOfDischarge);

    if (lodash.has(changedFields, 'dateOfAdmission') && !formUtils.queryValue(dateOfDischarge)) {
      draftState.claimEntities.treatmentListMap[treatmentId] = {
        ...draftState.claimEntities.treatmentListMap[treatmentId],
        dateOfDischarge: changedFields.dateOfAdmission,
      };
    }

    if (
      Object.keys(changedFields)
        .join(' ')
        .match(/icuFromDate|icuToDate/)
    ) {
      const icuFromDate = lodash.cloneDeep(changedFields?.icuFromDate || item?.icuFromDate);

      const icuToDate = lodash.cloneDeep(changedFields?.icuToDate || item?.icuToDate);
      const momentIcuFromDate = moment.isMoment(formUtils.queryValue(icuFromDate))
        ? formUtils.queryValue(icuFromDate)
        : moment(formUtils.queryValue(icuFromDate));
      const momentIcuToDate = moment.isMoment(formUtils.queryValue(icuToDate))
        ? formUtils.queryValue(icuToDate)
        : moment(formUtils.queryValue(icuToDate));
      if (icuFromDate && icuToDate && momentIcuToDate?._isValid && momentIcuFromDate?._isValid) {
        const clearIcuFromDate = momentIcuFromDate.hour(0).minute(0).second(0).millisecond(0);
        const clearIcuToDate = momentIcuToDate.hour(0).minute(0).second(0).millisecond(0);
        const duration = clearIcuToDate.diff(clearIcuFromDate, 'days');

        draftState.claimEntities.treatmentListMap[treatmentId] = {
          ...item,
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
