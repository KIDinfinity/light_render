import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
interface CoverageItem {
  productType: string;
  isMain: string;
}

type FundType = {
  id: string;
  fundName?: string;
  fundCode: string;
  fundCurrency: string;
  fundAllocation?: number;
  epaAllocation?: number;
  adHocTopUpAllocation?: number;
  tpaRcdAllocation?: number;
  tpaAllocation?: number;
};
type TotalAllocations = {
  fundAllocation?: number;
  epaAllocation?: number;
  adHocTopUpAllocation?: number;
  tpaRcdAllocation?: number;
  tpaAllocation?: number;
};

export const getAllocationVisibleCondition = (
  coverageList: CoverageItem[],
  fundInfoList: any[],
  config: any[]
) => {
  let fundAllocationConfigVisible = false;
  let tpaAllocationConfigVisible = false;
  let tpaRcdAllocationConfigVisible = false;
  let epaAllocationConfigVisible = false;
  let adHocTopUpAllocationConfigVisible = false;
  lodash.forEach(config, (c) => {
    const fieldName = c.field;
    const visible = c['field-props'].visible;
    if (visible !== 'N' && fieldName === 'fundAllocation') {
      fundAllocationConfigVisible = true;
    }
    if (visible !== 'N' && fieldName === 'tpaAllocation') {
      tpaAllocationConfigVisible = true;
    }
    if (visible !== 'N' && fieldName === 'tpaRcdAllocation') {
      tpaRcdAllocationConfigVisible = true;
    }
    if (visible !== 'N' && fieldName === 'epaAllocation') {
      epaAllocationConfigVisible = true;
    }
    if (visible !== 'N' && fieldName === 'adHocTopUpAllocation') {
      adHocTopUpAllocationConfigVisible = true;
    }
  });
  return {
    fundAllocation:
      lodash.some(coverageList, (item) => formUtils.queryValue(item.productType) === 'ILP') &&
      fundAllocationConfigVisible,
    tpaAllocation:
      lodash.some(
        fundInfoList,
        (item) => !lodash.isNil(formUtils.queryValue(item.tpaAllocation))
      ) && tpaAllocationConfigVisible,
    tpaRcdAllocation:
      lodash.some(fundInfoList, (item) => formUtils.queryValue(item.fundCode) === 'VI07') &&
      tpaRcdAllocationConfigVisible,
    epaAllocation:
      lodash.some(coverageList, (item) => formUtils.queryValue(item.productType) === 'RT') &&
      epaAllocationConfigVisible,
    adHocTopUpAllocation:
      lodash.some(coverageList, (item) => formUtils.queryValue(item.productType) === 'AT') &&
      adHocTopUpAllocationConfigVisible,
  } as Record<string, boolean>;
};
export const getAllocationSum = (
  fundList: FundType[],
  visibleConditions: Record<string, boolean>
) => {
  const sumAllocation = (pre: any, nxt: any) => {
    return Number(formUtils.queryValue(pre) || 0) + Number(formUtils.queryValue(nxt) || 0);
  };
  return fundList.reduce<TotalAllocations>((pre, nxt) => {
    const temResult: TotalAllocations = { ...pre };
    if (visibleConditions.fundAllocation) {
      temResult.fundAllocation = sumAllocation(temResult?.fundAllocation, nxt?.fundAllocation);
    }

    if (visibleConditions.epaAllocation) {
      temResult.epaAllocation = sumAllocation(temResult?.epaAllocation, nxt?.epaAllocation);
    }
    if (visibleConditions.adHocTopUpAllocation) {
      temResult.adHocTopUpAllocation = sumAllocation(
        temResult?.adHocTopUpAllocation,
        nxt?.adHocTopUpAllocation
      );
    }
    if (visibleConditions.tpaRcdAllocation) {
      temResult.tpaRcdAllocation = sumAllocation(
        temResult?.tpaRcdAllocation,
        nxt?.tpaRcdAllocation
      );
    }
    if (visibleConditions.tpaAllocation) {
      temResult.tpaAllocation = sumAllocation(temResult?.tpaAllocation, nxt?.tpaAllocation);
    }

    return {
      ...pre,
      ...temResult,
    };
  }, {});
};
function calSingleAllocation(defaultAllocationPercentage: any, coverage: any): any {
  let allocation = {};
  if (formUtils.queryValue(coverage?.isMain) === 'Y') {
    allocation = { fundAllocation: defaultAllocationPercentage };
  } else if (formUtils.queryValue(coverage?.productType) === 'RT') {
    allocation = { epaAllocation: defaultAllocationPercentage };
  } else if (formUtils.queryValue(coverage?.productType) === 'AT') {
    allocation = { adHocTopUpAllocation: defaultAllocationPercentage };
  }
  return allocation;
}
export const calAllocations = (cfgItem: any, portfolioType: string, coverageList: any[]) => {
  const planFundCfgs = lodash.filter(
    cfgItem.cfgPlanFundBOS,
    (cfg) => cfg.portfolioType === portfolioType
  );
  const allocations = lodash.reduce(
    planFundCfgs,
    (allocationProps: any, planFundCfg) => {
      const { defaultAllocationPercentage } = planFundCfg || {};
      const coverage = lodash.find(coverageList, (coverageItem: any) => {
        return formUtils.queryValue(coverageItem.coreCode) === planFundCfg.productCode;
      });
      const allocation = calSingleAllocation(defaultAllocationPercentage, coverage);
      return { ...allocationProps, ...allocation };
    },
    {}
  );
  return allocations;
};
export const getAutoAttachFunds = (
  fundCfgList: Record<string, any>,
  portfolioType: any,
  coverages: any[]
) => {
  const result: Record<string, any> = {};
  lodash.forIn(fundCfgList, (cfgItem, key) => {
    const allocations = calAllocations(cfgItem, portfolioType, coverages);
    result[key] = {
      id: key,
      fundCurrency: cfgItem.fundCurrency,
      fundCode: cfgItem.fundCode,
      ...allocations,
    };
  });
  return result;
};
export const getFundDefaultAllocation = (productConfig: any, portfolioType: any) => {
  return lodash.find(
    productConfig?.cfgPlanFundBOS,
    (cfg) => cfg.portfolioType === formUtils.queryValue(portfolioType)
  )?.defaultAllocationPercentage as number | void;
};
export const getFundAllocationEditable = (productConfig: any, portfolioType: any) => {
  const allocationConfig = lodash.find(
    productConfig?.cfgPlanFundBOS,
    (cfg) => cfg.portfolioType === formUtils.queryValue(portfolioType)
  );
  return (
    !allocationConfig ||
    allocationConfig?.maxAllocationPercentage !== allocationConfig?.minAllocationPercentage
  );
};
export const getFundWithDefaultAllocations =
  ({
    productConfigList,
    portfolioType,
    visibleConditions,
  }: {
    productConfigList: any;
    portfolioType: any;
    visibleConditions: any;
  }) =>
  (fund: FundType) => {
    const { fundCode } = fund;
    const productConfig = productConfigList[fundCode];
    const defaultAllocation = getFundDefaultAllocation(productConfig, portfolioType);
    const canEditable = getFundAllocationEditable(productConfig, portfolioType);
    const tempFund = { ...fund };
    if (defaultAllocation) {
      if (visibleConditions.fundAllocation && !canEditable) {
        tempFund.fundAllocation = defaultAllocation;
      }
      if (visibleConditions.epaAllocation && !canEditable) {
        tempFund.epaAllocation = defaultAllocation;
      }
      if (visibleConditions.adHocTopUpAllocation && !canEditable) {
        tempFund.adHocTopUpAllocation = defaultAllocation;
      }
    }
    return tempFund;
  };
export const getFundWithFundName = (fundConfigList: any) => (fund: any) => {
  const { fundCode } = fund;
  const fundName = fund?.fundName || fundConfigList?.[fundCode]?.fundName || '';
  return { ...fund, fundName };
};
export const getValidatedTotalData = (totalFund: any) => {
  const validatedTotalData = {};
  const errorMessage = formatMessageApi({ Label_COM_Message: 'MSG_000559' });
  for (const key in totalFund) {
    if (Object.prototype.hasOwnProperty.call(totalFund, key)) {
      const total = totalFund[key];
      const isError = total != 100;
      if (isError) {
        validatedTotalData[key] = {
          value: total,
          name: key,
          validating: false,
          errors: [
            {
              message: errorMessage,
              field: key,
            },
          ],
        };
      } else {
        validatedTotalData[key] = total;
      }
    }
  }
  return validatedTotalData;
};
