import { useMemo } from 'react';
import lodash from 'lodash';
import { Visible, RuleByForm } from 'basic/components/Form';

export default ({ config, fieldConfig, form }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = !RuleByForm(fieldProps['visible-condition'], form);
  return useMemo(() => {
    const visible = (() => {
      if (lodash.has(config, 'field-props')) {
        return lodash.get(config, 'field-props.visible', true);
      }
      return lodash.get(config, 'visible', true);
    })();
    if (visible === Visible.No) {
      return false;
    }
    if (visible === Visible.Conditions) {
      return visibleConditions;
    }
    if (visible === Visible.Yes) {
      return true;
    }
    return true;
  }, [config, visibleConditions]);
};
