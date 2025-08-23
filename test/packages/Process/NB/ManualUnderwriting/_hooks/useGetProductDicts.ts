import lodash from 'lodash';
import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetCurrentCoverageIsMain from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentCoverageIsMain';
import ApplicableToRole from 'process/NB/Enum/ApplicableToRole';
import useGetCoverageInsuredRoles from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageInsuredRoles';
import CustomerRole from 'enum/CustomerRole';
import useJudgeInsuredIsPI from 'process/NB/ManualUnderwriting/_hooks/useJudgeInsuredIsPI';
import useGetRelatedRider from 'process/NB/ManualUnderwriting/_hooks/useGetRelatedRider';

export default ({ id }: any) => {
  const isMain = useGetCurrentCoverageIsMain({ id });
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  const roles = useGetCoverageInsuredRoles({ coverageId: id });
  const isPI = useJudgeInsuredIsPI({ coverageId: id });
  const relatedRider = useGetRelatedRider();
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
      .filter((item: any) => {
        let pickData = false;

        const applicableToRole = lodash
          .chain(item)
          .get('applicableToRole')
          .split(',')
          .filter((configItem: any) => !!configItem)
          .value();

        if (lodash.isEmpty(applicableToRole)) {
          pickData = true;
        }
        lodash
          .chain(applicableToRole)
          .forEach((configItem: any) => {
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
  }, [planProductConfig, isMain, roles, isPI, relatedRider]);
};
