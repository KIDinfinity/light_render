import { produce }  from 'immer';
import lodash from 'lodash';
import { ClaimType } from 'claim/enum';
import { formUtils } from 'basic/components/Form';
import { IncidentCode } from 'claim/pages/Enum';

const getServiceItemIdLsit = ({ claimEntities, incidentId }: any) => {
  const map = [
    ['incidentListMap', 'treatmentList'],
    ['treatmentListMap', 'invoiceList'],
    ['invoiceListMap', 'serviceItemList'],
  ];
  let idList = [incidentId];

  lodash.forEach(map, (item: any) => {
    idList = lodash.reduce(
      idList,
      (list: any, id: any) => {
        return [...list, ...(claimEntities?.[item[0]]?.[id]?.[item[1]] || [])];
      },
      []
    );
  });
  return idList;
};

const removeFeeItem = ({ claimEntities, incidentId }: any) => {
  const serviceItemIdLsit = getServiceItemIdLsit({ claimEntities, incidentId });

  lodash.forEach(serviceItemIdLsit, (item) => {
    const { id: serviceItemId, feeItemList } = claimEntities?.serviceItemListMap?.[item];
    claimEntities.serviceItemListMap[serviceItemId].feeItemList = [];

    lodash.forEach(feeItemList, (feeItemId) => {
      delete claimEntities.feeItemListMap[feeItemId];
    });
  });
};

const saveIncidentItem = (state: any, action: any) => {
  const { changedFields, incidentId, validating } = action.payload;
  let finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    const claimEntities = draftState.claimEntities;
    const causeOfIncident =
      draftState.claimEntities?.incidentListMap?.[incidentId]?.causeOfIncident;
    const claimTypeArr = draftState.claimEntities?.incidentListMap?.[incidentId]?.claimTypeArray;
    const claimTypeArray = changedFields?.claimTypeArray?.value;
    const cliamtypeIsIP = claimTypeArray === IncidentCode.InPatient;

    const ClaimTypePAOrCI = lodash.some(
      claimTypeArray,
      (item) => item === IncidentCode.PA || IncidentCode.Crisis
    );

    const fieldsArray = Object.entries(changedFields);
    if (fieldsArray.length === 1) {
      if (
        lodash.has(changedFields, 'claimTypeArray') &&
        claimTypeArray === ClaimType.IPD &&
        formUtils.queryValue(causeOfIncident) === IncidentCode.Illness
      ) {
        finalChangedFields = {
          ...finalChangedFields,
          incidentDate: null,
        };
      }
      if (
        lodash.has(changedFields, 'causeOfIncident') &&
        formUtils.queryValue(changedFields?.causeOfIncident) === IncidentCode.Illness &&
        lodash.includes(formUtils.queryValue(claimTypeArr), ClaimType.IPD)
      ) {
        finalChangedFields = {
          ...finalChangedFields,
          incidentDate: null,
        };
      }
      if (lodash.has(changedFields, 'claimTypeArray')) {
        finalChangedFields = {
          ...finalChangedFields,
          subClaimType: undefined,
        };
      }
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
      if (lodash.has(changedFields, 'hkabRate')) {
        finalChangedFields.isManualHKABRate = changedFields.hkabRate.value;
      }
      const treatmentListMapArray = draftState.claimEntities.treatmentListMap;
      if (lodash.has(changedFields, 'claimTypeArray') && ClaimTypePAOrCI) {
        lodash.map(treatmentListMapArray, (item: any, key) => {
          if (incidentId === item.incidentId) {
            draftState.claimEntities.treatmentListMap[key].treatmentType = IncidentCode.OutPatient;
          }
        });
      }
      if (lodash.has(changedFields, 'claimTypeArray') && !validating && !cliamtypeIsIP) {
        removeFeeItem({ claimEntities, incidentId });
      }
    }

    draftState.claimEntities.incidentListMap[incidentId] = {
      ...state.claimEntities.incidentListMap[incidentId],
      ...finalChangedFields,
    };
  });
  return { ...nextState };
};

export default saveIncidentItem;
