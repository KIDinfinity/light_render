import lodash from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import CustomerRole from 'enum/CustomerRole';
import { formUtils } from 'basic/components/Form';

enum ApplicableToRole {
  PO = 'PO',
  PI = 'PI',
  SI = 'SI',
}
export default ({ id, transactionId }: any) => {
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  const { policyClientRoleList, mainPolicyId: policyId } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo
  );
  const uwCoverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwCoverageList
  );
  const {
    otherPlanProductFeatureList,
    basicPlanProductFeatureList,
  } = lodash.pick(planProductConfig, [
    'otherPlanProductFeatureList',
    'basicPlanProductFeatureList',
  ]);

  const clientId = useMemo(() => {
    return formUtils.queryValue(
      lodash
        .chain(uwCoverageList)
        .find((item: any) => item.id === id)
        .get('clientId')
        .value()
    );
  }, [id, uwCoverageList]);
  const roleList = useMemo(() => {
    return lodash
      .chain(policyClientRoleList)
      .filter({ policyId, clientId })
      .map('customerRole')
      .value();
  }, [clientId, policyClientRoleList, policyId]);
  // const isPI = useJudgeInsuredIsPI({ coverageId: id });
  // const handleJudgeMHIT = useGetJudePCOptionalProduct();

  const originProductList = useMemo(() => {
    const productCollect = new Set();
    const productCodes = lodash.map(uwCoverageList, (coverage) =>
      formUtils.queryValue(coverage?.productCode)
    );
    const relatedRider = lodash
      .chain(basicPlanProductFeatureList || [])
      .concat(otherPlanProductFeatureList)
      .filter((configItem) => lodash.includes(productCodes, configItem?.productCode))
      .forEach((configItem: any) => {
        lodash
          .chain(configItem)
          .get('relatedRider', [])
          .forEach((riderItem: any) => {
            if (
              lodash.every(Array.from(productCollect), (productItem: any) => {
                return productItem?.productCode !== riderItem?.productCode;
              })
            ) {
              productCollect.add(riderItem);
            }
          })
          .value();
      })
      .value();
    return [...(otherPlanProductFeatureList || []), ...(relatedRider || [])];
  }, [basicPlanProductFeatureList, otherPlanProductFeatureList, uwCoverageList]);

  const isPI = useMemo(() => {
    const maininsuredClientId = lodash
      .chain(uwCoverageList)
      .find((item: any) => item.isMain === 'Y')
      .get('clientId')
      .value();

    return maininsuredClientId === clientId;
  }, [uwCoverageList, clientId]);

  return useMemo(() => {
    return (
      lodash
        .chain(originProductList)
        .unionBy(originProductList, 'productCode')
        // .filter(({ productCode }) => handleJudgeMHIT(productCode))
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
                if (lodash.includes(roleList, CustomerRole.PolicyOwner)) {
                  pickData = true;
                }
              }
              if (configItem === ApplicableToRole.PI) {
                if (isPI) {
                  pickData = true;
                }
              }
              if (configItem === ApplicableToRole.SI) {
                if (!lodash.includes(roleList, CustomerRole.PolicyOwner)) {
                  pickData = true;
                }
              }
            })
            .value();
          return pickData;
        })
        .value()
    );
  }, [isPI, originProductList, roleList]);
};
