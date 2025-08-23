import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { IncidentCode } from 'claim/pages/Enum';
import { ClaimType } from 'claim/enum';
import { tenant } from '@/components/Tenant';

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

  if (lodash.has(finalChangedFields, 'partOfBodyInjuredArray') && tenant.isMY()) {
    if (lodash.has(finalChangedFields?.partOfBodyInjuredArray, 'value')) {
      finalChangedFields.partOfBodyInjuredArray = {
        ...finalChangedFields.partOfBodyInjuredArray,
        value: [finalChangedFields.partOfBodyInjuredArray.value],
      };
    } else {
      finalChangedFields.partOfBodyInjuredArray = [finalChangedFields.partOfBodyInjuredArray];
    }
  }

  const nextState = produce(state, (draftState: any) => {
    const fieldsArray = Object.entries(changedFields);
    const claimEntities = draftState.claimEntities;
    const causeOfIncident =
      draftState.claimEntities?.incidentListMap?.[incidentId]?.causeOfIncident;
    const claimTypeArr = draftState.claimEntities?.incidentListMap?.[incidentId]?.claimTypeArray;
    const claimTypeArray: any = changedFields?.claimTypeArray?.value;

    const cliamtypeIsIP = claimTypeArray === IncidentCode.InPatient;

    const ClaimTypeMIOrCI = lodash.some(
      claimTypeArray,
      (item) => item === IncidentCode.Mental || item === IncidentCode.Crisis
    );
    if (lodash.has(changedFields, 'expressClaimFlag')) {
      draftState.claimProcessData.expressClaimFlag = formUtils.queryValue(
        changedFields.expressClaimFlag
      );
    }
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
        finalChangedFields = {
          ...finalChangedFields,
          claimTypeArray: {
            ...finalChangedFields.claimTypeArray,
            value: claimTypeArray.split(','),
          },
        };
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
