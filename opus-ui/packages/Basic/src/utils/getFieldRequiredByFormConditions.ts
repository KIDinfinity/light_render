import lodash from 'lodash';
import { Required, RuleByForm } from 'basic/components/Form';

export default ({ config, form, disabled }: any) => {
  const fieldProps: any = lodash.get(config, 'field-props', {});
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form);
  if (disabled) {
    return false;
  }
  const configOfRequred = config.required || fieldProps.required;
  if (configOfRequred === Required.Conditions) {
    return requiredConditions;
  }
  return configOfRequred === Required.Yes;
};
