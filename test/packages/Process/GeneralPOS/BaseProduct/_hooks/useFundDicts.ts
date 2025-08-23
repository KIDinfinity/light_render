import { useMemo } from 'react';
import { useSelector } from 'dva';
import { NAMESPACE } from '../activity.config';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

type Param = {
  isUseDefaultFund?: boolean;
  // PartialWithdrawl 会传入funds === policyFundDOList
  funds?: any[];
  // transactionTypes的funds，兜底policyFundDOList和allFundConfigList都为空的情况
  backupFunds: any[];
  // 额外的funds，兜底 policyFundDOList 返回的fundcode在allFundConfigList找不到的情况
  otherFunds?: any[];
};

export default function useFundDicts({
  funds,
  backupFunds,
  isUseDefaultFund = true,
  otherFunds = [],
}: Param) {
  const defaultFunds = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.allFundConfigList
  );

  // 所有funds的国际化
  const fundsDictsMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.fundsDictsMap
  );

  return useMemo(() => {
    let res =
      lodash
        .chain([defaultFunds, backupFunds])
        .map((fundList) => fundList?.concat(otherFunds))
        .maxBy((fundList) => fundList?.length)
        .value() || [];

    if (!isUseDefaultFund) {
      res = funds;
    }

    if (!res?.length) {
      res = backupFunds;
    }

    res = lodash
      .chain(res)
      .map((item) => {
        const fundCode = formUtils.queryValue(item.fundCode);
        const fundName = fundsDictsMap[fundCode]?.fundName;
        return {
          dictCode: fundCode,
          dictName:
            tenant.isTH() && item?.amcFundCode
              ? `${fundCode} - ${item?.amcFundCode}`
              : fundName
                ? `${fundCode} - ${fundName}`
                : fundCode,
        };
      })
      .uniqBy('dictCode') // 存在fundCode一样，PremiumTypeEnum不一样的数据
      .value();

    return res;
  }, [isUseDefaultFund, defaultFunds, funds, backupFunds, fundsDictsMap]);
}
