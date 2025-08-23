import lodash from 'lodash';
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { Booster } from 'claim/enum/Booster';
import { sumDecision } from '../functions/utils';
import { doopMapPayableKey } from 'process/Utils';
import payableSeriesDelete from './payableSeriesDelete';
import { splitBenefitTypeCode, getPolicyForBenefitItemList } from 'basic/utils/PolicyUtils';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

// 各层级payable修改claimDecision字段
const setData = ({ index, parentId, draftState, benefitCategory, value, itemExtra }: any) => {
  if (parentId) {
    const { mapKey, parentKey, listKey } = doopMapPayableKey({ benefitCategory })[index];
    const list = draftState.claimEntities[parentKey]?.[parentId]?.[listKey];
    lodash.forEach(list, (id) => {
      // eslint-disable-next-line no-param-reassign
      draftState.claimEntities[mapKey][id].claimDecision = value;
      if (!lodash.isEmpty(doopMapPayableKey({ benefitCategory })[index - 1])) {
        setData({ index: index - 1, parentId: id, draftState, benefitCategory, value, itemExtra });
      } else {
        draftState.claimEntities[mapKey][id] = {
          ...(draftState.claimEntities?.[mapKey]?.[id] || {}),
          ...itemExtra,
        };
      }
    });
  }
};

const totalBenefitTypeBasicUpdate = (state: any, { payload }: any) => {
  const { changedFields, validating, id, boosterId } = payload;
  const pid = lodash.compact([id, ...(boosterId || [])]);

  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData.showRegisterAlert = true;
    const tempClaimPayableItem = draftState.claimEntities?.claimPayableListMap?.[id];
    const { claimDecision, benefitCategory, policyNo } =
      formUtils.cleanValidateData(tempClaimPayableItem);

    const pickMap = [
      'claimDecision',
      'denyReason',
      'denyCode',
      'remark',
      'exGratiaCode',
      'exGratiaReason',
      'policyYear',
      'holiday',
      'contestableClaim',
      'beyondNEL',
      'redFlag',
      'denyWithRescissionCheck',
      'refundBasis',
      'claimModule',
    ];

    let extra: any = {};

    if (lodash.has(changedFields, 'claimDecision') && !validating) {
      const value = formUtils.queryValue(changedFields.claimDecision);
      let itemExtra: any = {};
      if (
        !['D', 'N'].includes(formUtils.queryValue(claimDecision)) &&
        (value === 'D' || value === 'N')
      ) {
        itemExtra = {
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

      if (benefitCategory === eBenefitCategory.Life) {
        draftState.claimEntities.claimPayableListMap[id].lifePayable = {
          ...draftState.claimEntities.claimPayableListMap[id].lifePayable,
          claimDecision: value,
          ...itemExtra,
        };
      } else {
        lodash.forEach(pid, (parentId) =>
          setData({
            index: lodash.size(doopMapPayableKey({ benefitCategory })) - 2,
            parentId,
            draftState,
            benefitCategory,
            value,
            itemExtra,
          })
        );
      }
    }

    if (lodash.has(changedFields, 'oldBenefitTypeCode') && lodash.size(changedFields) === 1) {
      const { benefitTypeCode, coverageKey } = splitBenefitTypeCode(
        changedFields.oldBenefitTypeCode.value
      );

      const benefitItemList = getPolicyForBenefitItemList({
        listPolicy: draftState?.listPolicy,
        policyNo,
        benefitTypeCode,
        coverageKey,
      });
      extra = { ...extra, benefitTypeCode, coverageKey };

      const firstBenefitItem = benefitItemList?.[0];

      draftState.claimEntities.claimPayableListMap[id] = {
        ...draftState.claimEntities?.claimPayableListMap?.[id],
        benefitCategory: firstBenefitItem?.benefitCategory,
        productCode: firstBenefitItem?.coreProductCode,
        coverageKey: firstBenefitItem?.coverageKey,
        productPlan: firstBenefitItem?.productPlan,
        policyCurrency: firstBenefitItem?.policyCurrency,
        systemCalculationAmount: 0,
        assessorOverrideAmount: 0,
        payableAmount: 0,
        exchangeRatePolicyPayout: 0,
        payableDays: 0,
      };
    }

    if (lodash.has(changedFields, 'denyWithRescissionCheck') && lodash.size(changedFields) === 1) {
      const isNotCheck = formUtils.queryValue(changedFields.denyWithRescissionCheck) === 0;
      if (isNotCheck) {
        extra.refundBasis = '';
      }
    }

    lodash.forEach(pid, (targetId) => {
      const item = draftState.claimEntities?.claimPayableListMap?.[targetId];
      draftState.claimEntities.claimPayableListMap[targetId] = {
        ...item,
        ...lodash.pick(
          changedFields,
          item.booster !== 'Y' ? [...pickMap, 'benefitTypeCode'] : pickMap
        ),
        ...extra,
      };
    });

    // 这里要等claimPayableListMap的值改变后再改变claimDecision的值
    if (lodash.has(changedFields, 'claimDecision') && !validating) {
      draftState.claimProcessData.claimDecision = {
        ...draftState?.claimProcessData?.claimDecision,
        assessmentDecision: sumDecision(
          lodash.filter(
            draftState?.claimEntities?.claimPayableListMap,
            (item) =>
              (item?.booster !== Booster.Yes || item?.isStandaloneBooster === Booster.Yes) &&
              (!draftState.claimProcessData.appeal || item.isNewPayable || item.isPayableAdjusted)
          )
        ),
      };
    }
  });

  let newState: any = { ...nextState };
  if (lodash.has(changedFields, 'benefitTypeCode') && !validating) {
    const benefitCategory = state.claimEntities?.claimPayableListMap?.[id]?.benefitCategory;
    newState = payableSeriesDelete(newState, {
      payload: {
        deleteId: pid,
        benefitCategory,
        saveId: id,
      },
    });
  }

  return { ...newState };
};

export default totalBenefitTypeBasicUpdate;
