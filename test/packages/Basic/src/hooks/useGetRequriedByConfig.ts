import { useMemo } from 'react';
import { Required } from 'basic/components/Form';

interface IParams {
  requiredConditions: boolean;
  config: any;
  localConfig: any;
}

export default ({ config, localConfig, requiredConditions }: IParams) => {
  return useMemo(() => {
    return config?.['field-props']?.required === Required.Conditions ||
      config?.required === Required.Conditions
      ? requiredConditions
      : (config?.required ||
          config?.['field-props']?.required ||
          localConfig['field-props'].required) === Required.Yes;
  }, [config, localConfig, requiredConditions]);
};
