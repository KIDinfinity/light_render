import { useMemo } from 'react';
import lodash from 'lodash';
import { Editable, Rule } from 'basic/components/Form';

export default ({ editable, config, localConfig, form, namespace = '' }: any) => {
  const fieldProps: any = localConfig['field-props'];
  const editableOfConfig = lodash.get(config, 'field-props.editable') || fieldProps?.editable;
  const conditionResult = !Rule(fieldProps['editable-condition'], form, namespace);
  return useMemo(() => {
    if (!editable) {
      return true;
    }
    if (editableOfConfig === Editable.Conditions) {
      return conditionResult;
    }
    return editableOfConfig === 'N';
  }, [editable, conditionResult, editableOfConfig]);
};
