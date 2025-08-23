import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { tenant, Region } from '@/components/Tenant';
import { Validator, formUtils } from 'basic/components/Form';
import transTableRowsConfig from 'basic/utils/transTableRowsConfig';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { getAllocationSum, getAllocationVisibleCondition } from './utils';
import { v4 as uuid } from 'uuid';

type FundType = {
  id: string;
  fundName?: string;
  fundCode: string;
  fundCurrency: string;
  productCode?: string;
  portfolioType?: string;
  fundAllocation?: number;
  epaAllocation?: number;
  adHocTopUpAllocation?: number;
  tpaRcdAllocation?: number;
  tpaAllocation?: number;
};
type FundBaseInfoType = {
  portfolioId?: string;
  portfolioType?: string;
  autoRebalancingType?: string;
  autoRebalancingStatus?: string;
  ulReserveUnitDate?: string;
};

const FundListModalDataPath = `${NAMESPACE}.modalData.fund.fundList`;
const FundConfigListModalDataPath = `${NAMESPACE}.modalData.fund.fundConfigList`;
const FundBaseInfoModalDataPath = `${NAMESPACE}.modalData.fund.fundInfo`;
const ProductCodeListModalDataPath = `${NAMESPACE}.modalData.fund.productCodeList`;

const FundListPath = `${NAMESPACE}.processData.fund.fundInfoList`;
const FundInfoPath = `${NAMESPACE}.processData.fund.fundBaseInfo`;
const CoverageListPath = `${NAMESPACE}.processData.coverageList`;
const caseCategoryPath = `${NAMESPACE}.processData.caseCategory`;

const fundConfigListSelector = (state: any) =>
  lodash.get(state, FundConfigListModalDataPath) as Record<string, any>;
const productCodeListSelector = (state: any) =>
  lodash.get(state, ProductCodeListModalDataPath) as Record<
    string,
    {
      cfgPlanFundBOS?: any[];
      fundCode: string;
      fundName: string;
      fundCurrency: string;
    }
  >;
const fundListModalDataSelector = (state: any) =>
  lodash.get(state, FundListModalDataPath) as Record<string, any>;
const fundBaseInfoModalSelector = (state: any) => lodash.get(state, FundBaseInfoModalDataPath);

const fundListSelector = (state: any) => (lodash.get(state, FundListPath) || []) as FundType[];
const fundBaseInfoSelector = (state: any) => lodash.get(state, FundInfoPath) as FundBaseInfoType;
const coverageListSelector = (state: any) => lodash.get(state, CoverageListPath) as any[];

export const useFundList = () => useSelector(fundListSelector);
export const useFundConfig = () => useSelector(fundConfigListSelector);
export const useProductConfig = () => useSelector(productCodeListSelector);
export const useFundBaseInfo = () => useSelector(fundBaseInfoSelector);
export const useCoverageList = () => useSelector(coverageListSelector);

export const usePortfolioType = () => {
  const fundBaseInfo = useFundBaseInfo();
  return useMemo(() => fundBaseInfo?.portfolioType, [fundBaseInfo?.portfolioType]);
};

export const useFundVisible = () => {
  const coverageList = useSelector(
    (state: any) =>
      lodash.get(state, CoverageListPath) as { isMain: string; fundVisible: boolean }[]
  );
  return useMemo(() => {
    return !!lodash
      .chain(coverageList)
      .some((coverage: any) => !!coverage.fundVisible)
      .value();
  }, [coverageList]);
};
export const useCurrencyCode = () => {
  const currencyCode = useSelector(
    ({ [NAMESPACE]: model }: any) => model.processData?.currencyCode
  );
  return currencyCode;
};
export const useProductCodeList = () => {
  const coverageList = useSelector(
    ({ [NAMESPACE]: model }: any) => model?.processData?.coverageList,
    shallowEqual
  );

  return useMemo(() => {
    return (
      lodash
        .chain(coverageList)
        .map((coverage: any) => {
          return {
            ...coverage,
            isMainWeight: coverage.isMain === 'Y' ? 1 : 0,
          };
        })
        .orderBy(['isMainWeight', 'lifeNo'], ['desc', 'asc'])
        .map((coverage: any) => {
          return coverage?.coreCode;
        })
        .filter((code) => !!code)
        .value() || []
    );
  }, [coverageList]);
};

// 根据 productList 设置 默认allocation， 根据fundConfig 设置 fundName
export const useAllFundInfoList = () => {
  const fundConfigList = useFundConfig();
  const fundInfoList = useFundList();
  return useMemo(() => {
    const fundList: FundType[] = fundInfoList?.map((fund) => {
      const { fundCode } = fund;
      const fundName = fund?.fundName || fundConfigList?.[fundCode]?.fundName || '';
      const tempFund = { ...fund, fundName };
      return tempFund;
    });
    return fundList;
  }, [fundConfigList, fundInfoList]);
};

export const useModalFundList = () => useSelector(fundListModalDataSelector);
export const useModalFundBaseInfo = () => useSelector(fundBaseInfoModalSelector);
export const useAutoAttachFundStatus = () => {
  const productConfig = useProductConfig();
  return useMemo(() => {
    return lodash.some(
      Object.values(productConfig),
      (productCode) => productCode.cfgPlanFundBOS && productCode.cfgPlanFundBOS.length > 0
    );
  }, [productConfig]);
};
export const useAutoAttachFunds = () => {
  const productConfig = useProductConfig();
  const fundList = useFundList();
  const portfolioType = usePortfolioType();
  return useMemo(() => {
    if (lodash.isEmpty(portfolioType) || lodash.isEmpty(productConfig)) return [];
    return lodash
      .chain(productConfig)
      .reduce<any[]>((list, productItem) => {
        const planFundCfg = lodash.find(
          productItem.cfgPlanFundBOS,
          (cfg) => cfg.portfolioType === portfolioType
        );
        if (planFundCfg) {
          const ownFund = lodash.find(fundList, (fund) => {
            return formUtils.queryValue(fund.fundCode) === planFundCfg.fundCode;
          });
          const {
            defaultAllocationPercentage,
            fundCode,
            productCode,
            maxAllocationPercentage,
            minAllocationPercentage,
          } = planFundCfg;
          if (!ownFund) {
            list.push({
              id: uuid.v4(),
              fundCurrency: productItem.fundCurrency,
              fundCode,
              productCode,
              portfolioType,
              maxAllocationPercentage,
              minAllocationPercentage,
              epaAllocation: defaultAllocationPercentage,
              adHocTopUpAllocation: defaultAllocationPercentage,
              fundAllocation: defaultAllocationPercentage,
            });
          }
        }
        return list;
      }, [])
      .value();
  }, [fundList, portfolioType, productConfig]);
};

export const useAllocationConfigByFundCode = (fundCode: string) => {
  const fundBaseInfo = useModalFundBaseInfo();
  const productConfig = useProductConfig();
  const portfolioType = formUtils.queryValue(fundBaseInfo?.portfolioType);

  return useMemo(() => {
    const fundConfig = productConfig?.[fundCode];
    if (portfolioType && fundConfig) {
      const cfgPlanFundBOS = lodash.get(fundConfig, 'cfgPlanFundBOS', []);
      return lodash
        .chain(cfgPlanFundBOS)
        .find((cfg) => cfg.portfolioType === portfolioType)
        .value();
    }
    return null;
  }, [fundCode, portfolioType, productConfig]);
};
// fundCode Disc
export const useFundCodeDictsByCurrentFundCode = (currentFundCode: string) => {
  const productConfig = useProductConfig();
  const fundListObj = useModalFundList();
  const productCodeList = Object.values(productConfig) as { fundCode: string; fundName: string }[];
  return useMemo(() => {
    const codeList = Object.values(fundListObj)
      .map((fund) => formUtils.queryValue(fund.fundCode))
      .filter((code) => !!code);
    if (!productCodeList || productCodeList?.length < 0) return [];
    return productCodeList
      ?.filter(
        (product) =>
          !lodash.includes(codeList, product?.fundCode) || product?.fundCode === currentFundCode
      )
      ?.map((product) => {
        return {
          ...product,
          fundName: `${product?.fundCode} - ${product?.fundName}`,
        };
      });
  }, [currentFundCode, fundListObj, productCodeList]);
};
// 判断是否显示ulReserveUnitDate
export const useUlReserveUnitDateDisplay = () => {
  const caseCategory = useSelector((state: any) => lodash.get(state, caseCategoryPath));
  return useMemo(() => {
    return tenant.region() === Region.TH && caseCategory === 'BP_AP_CTG02';
  }, [caseCategory]);
};

export const useGetFundTableColumns = (config: any[]) => {
  return useMemo(() => {
    const tableColumns = transTableRowsConfig({
      config,
      currencyConfig: {
        fundAllocation: {
          objectFieldName:
            'nb.policyList.coverageList.coverageFundInfoList.ownFundInfoList.fundAllocation',
        },
      },
    });
    const filterColumns = lodash
      .chain(tableColumns)
      .map((item) => {
        if (item.key === 'fundCode') {
          return {
            ...item,
            render: (text: any, recode: any) => {
              const fundName = text && `${text} - ${recode?.fundName}`;
              return fundName;
            },
          };
        }

        return {
          ...item,
          render: (text: any, recode: any) => {
            if (recode?.summaryFlag) {
              return React.createElement(
                'span',
                {
                  style: {
                    color: 'var(--primary-color)',
                  },
                },
                [text]
              );
            }
            return text;
          },
        };
      })
      .value();
    return filterColumns;
  }, [config]);
};
// fund chart data;
export const useFundChartData = () => {
  const fundList = useSelector(fundListSelector);
  return useMemo(() => {
    const colorConfig = [
      {
        color: '#F3BB90',
        fundCode: 'AAEA',
        fundName: 'FWD Takaful World Islamic Equity Fund',
      },
      {
        color: '#FED141',
        fundCode: 'ACEA',
        fundName: 'FWD Takaful Asia Pacific Islamic Equity Fund',
      },
      {
        color: '#183028',
        fundCode: 'ACFA',
        fundName: 'FWD Takaful Islamic Sukuk Fund',
      },
      {
        color: '#8B9793',
        fundCode: 'APDA',
        fundName: 'FWD Takaful Dynamic Fund',
      },
      {
        color: '#0097A9',
        fundName: 'FWD Takaful LifeSelect Equity Fund',
        fundCode: 'APEA',
      },
      {
        fundCode: 'APFA',
        fundName: 'FWD Takaful LifeSelect Fixed Income Fund',
        color: '#6ECEB2',
      },
      {
        fundCode: 'AQEA',
        fundName: 'FWD Takaful Global Sustainable Equity Fund',
        color: '#E87722',
      },
      {
        fundCode: 'AQFA',
        fundName: 'FWD Takaful Global Mixed Assets Fund',
        color: '#E2F5F0',
      },
      {
        fundCode: 'ACGA',
        fundName: 'FWD Takaful Lifetime Balanced Fun',
        color: '#FEE8A0',
      },
      {
        fundCode: 'APGA',
        fundName: 'FWD Takaful Global Multi Thematic Fund',
        color: '#DBDFE1',
      }
    ];
    return lodash
      .chain(fundList)
      .map((fund: any) => {
        const currentConfig = lodash.find(
          colorConfig,
          (colorItem: any) => colorItem.fundCode === formUtils.queryValue(fund.fundCode)
        );
        return {
          ...fund,
          item: fund?.fundCode,
          color: currentConfig?.color,
          value: lodash.toNumber(fund.fundAllocation),
        };
      })
      .orderBy(['value'], 'desc')
      .value();
  }, [fundList]);
};
// allocation conditions
export const useAllocationConditions = (form: any) => {
  const fundCode = formUtils.queryValue(form.getFieldValue('fundCode'));
  const allocationConfig = useAllocationConfigByFundCode(fundCode);
  const Rules = {
    VLD_000850:
      allocationConfig &&
      Validator.VLD_000850(
        Number(allocationConfig.minAllocationPercentage),
        Number(allocationConfig.maxAllocationPercentage)
      ),
  };
  const editableConditions = useMemo(
    () =>
      !allocationConfig ||
      allocationConfig?.maxAllocationPercentage !== allocationConfig?.minAllocationPercentage,
    [allocationConfig]
  );
  return {
    Rules,
    editableConditions,
  };
};
// allocations visible conditions
export const useAllocationsVisibleCondition = (fundInfoList: any[], config: any[]) => {
  const coverageList = useSelector(
    (state: any) =>
      lodash.get(state, CoverageListPath) as {
        isMain: string;
        fundVisible: boolean;
        productType: string;
      }[]
  );
  return useMemo(() => {
    return getAllocationVisibleCondition(coverageList, fundInfoList, config);
  }, [config, coverageList, fundInfoList]);
};
// filter allocations config
export const useFundTableConfigWithFilter = (fundList: any[], config: any[]) => {
  const visibleConditions = useAllocationsVisibleCondition(fundList, config);

  const configWithAllocationFilter = useMemo(() => {
    return lodash
      .chain(config)
      .filter((item) => {
        if (lodash.includes(item?.field, 'Allocation')) {
          return visibleConditions?.[item?.field];
        } else {
          return true;
        }
      })
      .orderBy('order')
      .value();
  }, [config, visibleConditions]);
  return configWithAllocationFilter;
};
//  allocations total sum
export const useTotalAllocations = (fundList: any[], config: any[]) => {
  const visibleConditions = useAllocationsVisibleCondition(fundList, config);
  const totalAllocations = useMemo(() => {
    return getAllocationSum(fundList, visibleConditions);
  }, [fundList, visibleConditions]);
  return totalAllocations;
};
