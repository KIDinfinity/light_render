import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { localConfig } from 'process/NB/ManualUnderwriting/Fund/Fund-Table/Section/Edit';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { NAMESPACE } from '../activity.config';
import useGetFundConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFundConfig';
import { formUtils } from 'basic/components/Form';

export default () => {
  const config = useGetSectionAtomConfig({
    section: 'Fund-Table',
    localConfig,
  });

  const totalFundInfoList = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.businessData?.policyList?.[0]?.fundInfo?.totalFundInfoList,
    shallowEqual
  );

  const totalConfig = useGetFundConfig({ totalFundInfoList, config, status: 'total' });
  const totalFundList = lodash.map(totalConfig, (item: any) => {
    const currentSum = lodash.reduce(
      totalFundInfoList,
      (result: number, reduceItem) => {
        const fundAllocation = lodash.toNumber(
          formUtils.queryValue(lodash.get(reduceItem, [item?.field]))
        );
        if (!lodash.isNaN(fundAllocation)) {
          return result + fundAllocation;
        }
        return result;
      },
      0
    );
    return {
      total: currentSum,
      span: item?.span,
      order: item?.order,
      field: item?.field,
    };
  });
  return totalFundList;
};
