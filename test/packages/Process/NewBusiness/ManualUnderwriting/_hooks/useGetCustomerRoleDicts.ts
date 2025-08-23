import { formUtils } from 'basic/components/Form';
import { RuleByData } from 'basic/components/Form/Rule';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetPrimaryAgentChannel from 'packages/Process/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useGetPrimaryAgentChannel';
import useGetSomeBeneficiaryUnderage from 'packages/Process/NewBusiness/ManualUnderwriting/_hooks/useGetSomeBeneficiaryUnderage';
import useGetSomeInsuredUnderage from 'packages/Process/NewBusiness/ManualUnderwriting/_hooks/useGetSomeInsuredUnderage';
import useJudgeMainCoverageIsTL from 'packages/Process/NewBusiness/ManualUnderwriting/_hooks/useJudgeMainCoverageIsTL';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { useMemo } from 'react';
import useGetCustomerRoleConfig from './useGetCustomerRoleConfig';
import useJudgeIsMainInsured from './useJudgeIsMainInsured';

// 根据misc配置返回customerRole
export default ({ id, readOnly }: any) => {
  const config = useGetCustomerRoleConfig();
  const primaryAgentChannelCode = useGetPrimaryAgentChannel();

  const mainCoverageIsTL = useJudgeMainCoverageIsTL({
    type: readOnly ? 'show' : 'edit',
  });

  // 当前客户是主被保人
  const isMainInsured = useJudgeIsMainInsured({
    type: readOnly ? 'show' : 'edit',
    clientId: id,
  });

  const someBeneficiaryUnderage = useGetSomeBeneficiaryUnderage({
    clientId: id,
    readOnly,
  });

  const someInsuredUnderage = useGetSomeInsuredUnderage({
    clientId: id,
    readOnly,
  });

  const roleDicts: any = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.roleDicts,
    shallowEqual
  );

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
    // 当前客户的角色
    const customerRoles = lodash
      .chain(clientList)
      .filter((clientId: string) => id === clientId)
      .map((clientId: string) =>
        formUtils.queryValue(clientMap[clientId]?.personalInfo?.customerRole)
      )
      .flatten()
      .value();

    // 未去重的其他客户角色
    const otherCustomerRolesRaw = lodash
      .chain(clientList)
      .filter((clientId: string) => id !== clientId)
      .map((clientId: string) =>
        formUtils.queryValue(clientMap[clientId]?.personalInfo?.customerRole)
      )
      .flatten()
      .compact()
      .value();

    // 其他客户的角色
    const otherCustomerRoles = lodash.uniq(otherCustomerRolesRaw);

    const ruleData = {
      customerRoles,
      otherCustomerRoles,
      primaryAgentChannelCode,
      mainCoverageIsTL,
      someBeneficiaryUnderage,
      someInsuredUnderage,
      isMainInsured,
    };

    const filteredConfig = lodash
      .chain(config)
      .filter((item) => {
        // 过滤是否可见
        if (!item.field) {
          return false;
        }

        const visible = lodash.get(item, 'field-props.visible');

        if (visible === 'Y') {
          return true;
        } else if (visible === 'C') {
          const visibleCondition = lodash.get(item, 'field-props.visible-condition');

          return RuleByData(visibleCondition, ruleData);
        }

        return false;
      })
      .map((item) => {
        // 可编辑条件
        const { 'field-props': fieldProps } = item;
        const { editable } = fieldProps;

        if (editable === 'C') {
          const editableCondition = lodash.get(item, 'field-props.editable-condition');
          // 用于限制同一role最多选中次数
          const roleCount = otherCustomerRolesRaw.filter((role) => role === item.field).length;

          return {
            ...item,
            'field-props': {
              ...fieldProps,
              editable: RuleByData(editableCondition, { ...ruleData, roleCount }) ? 'Y' : 'N',
            },
          };
        }

        return item;
      })
      .value();

    return lodash
      .chain(filteredConfig)
      .map((conf) => {
        const { field } = conf;
        const dict = roleDicts.find((d: any) => d.dictCode === field);

        if (dict) {
          const editable = lodash.get(conf, 'field-props.editable');

          return { ...dict, disabled: editable !== 'Y' };
        }

        return null;
      })
      .filter((dict) => !!dict)
      .value();
  }, [
    clientList,
    clientMap,
    config,
    id,
    roleDicts,
    someBeneficiaryUnderage,
    someInsuredUnderage,
    mainCoverageIsTL,
    primaryAgentChannelCode,
  ]);
};
