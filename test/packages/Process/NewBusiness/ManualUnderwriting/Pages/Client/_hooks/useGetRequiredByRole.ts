import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import useGetRequriedByConfig from 'basic/hooks/useGetRequriedByConfig';
import { caclculateSingleRule, Combine, Operator } from 'basic/components/Form/Rule';
import { Required, formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

interface IParams {
  requiredConditions: boolean;
  config: any;
  localConfig: any;
  clientId: string;
}

export default ({ requiredConditions, config, localConfig, clientId }: IParams) => {
  const rqeuiredByConfig = useGetRequriedByConfig({
    requiredConditions,
    config,
    localConfig,
  });
  const specialMandatoryFieldRole = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace?.regionalDefaultValue?.SPECIAL_MANDATORY_FIELD_ROLE,
    shallowEqual
  );
  let roles = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace?.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
    shallowEqual
  );
  roles = formUtils.queryValue(roles);

  return useMemo(() => {
    const requiredConfig = lodash.get(config, 'required');
    const roleCondtions = lodash
      .chain(config)
      .get('required-condition.conditions')
      .filter((condition: any) => {
        return lodash.isEqual(condition?.left, { domain: 'field', field: 'customerRole' });
      })
      .map((condition: any) => {
        return {
          ...condition,
          left: roles,
        };
      })
      .value();
    const combine = lodash.get(config, 'required-condition.combine');

    const matchSpecilRole = (() => {
      return lodash.includes(roles, specialMandatoryFieldRole) && !!specialMandatoryFieldRole;
    })();
    const requiredByRole = (() => {
      if (requiredConfig === Required.Conditions) {
        const ruleCalcList = lodash
          .chain(roleCondtions)
          .map((condition: any) => {
            const calcResult = (() => {
              const allRoleResult: boolean = lodash.some(roles, (role) => {
                return caclculateSingleRule({
                  left: role,
                  operator: condition.operator,
                  right: condition.right,
                });
              });
              const singleRoleResult = lodash.some([specialMandatoryFieldRole], (role) => {
                return caclculateSingleRule({
                  left: role,
                  operator: condition.operator,
                  right: condition.right,
                });
              });
              if (matchSpecilRole && condition.operator === Operator.IN) {
                return singleRoleResult;
              }
              return allRoleResult;
            })();
            return calcResult;
          })
          .value();
        if (lodash.isEmpty(ruleCalcList)) {
          return false;
        }
        if (combine === Combine.AND) {
          return lodash.every(ruleCalcList, (result: boolean) => result);
        }
        if (combine === Combine.OR) {
          return lodash.some(ruleCalcList, (result: boolean) => result);
        }
        return false;
      } else {
        return false;
      }
    })();

    return matchSpecilRole ? requiredByRole : rqeuiredByConfig || requiredByRole;
  }, [rqeuiredByConfig, roles, config, specialMandatoryFieldRole]);
};
