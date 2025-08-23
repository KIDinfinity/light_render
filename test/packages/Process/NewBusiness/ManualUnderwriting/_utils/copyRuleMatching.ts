import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import type { planProductConfig } from '../types';
import BenefitLevelDecision from 'process/NewBusiness/Enum/BenefitLevelDecision.ts';

// coverage和exclusion/loading的信息，用来和rule匹配的
interface matchInfo {
  coverageProductCode: string;
  riderProductCode?: string;
  reasonCode?: string;
}

// 在区分target和source之后最终用来匹配的rule数据
interface matchRule {
  coverageCode: string;
  riderCode?: string;
  reasonCode: string;
}

// 配置的copyRule（字段名有target代表target，没target代表source）
interface copyRule extends matchRule {
  type?: string;
  targetCoverageCode: string;
  targetRiderCode?: string;
  targetReasonCode?: string;
}

// rule的match逻辑
const matchLogic =
  ({ coverageProductCode, riderProductCode, reasonCode }: matchInfo) =>
  (rule: matchRule) => {
    const coverageMatch = rule.coverageCode === '*' || rule.coverageCode === coverageProductCode;
    const riderCodeMatch =
      (!riderProductCode && !rule.riderCode) || rule.riderCode === riderProductCode;
    const reasonCodeMatch = rule.reasonCode === '*' || rule.reasonCode === reasonCode;
    return coverageMatch && riderCodeMatch && reasonCodeMatch;
  };

// 用source loading/exclusion match rule，看哪些rule符合条件
export const matchCopyRule = (
  { coverageProductCode, riderProductCode, reasonCode }: matchInfo,
  copyRules: copyRule[]
) => copyRules.filter(matchLogic({ coverageProductCode, riderProductCode, reasonCode }));

// 用rules match target coverage，看当前coverage是否能match中其中一条rule
// 不会去match targetResonCode，因为目前看来没有意义
export const matchTarget = (
  { coverageProductCode, riderProductCode }: matchInfo,
  copyRules: copyRule[]
) => {
  const targetRule = copyRules.map((rule) => ({
    coverageCode: rule.targetCoverageCode,
    riderCode: rule.targetRiderCode,
    reasonCode: '*',
  }));

  return targetRule.some(matchLogic({ coverageProductCode, riderProductCode }));
};

// 从配置表里算当前的coverageItem是属于coverage还是rider
// 如果是coverage，当前的code就是coverageProductCode。如果是rider，则当前的code是riderProductCode，并根据配置表追踪到的coverage拿到coverageProductCode
// 正常来说，即便是rider，planProductConfig里有且只有一条数据符合条件。
// 如果match不到任何数据，就返回空。如果有多条符合，第一次match中时就会直接返回。
export const getCoverageInfo = (
  productCode: string,
  planProductConfig: planProductConfig
): matchInfo | void => {
  const coverageConfigList = [
    ...planProductConfig.basicPlanProductFeatureList,
    ...planProductConfig.otherPlanProductFeatureList,
  ];
  for (const coverageConfig of coverageConfigList) {
    if (coverageConfig.productCode === productCode) {
      return {
        coverageProductCode: productCode,
      };
    }
    if (coverageConfig.riderCodeList?.some((riderCode) => riderCode === productCode)) {
      return {
        coverageProductCode: coverageConfig.productCode,
        riderProductCode: productCode,
      };
    }
  }
};

export const insuredMatch = (coverageItem, clientList: { clientId: string }[]) =>
  !!lodash.intersectionBy(coverageItem?.coverageInsuredList || [], clientList || [], 'clientId')
    ?.length;

const listKeyMap = ['coverageLoadingList', 'coverageExclusionList'];

export const addCopy = (
  draftState,
  {
    copyItem,
    isLoading,
    coreCode,
    clientId,
  }: { copyItem: any; isLoading: boolean; coreCode: string; clientId: string }
) => {
  const listKey = listKeyMap[isLoading ? 0 : 1];

  const planProductConfig: planProductConfig = draftState.planProductConfig;
  const coverageInfo = getCoverageInfo(coreCode, planProductConfig);
  if (coverageInfo) {
    const matchedRules = matchCopyRule(
      {
        ...coverageInfo,
        reasonCode: copyItem.code,
      },
      draftState.loadingCopyRule || []
    );
    for (const targetCoverageItem of draftState.processData.coverageList) {
      const targetCoverageInfo = getCoverageInfo(
        formUtils.queryValue(targetCoverageItem.coreCode),
        planProductConfig
      );
      const matchedInsured = !clientId || insuredMatch(targetCoverageItem, [{ clientId }]);
      if (targetCoverageInfo && matchTarget(targetCoverageInfo, matchedRules) && matchedInsured) {
        if (!targetCoverageItem[listKey]) targetCoverageItem[listKey] = [];
        const pushObj = {
          ...copyItem,
          id: uuidv4(),
          coverageId: targetCoverageItem.id,
          copyId: copyItem.id,
        };
        if(isLoading)
          pushObj.loadingFunctionType = 'COPY';
        targetCoverageItem[listKey].push(pushObj);
        lodash.set(
          targetCoverageItem,
          `coverageDecision.uwDecision`,
          BenefitLevelDecision.NonStandard
        );
      }
    }
  }
};

export const editCopy = (
  draftState,
  {
    copyItem,
    isLoading,
    coreCode,
    insuredList,
  }: { copyItem: any; isLoading: boolean; coreCode: string; insuredList: { clientId: string }[] }
) => {
  const listKey = listKeyMap[isLoading ? 0 : 1];
  const planProductConfig: planProductConfig = draftState.planProductConfig;
  const coverageInfo = getCoverageInfo(coreCode, planProductConfig);

  if (coverageInfo) {
    const matchedRules = matchCopyRule(
      {
        ...coverageInfo,
        reasonCode: copyItem.code,
      },
      draftState.loadingCopyRule || []
    );
    for (const targetCoverageItem of draftState.processData.coverageList) {
      const targetCoverageInfo = getCoverageInfo(
        formUtils.queryValue(targetCoverageItem.coreCode),
        planProductConfig
      );
      if (!targetCoverageItem[listKey]) {
        targetCoverageItem[listKey] = [];
      }
      const list = targetCoverageItem[listKey];
      const index = list.findIndex((item) => item.copyId === copyItem.id);
      if (
        targetCoverageInfo &&
        matchTarget(targetCoverageInfo, matchedRules) &&
        insuredMatch(targetCoverageItem, insuredList)
      ) {
        // match中，有即覆盖，无即添加
        if (index === -1) {
          const pushObj = {
            ...copyItem,
            id: uuidv4(),
            coverageId: targetCoverageItem.id,
            copyId: copyItem.id,
          };
          if(isLoading)
            pushObj.loadingFunctionType = 'COPY';
          list.push(pushObj);
          lodash.set(
            targetCoverageItem,
            `coverageDecision.uwDecision`,
            BenefitLevelDecision.NonStandard
          );
        } else {
          list[index] = {
            ...list[index],
            ...lodash.omit(copyItem, ['id', 'copyId', 'coverageId', 'loadingFunctionType']),
          };
        }
      } else if (index > -1) {
        // 没match中，有即删除
        list.splice(index, 1);
      }
    }
  }
};
