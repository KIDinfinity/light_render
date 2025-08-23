import { produce } from 'immer';
import lodash from 'lodash';
import moment from 'moment';
import { ClaimType } from 'claim/enum';
import { formUtils } from 'basic/components/Form';
import { IncidentCode } from 'claim/pages/Enum';
import { getPolicyItem } from 'basic/utils/PolicyUtils';
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

  const nextState = produce(state, (draftState: any) => {
    const claimEntities = draftState.claimEntities;
    const causeOfIncident =
      draftState.claimEntities?.incidentListMap?.[incidentId]?.causeOfIncident;
    const claimTypeArr = draftState.claimEntities?.incidentListMap?.[incidentId]?.claimTypeArray;
    const claimTypeArray = changedFields?.claimTypeArray?.value;
    const cliamtypeIsIP = claimTypeArray === IncidentCode.InPatient;

    const fieldsArray = Object.entries(changedFields);
    let finalChangedFields = { ...changedFields };
    if (fieldsArray.length === 1) {
      if (lodash.has(finalChangedFields, 'partOfBodyInjuredArray') && tenant.isMY()) {
        console.log('我进来了change---', finalChangedFields.partOfBodyInjuredArray);
        if (lodash.has(finalChangedFields?.partOfBodyInjuredArray, 'value')) {
          finalChangedFields.partOfBodyInjuredArray = {
            ...finalChangedFields.partOfBodyInjuredArray,
            value: [finalChangedFields.partOfBodyInjuredArray.value],
          };
        } else {
          console.log('我进来了change---', finalChangedFields.partOfBodyInjuredArray);
          finalChangedFields.partOfBodyInjuredArray = [finalChangedFields.partOfBodyInjuredArray];
        }
      }

      if (lodash.has(changedFields, 'expressClaimFlag')) {
        draftState.claimProcessData.expressClaimFlag = formUtils.queryValue(
          changedFields.expressClaimFlag
        );
      }

      if (
        lodash.has(changedFields, 'dateTimeOfDeath') &&
        formUtils.queryValue(changedFields.dateTimeOfDeath) !==
          formUtils.queryValue(
            draftState.claimEntities?.incidentListMap?.[incidentId]?.dateTimeOfDeath
          )
      ) {
        draftState.claimProcessData.showRegisterAlert = true;
      }
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

      if (lodash.has(changedFields, 'claimTypeArray') && !validating && !cliamtypeIsIP) {
        removeFeeItem({ claimEntities, incidentId });
      }

      if (lodash.has(changedFields, 'incidentDate')) {
        const incidentDate = formUtils.queryValue(changedFields.incidentDate);

        for (const key of draftState.claimProcessData.claimPayableList) {
          const claimPayable = draftState.claimEntities.claimPayableListMap[key];
          const policyItem = getPolicyItem({
            listPolicy: draftState.listPolicy,
            ...lodash.pick(claimPayable, [
              'policyNo',
              'benefitItemCode',
              'coreProductCode',
              'productPlan',
              'benefitCategory',
              'policyYear',
            ]),
          });
          const issueEffectiveDate = policyItem?.issueEffectiveDate;
          if (issueEffectiveDate) {
            const lateTwoYear = !incidentDate
              ? true
              : moment(formUtils.queryValue(incidentDate)).diff(
                  moment(issueEffectiveDate),
                  'years'
                ) < 2;
            claimPayable.contestableClaim = lateTwoYear;
          }
        }
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
