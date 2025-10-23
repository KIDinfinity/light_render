import { useCallback } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import useGetFlatProductConfig from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetFlatProductConfig';

export default ({ id }: any) => {
  const coverageList = useGetCoverageList('edit');
  const clientMap = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace?.entities?.clientMap,
    shallowEqual
  );
  const planProductConfig = useGetFlatProductConfig();

  return useCallback(
    (coreCode: string) => {
      const currentCoverage = lodash
        .chain(coverageList)
        .find((item: any) => item?.id === id)
        .value();

      const coverageInsuredClientIds = lodash
        .chain(currentCoverage)
        .get('coverageInsuredList', [])
        .map((client: any) => formUtils.queryValue(client?.clientId))
        .value();

      const clientMHIT = lodash
        .chain(clientMap)
        .pick(coverageInsuredClientIds)
        .map((client: any) => client?.isInterestMhit)
        .some((isInterestMhit: any) => isInterestMhit === 'Y')
        .value();

      const clientNotSelection = lodash
        .chain(clientMap)
        .pick(coverageInsuredClientIds)
        .map((client: any) => client?.isInterestMhit)
        .every((isInterestMhit: any) => !isInterestMhit)
        .value();
      if (clientNotSelection) {
        return true;
      }
      const matchPCOptionalProduct = lodash
        .chain(planProductConfig)
        .some((productConfig: any) => {
          return (
            productConfig?.productCode === coreCode &&
            productConfig?.extProductType === 'PC_optional_product'
          );
        })
        .value();
      if (matchPCOptionalProduct) {
        return clientMHIT;
      }
      return true;
    },
    [coverageList, id, clientMap, planProductConfig]
  );
};
