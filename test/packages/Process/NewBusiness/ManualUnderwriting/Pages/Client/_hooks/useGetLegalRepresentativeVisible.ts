import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import CustomerRole from 'basic/enum/CustomerRole';
import { RuleByData } from 'basic/components/Form/Rule';
import useGetPrimaryAgentChannel from 'packages/Process/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useGetPrimaryAgentChannel';
import useGetCurrentBeneficiaryUnderage from 'packages/Process/NewBusiness/ManualUnderwriting/_hooks/useGetCurrentBeneficiaryUnderage';
import useJudgeMainCoverageIsTL from 'packages/Process/NewBusiness/ManualUnderwriting/_hooks/useJudgeMainCoverageIsTL';
import useJudgeCurrentInsuredUnderage from 'process/NewBusiness/ManualUnderwriting/_hooks/useJudgeCurrentInsuredUnderage';

export default ({ id, readOnly, config }: any) => {
  const primaryAgentChannelCode = useGetPrimaryAgentChannel();
  const currentBeneficiaryUnderage = useGetCurrentBeneficiaryUnderage({
    clientId: id,
    readOnly,
  });
  const currentInsuredUnderage = useJudgeCurrentInsuredUnderage({
    clientId: id,
    readOnly,
  });

  const mainCoverageIsTL = useJudgeMainCoverageIsTL({
    type: readOnly ? 'show' : 'edit',
  });
  const clientList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly ? `processData.clientInfoList` : `modalData.processData.clientInfoList`
      ),
    shallowEqual
  );
  const clientMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(modelnamepsace, readOnly ? `entities.clientMap` : `modalData.entities.clientMap`),
    shallowEqual
  );

  return useMemo(() => {
    const isPolicyOwnerOrInsured = (() => {
      const customerRoles: any =
        lodash
          .chain(clientList)
          .filter((clientId: string) => id === clientId)
          .map((clientId: string) =>
            formUtils.queryValue(clientMap[clientId]?.personalInfo?.customerRole)
          )
          .flatten()
          .value() || [];
      return (
        customerRoles.includes(CustomerRole.PolicyOwner) ||
        customerRoles.includes(CustomerRole.Insured)
      );
    })();
    const ruleData = {
      currentBeneficiaryUnderage,
      primaryAgentChannelCode,
      mainCoverageIsTL,
      isPolicyOwnerOrInsured,
      currentInsuredUnderage,
    };

    const visible = lodash.get(config, 'visible');
    const visibleCondition = lodash.get(config, 'visible-condition');
    if (visible === 'C') {
      return RuleByData(visibleCondition, ruleData);
    }
    return true;
  }, [
    primaryAgentChannelCode,
    currentBeneficiaryUnderage,
    mainCoverageIsTL,
    config,
    clientMap,
    clientList,
    id,
    currentInsuredUnderage,
  ]);
};
