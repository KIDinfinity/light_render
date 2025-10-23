import { useCallback } from 'react';
import useHandleSetCoverageFieldValueByProductCode from 'process/NB/ManualUnderwriting/_hooks/useHandleSetCoverageFieldValueByProductCode';
import useAutoAddRquiredRiderCallback from 'process/NB/ManualUnderwriting/_hooks/useAutoAddRquiredRiderCallback';
import useHandleRiderPlanOptionCopyCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleRiderPlanOptionCopyCallback';
import useHandleRemoveOrAddRelatedRiderCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleRemoveOrAddRelatedRiderCallback';

export default ({ id }: any) => {
  const handleChangeRiderPlanOption = useHandleRiderPlanOptionCopyCallback({
    id,
    field: 'numberOfUnits',
  });
  const handleChangeRiderPlanOptionForHospitalPlanCode = useHandleRiderPlanOptionCopyCallback({
    id,
    field: 'hospitalPlanCode',
  });
  const handleSetPermiumPerm = useHandleSetCoverageFieldValueByProductCode({
    id,
    targetField: 'payPeriod',
    ownField: 'payPeriod',
    conditionFieldKey: 'premiumTermFollowCode',
    conditionFieldValue: 'Y',
  });
  const handleSetPolicyPeriod = useHandleSetCoverageFieldValueByProductCode({
    id,
    targetField: 'indemnifyPeriod',
    ownField: 'indemnifyPeriod',
    conditionFieldKey: 'policyTermFollowCode',
    conditionFieldValue: 'Y',
  });
  const handleSetRiskAge = useHandleSetCoverageFieldValueByProductCode({
    id,
    targetField: 'indemnifyAgePeriod',
    ownField: 'indemnifyAgePeriod',
    conditionFieldKey: 'policyTermFollowCode',
    conditionFieldValue: 'Y',
  });
  const handleSetSumAssured = useHandleSetCoverageFieldValueByProductCode({
    id,
    targetField: 'sumAssured',
    ownField: 'sumAssured',
    conditionFieldKey: 'saFollowCode',
    conditionFieldValue: 'Y',
  });
  const handleSetIndemnifyPeriodUnit = useHandleSetCoverageFieldValueByProductCode({
    id,
    targetField: 'indemnifyPeriodUnit',
    ownField: 'indemnifyPeriodUnit',
  });
  const handleSetPayPeriodUnit = useHandleSetCoverageFieldValueByProductCode({
    id,
    targetField: 'payPeriodUnit',
    ownField: 'payPeriodUnit',
  });
  const handleAutoAddRider = useAutoAddRquiredRiderCallback({ id });
  const handleRemoveOrAddRelatedRider = useHandleRemoveOrAddRelatedRiderCallback({ id });

  return useCallback(
    (coreCode) => {
      handleAutoAddRider(coreCode);
      handleSetPermiumPerm(coreCode);
      handleSetPolicyPeriod(coreCode);
      handleSetRiskAge(coreCode);
      handleSetSumAssured(coreCode);
      handleSetIndemnifyPeriodUnit(coreCode);
      handleSetPayPeriodUnit(coreCode);
      handleChangeRiderPlanOption(coreCode);
      handleChangeRiderPlanOptionForHospitalPlanCode(coreCode);
      handleRemoveOrAddRelatedRider(coreCode);
    },
    [
      handleAutoAddRider,
      handleSetPermiumPerm,
      handleSetPolicyPeriod,
      handleSetRiskAge,
      handleSetSumAssured,
      handleSetIndemnifyPeriodUnit,
      handleSetPayPeriodUnit,
      handleChangeRiderPlanOption,
      handleChangeRiderPlanOptionForHospitalPlanCode,
      handleRemoveOrAddRelatedRider,
    ]
  );
};
