import { produce } from 'immer';
import lodash from 'lodash';
import { TreatmentListitemOfBasicInfoArray } from 'claim/pages/Enum';
import { formUtils } from 'basic/components/Form';
import { filterInvoiceList, getInvoiceNo } from 'claim/pages/utils/handleInvoiceData';

const saveTreatmentItem = (state: any, action: any) => {
  const { changedFields, treatmentId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    const fieldsArray = Object.entries(changedFields);

    if (fieldsArray.length === 1) {
      const medicalProviderValue =
        draftState.claimEntities.treatmentListMap[treatmentId]?.medicalProvider;

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

      if (lodash.has(changedFields, 'medicalProvider')) {
        const isOtherMedicalProvider = lodash.some(
          TreatmentListitemOfBasicInfoArray,
          (item) => item === changedFields.medicalProvider.value
        );
        if (!isOtherMedicalProvider) {
          finalChangedFields.medicalProviderDescription = null;
        }
      }
      draftState.claimEntities.treatmentListMap[treatmentId] = {
        ...state.claimEntities.treatmentListMap[treatmentId],
        ...finalChangedFields,
      };
      if (lodash.has(changedFields, 'dateOfConsultation')) {
        const dateOfConsultation = formUtils.queryValue(changedFields.dateOfConsultation);
        const { invoiceListMap, treatmentListMap } = draftState.claimEntities;
        const invoiceListMapData = formUtils.cleanValidateData(invoiceListMap);

        lodash.map(invoiceListMapData, (item: any, key) => {
          if (treatmentId === item.treatmentId) {
            draftState.claimEntities.invoiceListMap[key].invoiceDate = dateOfConsultation;
          }
        });

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
    }
  });
  return { ...nextState };
};

export default saveTreatmentItem;
