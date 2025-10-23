import { useMemo } from 'react';
import lodash from 'lodash';
import useGetRequriedByConfig from 'basic/hooks/useGetRequriedByConfig';
import useGetContextRoles from 'process/NB/ManualUnderwriting/Client/ClientProvider/hooks/useGetContextRoles';
import useGetRegionalDefaultValue from 'process/NB/ManualUnderwriting/_hooks/useGetRegionalDefaultValue';
import { caclculateSingleRule, Combine, Operator } from 'basic/components/Form/Rule';
import { Required } from 'basic/components/Form';

interface IParams {
  requiredConditions: boolean;
  config: any;
  localConfig: any;
}

export default ({ requiredConditions, config, localConfig }: IParams) => {
  const rqeuiredByConfig = useGetRequriedByConfig({
    requiredConditions,
    config,
    localConfig,
  });

  const specialMandatoryFieldRole = useGetRegionalDefaultValue({
    codeType: 'SPECIAL_MANDATORY_FIELD_ROLE',
  });

  const roles = useGetContextRoles();

  return useMemo(() => {
    const requiredConfig = lodash.get(config, 'field-props.required');
    const roleCondtions = lodash
      .chain(config)
      .get('field-props.required-condition.conditions')
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

    const combine = lodash.get(config, 'field-props.required-condition.combine');

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
