import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.businessData,
    shallowEqual
  );
  return useMemo(() => {
    const premiumBreakDownOrderList = lodash
      .chain(businessData)
      .get('cfgRegionalDefaultValueList', [])
      .find((item: any) => item?.codeType === 'premiumBreakDownOrder')
      .get('defaultValue')
      .split(',')
      .value();
    const list = (() => {
      const premiumBreakdownList = lodash
        .chain(businessData)
        .get('policyList[0].premiumBreakdownBOTotalList', [])
        .value();
      const premiumBreakdownBOTotalList = lodash
        .chain(businessData)
        .get('policyList[0].premiumBreakdownBOTotalList', [])
        .value();
      if (lodash.isEmpty(premiumBreakdownList)) {
        return premiumBreakdownBOTotalList;
      }
      return premiumBreakdownList;
    })();
    const premiumBreakdownList = lodash
      .chain(list)
      .map((item: any) => {
        return {
          ...item,
          order: lodash.findIndex(
            premiumBreakDownOrderList,
            (typeCode: any) => typeCode === lodash.get(item, 'typeCodePayment')
          ),
        };
      })
      .value();
    return lodash.orderBy(premiumBreakdownList, 'order');
  }, [businessData]);
};
