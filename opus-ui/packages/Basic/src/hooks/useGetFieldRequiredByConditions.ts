import { useMemo } from 'react';
import lodash from 'lodash';
import { Required, Rule } from 'basic/components/Form';

export default ({ config, localConfig, form, disabled }: any) => {
  const fieldProps: any = lodash.get(localConfig, 'field-props', {});
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  return useMemo(() => {
    if (disabled) {
      return false;
    }
    const configOfRequred = config.required || fieldProps.required;
    if (configOfRequred === Required.Conditions) {
      return requiredConditions;
    }
    return configOfRequred === Required.Yes;
  }, [config, disabled, requiredConditions, fieldProps]);
};
