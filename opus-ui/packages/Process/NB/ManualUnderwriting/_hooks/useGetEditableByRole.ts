import { useMemo } from 'react';
import lodash from 'lodash';
import useGetEditableByConfig from 'basic/hooks/useGetEditableByConfig';
import useGetContextRoles from 'process/NB/ManualUnderwriting/Client/ClientProvider/hooks/useGetContextRoles';
import { caclculateSingleRule, Combine } from 'basic/components/Form/Rule';
import { Editable } from 'basic/components/Form';

interface IParams {
  editableConditions: boolean;
  config: any;
  localConfig: any;
}

export default ({ editableConditions, config, localConfig }: IParams) => {
  const editableByConfig = useGetEditableByConfig({
    editableConditions,
    config,
    localConfig,
  });

  const roles = useGetContextRoles();

  return useMemo(() => {
    const editableConfig = lodash.get(config, 'field-props.editable');
    const roleCondtions = lodash
      .chain(config)
      .get('field-props.editable-condition.conditions', [])
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

    const combine = lodash.get(config, 'field-props.editable-condition.combine');

    const editableByRole = (() => {
      if (editableConfig === Editable.Conditions) {
        if (lodash.isEmpty(roleCondtions)) {
          return true;
        }
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
              return allRoleResult;
            })();
            return calcResult;
          })
          .value();
        if (combine === Combine.AND) {
          return lodash.every(ruleCalcList, (result: boolean) => result);
        }
        if (combine === Combine.OR) {
          return lodash.some(ruleCalcList, (result: boolean) => result);
        }
        return false;
      } else {
        return editableConfig === Editable.Yes;
      }
    })();
    
    return editableByConfig && editableByRole;
  }, [editableByConfig, roles, config]);
};
