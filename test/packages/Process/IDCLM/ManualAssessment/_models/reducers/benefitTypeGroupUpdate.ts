import lodash from 'lodash';
import { produce }  from 'immer';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { sumDecision } from '../functions/utils';
import benefitTypeGroupDelete from './benefitTypeGroupDelete';

const map = {
  [eBenefitCategory.Cashless]: 'treatmentPayableListMap',
  [eBenefitCategory.Aipa]: 'accidentBenefitPayableListMap',
  [eBenefitCategory.Reimbursement]: 'serviceItemPayableListMap',
  defalut: 'claimPayableListMap',
};

const treatmentMap = {
  parentId: 'payableId',
  parentMap: 'claimPayableListMap',
  childList: 'treatmentPayableList',
  childMap: 'treatmentPayableListMap',
};

const invoiceMap = {
  parentId: 'treatmentPayableId',
  parentMap: 'treatmentPayableListMap',
  childList: 'invoicePayableList',
  childMap: 'invoicePayableListMap',
};

const serviceMap = {
  parentId: 'invoicePayableId',
  parentMap: 'invoicePayableListMap',
  childList: 'serviceItemPayableList',
  childMap: 'serviceItemPayableListMap',
};

const accidentBenefitMap = {
  parentId: 'treatmentPayableId',
  parentMap: 'treatmentPayableListMap',
  childList: 'accidentBenefitPayableList',
  childMap: 'accidentBenefitPayableListMap',
};

const doopMap = {
  [eBenefitCategory.Cashless]: [treatmentMap],
  [eBenefitCategory.Aipa]: [accidentBenefitMap, treatmentMap],
  [eBenefitCategory.Reimbursement]: [serviceMap, invoiceMap, treatmentMap],
  defalut: [],
};

const doopFn = ({ item, draftState, changedFields, extra, benefitCategory }: any) => {
  const key = map?.[benefitCategory];
  if (!key) return;
  draftState.claimEntities[key][item?.id] = {
    ...draftState.claimEntities?.[key]?.[item?.id],
    ...changedFields,
    ...extra,
  };
};

const benefitTypeGroupUpdate = (state: any, { payload }: any) => {
  const { benefitTypeData, changedFields, validating } = payload;
  const nextState = produce(state, (draftState) => {
    const { groupBy, boosters, children, benefitCategory } = benefitTypeData;
    let extra: any = {};
    if (lodash.has(changedFields, 'claimDecision') && !validating) {
      const { value } = changedFields.claimDecision;
      if (value === 'D' || value === 'N') {
        extra = {
          systemCalculationAmount: 0,
          assessorOverrideAmount: 0,
          payableAmount: 0,
          exchangeRatePolicyPayout: 0,
          payableDays: 0,
        };
      }
      if (value !== 'D' && value !== 'P') {
        extra.denyCode = '';
        extra.denyReason = '';
      }
      if (value !== 'E') {
        extra.exGratiaCode = '';
        extra.exGratiaReason = '';
      }
    }
    const pickMap = [
      'claimDecision',
      'benefitTypeCode',
      'denyReason',
      'denyCode',
      'remark',
      'exGratiaCode',
      'exGratiaReason',
    ];
    const listPolicy = draftState?.listPolicy;
    const boosterPickMap = [
      'claimDecision',
      'denyReason',
      'denyCode',
      'remark',
      'exGratiaCode',
      'exGratiaReason',
    ];

    lodash.forEach(groupBy, (item) => {
      const { id } = item;

      if (lodash.has(changedFields, 'benefitTypeCode') && lodash.size(changedFields) === 1) {
        const curBenefitCategory = lodash.find(listPolicy, {
          benefitTypeCode: changedFields.benefitTypeCode.value,
          policyNo: item?.policyNo,
        });
        draftState.claimEntities.claimPayableListMap[id] = {
          ...draftState.claimEntities?.claimPayableListMap?.[id],
          benefitCategory: curBenefitCategory?.benefitCategory,
          productCode: curBenefitCategory?.coreProductCode,
          coverageKey: curBenefitCategory?.coverageKey,
          productPlan: curBenefitCategory?.productPlan,
          policyCurrency: curBenefitCategory?.policyCurrency,
        };
      }

      draftState.claimEntities.claimPayableListMap[id] = {
        ...draftState.claimEntities?.claimPayableListMap?.[id],
        ...lodash.pick(changedFields, pickMap),
        ...extra,
      };
    });

    const boosterClaimpayableId = lodash
      .chain(boosters)
      .map((item) => item?.payableId)
      .uniq()
      .value();

    lodash.forEach(boosterClaimpayableId, (id) => {
      draftState.claimEntities.claimPayableListMap[id] = {
        ...draftState.claimEntities?.claimPayableListMap?.[id],
        ...lodash.pick(changedFields, boosterPickMap),
        ...extra,
      };
    });

    if (lodash.has(changedFields, 'claimDecision') && !validating) {
      lodash.forEach(children, (item) => {
        doopFn({ item, draftState, changedFields, benefitCategory, extra });
      });
      lodash.forEach(boosters, (item) => {
        doopFn({ item, draftState, changedFields, benefitCategory, extra });
      });

      draftState.claimProcessData.claimDecision = {
        ...draftState?.claimProcessData?.claimDecision,
        assessmentDecision: sumDecision(draftState?.claimEntities?.claimPayableListMap),
      };
    }
  });
  let newState = { ...nextState };
  if (lodash.has(changedFields, 'benefitTypeCode') && !validating) {
    newState = benefitTypeGroupDelete(newState, {
      payload: {
        groupBy: benefitTypeData?.groupBy,
        boosters: benefitTypeData?.boosters,
        benefitCategory: benefitTypeData?.benefitCategory,
      },
    });
  }
  return { ...newState };
};

export default benefitTypeGroupUpdate;
