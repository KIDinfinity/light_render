import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveIncidentItem = (state: any, action: any) => {
  const { changedFields, incidentId } = action.payload;
  let finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    const fieldsArray = Object.entries(changedFields);
    if (fieldsArray.length === 1) {
      const claimTypeArray: any = changedFields?.claimTypeArray?.value;
      if (lodash.has(changedFields, 'claimTypeArray') && lodash.isString(claimTypeArray)) {
        // TODO:由于后台需要的是数组,所以强制把字符串转为数组(这个操作应该在FormItemSelect组件里面做)
        finalChangedFields = {
          ...finalChangedFields,
          claimTypeArray: {
            ...finalChangedFields.claimTypeArray,
            value: claimTypeArray.split(','),
          },
        };
      }
      if (['OP', 'IP'].includes(claimTypeArray)) {
        const treatmentListMapArray = draftState.claimEntities.treatmentListMap;
        lodash.map(treatmentListMapArray, (item: any, key) => {
          if (incidentId === item.incidentId) {
            // eslint-disable-next-line no-param-reassign
            draftState.claimEntities.treatmentListMap[key].treatmentType = claimTypeArray;
            if (claimTypeArray === 'IP') {
              draftState.claimEntities.treatmentListMap[key].dateOfConsultation = null;
            } else if (claimTypeArray === 'OP') {
              draftState.claimEntities.treatmentListMap[key].dateOfAdmission = null;
              draftState.claimEntities.treatmentListMap[key].dateOfDischarge = null;
              draftState.claimEntities.treatmentListMap[key].icu = 0;
              draftState.claimEntities.treatmentListMap[key].icuFromDate = null;
              draftState.claimEntities.treatmentListMap[key].icuToDate = null;
              const medicalProviderValue =
        draftState.claimEntities.treatmentListMap[key].medicalProvider;
              draftState.claimEntities.treatmentListMap[key].medicalProvider = formUtils.queryValue(medicalProviderValue);
            }
          }
        });
      }
    }
    if (
      changedFields?.trafficAccidentFlag &&
      formUtils.queryValue(changedFields?.trafficAccidentFlag) === 'N'
    ) {
      draftState.claimEntities.incidentListMap[incidentId].isDrinking = 'N';
    }

    draftState.claimEntities.incidentListMap[incidentId] = {
      ...draftState.claimEntities.incidentListMap[incidentId],
      ...finalChangedFields,
    };
  });
  return { ...nextState };
};

export default saveIncidentItem;
