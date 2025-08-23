import { v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export const getPlanFundCfgByFundCode = (fundCode: string, planFundConfigs: any[]) => {
  const targetCfg = lodash
    .chain(planFundConfigs)
    .find((cfg) => cfg.fundCode === fundCode)
    .value();
  return targetCfg;
};

export const getPlanFundAllocationCfg = (
  fundCode: string,
  fundStrategy: string,
  planFundConfigs: any[],
  coverage: any
) => {
  const targetCfg = getPlanFundCfgByFundCode(fundCode, planFundConfigs);
  const cfgPlanFundBOS = lodash.get(targetCfg, 'cfgPlanFundBOS', []);

  return lodash
    .chain(cfgPlanFundBOS)
    .find(
      (cfg) =>
        cfg.portfolioType === fundStrategy &&
        formUtils.queryValue(coverage?.coreCode) === cfg.productCode
    )
    .value();
};

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

export const getAutoAttachFunds = (fundCfgList: any[], portfolioType: any, coverages: any[]) => {
  const attachFunds = lodash
    .chain(fundCfgList)
    .reduce((list: any[], cfgItem) => {
      const allocations = calAllocations(cfgItem, portfolioType, coverages);
      list.push({
        id: uuidv4(),
        fundCurrency: cfgItem.fundCurrency,
        fundCode: cfgItem.fundCode,
        ...allocations,
      });
      return list;
    }, [])
    .value();
  return attachFunds;
};

export const updatAutoAttachFunds = (
  totalFundList: any[],
  portfolioType: any,
  fundCfgList: any[],
  coverages: any
) => {
  const attachFunds = lodash
    .chain(fundCfgList)
    .reduce((list: any[], cfgItem) => {
      const allocations = calAllocations(cfgItem, portfolioType, coverages);
      const ownFund = lodash.find(totalFundList, (fund) => {
        return formUtils.queryValue(fund.fundCode) === cfgItem.fundCode;
      });
      if (ownFund) {
        const { fundAllocation, epaAllocation, adHocTopUpAllocation } = ownFund;
        list.push({
          ...ownFund,
          fundAllocation: lodash.isNil(fundAllocation)
            ? allocations.fundAllocation
            : fundAllocation,
          epaAllocation: lodash.isNil(epaAllocation) ? allocations.epaAllocation : epaAllocation,
          adHocTopUpAllocation: lodash.isNil(adHocTopUpAllocation)
            ? allocations.adHocTopUpAllocation
            : adHocTopUpAllocation,
        });
      } else {
        list.push({
          id: uuidv4(),
          fundCurrency: cfgItem.fundCurrency,
          fundCode: cfgItem.fundCode,
          ...allocations,
        });
      }
      return list;
    }, [])
    .value();
  return attachFunds;
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

export const isAutoAttachFunds = (fundCfgList: any[]) => {
  return (
    !lodash.isEmpty(fundCfgList) &&
    lodash.some(
      fundCfgList,
      (productCode) => productCode.cfgPlanFundBOS && productCode.cfgPlanFundBOS.length > 0
    )
  );
};
