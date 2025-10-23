import { useMemo } from 'react';
import { Editable } from 'basic/components/Form';

interface IParams {
  editableConditions: boolean;
  config: any;
  localConfig: any;
}

export default ({ config, localConfig, editableConditions }: IParams) => {
  return useMemo(() => {
    return config?.['field-props']?.editable === Editable.Conditions ||
      config?.editable === Editable.Conditions
      ? editableConditions
      : (config?.editable ||
          config?.['field-props']?.editable ||
          localConfig['field-props'].editable) === Editable.Yes;
  }, [config, localConfig, editableConditions]);
};
