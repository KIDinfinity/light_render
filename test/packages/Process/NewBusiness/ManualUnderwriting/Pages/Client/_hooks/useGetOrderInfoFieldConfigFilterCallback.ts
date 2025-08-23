import { useCallback } from 'react';
import lodash from 'lodash';
import { cacluateComboRule } from 'basic/components/Form/Rule';
import useGetOrderInfoFieldConfigCallback from './useGetOrderInfoFieldConfigCallback';

export default () => {
  const handleSetValue = useGetOrderInfoFieldConfigCallback();
  return useCallback(
    (config: any) => {
      const configWithValue = handleSetValue(config);
      return lodash
        .chain(configWithValue)
        .filter((fieldConfig: any) => {
          if (fieldConfig?.field === 'legalRepresentativeUuids') {
            return true;
          }
          const visible = lodash.get(fieldConfig, 'field-props.visible');
          const visibleCondition = lodash.get(fieldConfig, 'field-props.visible-condition');
          if (visible === 'N') {
            return false;
          }
          if (visible === 'C' && !!visibleCondition && !lodash.isEmpty(visibleCondition)) {
            return cacluateComboRule({
              ...visibleCondition,
            });
          }
          return true;
        })
        .value();
    },
    [handleSetValue]
  );
};
