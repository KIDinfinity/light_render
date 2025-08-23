import lodash from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import Mode from 'process/NewBusiness/ManualUnderwriting/_enum/Mode';

interface IProps {
  coverageId: string;
}

export default ({ coverageId }: IProps) => {
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );

  const coverageList = useGetCoverageList(Mode.Edit);
  const originProductList = (() => {
    const {
      basicPlanProductFeatureList,
      otherPlanProductFeatureList,
    } = lodash.pick(planProductConfig, [
      'basicPlanProductFeatureList',
      'otherPlanProductFeatureList',
    ]);

    return lodash.unionBy(
      [...basicPlanProductFeatureList, ...otherPlanProductFeatureList],
      'productCode'
    );
  })();
  const coreCode = formUtils.queryValue(
    lodash
      .chain(coverageList)
      .find((coverage: any) => coverage.id === coverageId)
      .get('coreCode')
      .value()
  );
  return useMemo(() => {
    return lodash.some(
      originProductList,
      (configItem: any) =>
        configItem.productCode === coreCode && configItem?.premiumInUnitBasis === 'Y'
    );
  }, [originProductList, coreCode]);
};
