import lodash from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import type { planProductConfig } from '../types';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetCurrentCoverageIsMain from './useGetCurrentCoverageIsMain';
import ApplicableToRole from 'process/NewBusiness/Enum/ApplicableToRole';
import useGetCoverageInsuredRoles from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageInsuredRoles';
import CustomerRole from 'enum/CustomerRole';
import useJudgeInsuredIsPI from 'process/NewBusiness/ManualUnderwriting/_hooks/useJudgeInsuredIsPI';
import useGetRelatedRider from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetRelatedRider';
import useGetJudePCOptionalProduct from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetJudePCOptionalProduct';

export default ({ id }: any) => {
  const isMain = useGetCurrentCoverageIsMain({ id });
  const planProductConfig: planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  const roles = useGetCoverageInsuredRoles({ coverageId: id });
  const isPI = useJudgeInsuredIsPI({ coverageId: id });
  const relatedRider = useGetRelatedRider();
  const handleJudgeMHIT = useGetJudePCOptionalProduct();
  return useMemo(() => {
    const originProductList = (() => {
      if (isMain === 'Y') {
        return lodash.chain(planProductConfig).get('basicPlanProductFeatureList', []).value();
      }
      if (isMain === 'N') {
        const otherPlanProductFeatureList = lodash
          .chain(planProductConfig)
          .get('otherPlanProductFeatureList', [])
          .value();
        return [...otherPlanProductFeatureList, ...relatedRider];
      }
      // Paper Submission 的情形，第一个元素是没有初始值的，要给它一个isMain='Y'的默认值

      return lodash.chain(planProductConfig).get('basicPlanProductFeatureList', []).value();
    })();
    return lodash
      .chain(originProductList)
      .unionBy(originProductList, 'productCode')
      .filter(({ productCode }) => handleJudgeMHIT(productCode))
      .filter((item) => {
        let pickData = false;

        const applicableToRole = lodash
          .chain(item)
          .get('applicableToRole')
          .split(',')
          .filter((configItem) => !!configItem)
          .value();

        if (lodash.isEmpty(applicableToRole)) {
          pickData = true;
        }
        lodash
          .chain(applicableToRole)
          .forEach((configItem) => {
            if (configItem === ApplicableToRole.PO) {
              if (lodash.includes(roles, CustomerRole.PolicyOwner)) {
                pickData = true;
              }
            }
            if (configItem === ApplicableToRole.PI) {
              if (isPI) {
                pickData = true;
              }
            }
            if (configItem === ApplicableToRole.SI) {
              if (!lodash.includes(roles, CustomerRole.PolicyOwner)) {
                pickData = true;
              }
            }
          })
          .value();
        return pickData;
      })
      .value();
  }, [planProductConfig, isMain, roles, isPI, relatedRider, handleJudgeMHIT]);
};
