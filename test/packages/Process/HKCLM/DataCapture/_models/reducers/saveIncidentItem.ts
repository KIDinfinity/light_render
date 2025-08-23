import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { IncidentCode } from 'claim/pages/Enum';
import { ClaimType } from 'claim/enum';
import addTreatmentItem from './addTreatmentItem';

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
  const { changedFields, incidentId, validating, skipAutoChangeField } = action.payload;
  let finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    const fieldsArray = Object.entries(changedFields);
    const claimEntities = draftState.claimEntities;
    const treatmentList = draftState.claimEntities?.incidentListMap?.[incidentId]?.treatmentList;
    const causeOfIncident =
      draftState.claimEntities?.incidentListMap?.[incidentId]?.causeOfIncident;
    const claimTypeArr = draftState.claimEntities?.incidentListMap?.[incidentId]?.claimTypeArray;
    const claimTypeArray: any = changedFields?.claimTypeArray?.value;

    const cliamtypeIsIP = claimTypeArray === IncidentCode.InPatient;

    const ClaimTypeMIOrCI = lodash.some(
      claimTypeArray,
      (item) => item === IncidentCode.Mental || IncidentCode.Crisis
    );

    if (fieldsArray.length === 1 && !skipAutoChangeField) {
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

      const treatmentListMapArray = draftState.claimEntities.treatmentListMap;
      if (lodash.has(changedFields, 'claimTypeArray') && ClaimTypeMIOrCI) {
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

    if (lodash.has(changedFields, 'claimTypeArray') && lodash.isString(claimTypeArray)) {
      finalChangedFields = {
        ...finalChangedFields,
        claimTypeArray: {
          ...finalChangedFields.claimTypeArray,
          value: claimTypeArray.split(','),
        },
      };
    }

    draftState.claimEntities.incidentListMap[incidentId] = {
      ...state.claimEntities.incidentListMap[incidentId],
      ...finalChangedFields,
    };

    if (
      fieldsArray.length === 1 &&
      lodash.has(changedFields, 'claimTypeArray') &&
      ClaimTypeMIOrCI &&
      lodash.isEmpty(treatmentList)
    ) {
      const draft = lodash.cloneDeep(
        addTreatmentItem(draftState, {
          payload: {
            incidentId,
            changedValues: { treatmentType: IncidentCode.OutPatient },
          },
        })
      );
      draftState.claimEntities = {
        ...draft?.claimEntities,
      };
    }
  });

  return { ...nextState };
};

export default saveIncidentItem;
