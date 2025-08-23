import { useMemo, useCallback } from 'react';
import lodash from 'lodash';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetDecisionData from 'process/NB/ManualUnderwriting/_hooks/useGetDecisionData';
import useGetCurrentCoverageIsMain from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentCoverageIsMain';
import useGetCorverageFieldDefaultValueUpdated from 'process/NB/ManualUnderwriting/_hooks/useGetCorverageFieldDefaultValueUpdated';
import useGetNeedTriggerByCondtion from 'process/NB/ManualUnderwriting/_hooks/useGetNeedTriggerByCondtion';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default ({ id }: any) => {
  const coverageIsMain = useGetCurrentCoverageIsMain({ id });
  const handleGetPayPeriodDefaultValue = useGetCorverageFieldDefaultValueUpdated({
    fieldKey: 'payPeriod',
    id,
  });
  const handleGetPayPeriodTrigger = useGetNeedTriggerByCondtion({
    conditionFieldKey: 'premiumTermFollowCode',
    conditionFieldValue: 'Y',
  });
  const handleGetIndemnifyPeriodDefaultValue = useGetCorverageFieldDefaultValueUpdated({
    fieldKey: 'indemnifyPeriod',
    id,
  });
  const handleGetIndemnifyPeriodTrigger = useGetNeedTriggerByCondtion({
    conditionFieldKey: 'policyTermFollowCode',
    conditionFieldValue: 'Y',
  });
  const handleGetSamplePeriodDefaultValue = useGetCorverageFieldDefaultValueUpdated({
    fieldKey: 'sumAssured',
    id,
  });
  const handleGetSamplePeriodTrigger = useGetNeedTriggerByCondtion({
    conditionFieldKey: 'saFollowCode',
    conditionFieldValue: 'Y',
  });
  const handleGetIndemnifyPeriodUnitDefaultValue = useGetCorverageFieldDefaultValueUpdated({
    fieldKey: 'indemnifyPeriodUnit',
    id,
  });
  const handleGetPayPeriodUnitDefaultValue = useGetCorverageFieldDefaultValueUpdated({
    fieldKey: 'payPeriodUnit',
    id,
  });

  const dataSource = useMemo(() => {
    return coverageIsMain === 'Y' ? 'basicPlanProductFeatureList' : 'otherPlanProductFeatureList';
  }, [coverageIsMain]);
  const { applicationNo, policyId } = useGetDecisionData();
  const dispatch = useDispatch();
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  const coreCodes = useMemo(() => {
    return lodash
      .chain(businessData)
      .get('policyList[0].coverageList', [])
      .map((item: any) => {
        return formUtils.queryValue(item.coreCode);
      })
      .filter((item: any) => !!item)
      .value();
  }, [businessData]);
  const addRider = useCallback(
    (coreCode) => {
      const dataSet = new Set();
      lodash
        .chain(planProductConfig)
        .get(dataSource)
        .find((item: any) => item?.productCode === coreCode)
        .get('requiredRiderCodeList', [])
        .forEach((requiredCode: any) => {
          if (!lodash.includes(coreCodes, requiredCode)) {
            dataSet.add(requiredCode);
          }
        })
        .value();
      // eslint-disable-next-line no-restricted-syntax
      for (const code of dataSet) {
        const indemnifyPeriod = (() => {
          const trigger = handleGetIndemnifyPeriodTrigger(code);
          if (trigger) {
            const defaultValue = handleGetIndemnifyPeriodDefaultValue({
              coreCode: code,
              updatedCode: coreCode,
            });
            return defaultValue;
          }
          return '';
        })();
        const sumAssured = (() => {
          const trigger = handleGetSamplePeriodTrigger(code);
          if (trigger) {
            const defaultValue = handleGetSamplePeriodDefaultValue({
              coreCode: code,
              updatedCode: coreCode,
            });
            return defaultValue;
          }
          return '';
        })();
        const payPeriod = (() => {
          const trigger = handleGetPayPeriodTrigger(code);
          if (trigger) {
            const defaultValue = handleGetPayPeriodDefaultValue({
              coreCode: code,
              updatedCode: coreCode,
            });
            return defaultValue;
          }
          return '';
        })();
        const indemnifyPeriodUnit = handleGetIndemnifyPeriodUnitDefaultValue({
          coreCode: code,
          updatedCode: coreCode,
        });
        const payPeriodUnit = handleGetPayPeriodUnitDefaultValue({
          coreCode: code,
          updatedCode: coreCode,
        });

        dispatch({
          type: `${NAMESPACE}/addRider`,
          payload: {
            applicationNo,
            policyId,
            coreCode: code,
            indemnifyPeriod,
            indemnifyPeriodUnit,
            sumAssured,
            payPeriod,
            payPeriodUnit,
          },
        });
      }
    },
    [
      applicationNo,
      policyId,
      planProductConfig,
      dataSource,
      coreCodes,
      handleGetPayPeriodDefaultValue,
      handleGetPayPeriodTrigger,
      handleGetIndemnifyPeriodUnitDefaultValue,
      handleGetIndemnifyPeriodDefaultValue,
      handleGetIndemnifyPeriodTrigger,
      handleGetSamplePeriodDefaultValue,
      handleGetSamplePeriodTrigger,
      handleGetPayPeriodUnitDefaultValue,
    ]
  );
  return addRider;
};
