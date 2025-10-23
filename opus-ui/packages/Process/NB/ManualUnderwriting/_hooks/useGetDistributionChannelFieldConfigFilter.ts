import { useMemo } from 'react';
import lodash from 'lodash';
import { cacluateComboRule } from 'basic/components/Form/Rule';
import useGetDistributionChannelFieldConfig from 'process/NB/ManualUnderwriting/_hooks/useGetDistributionChannelFieldConfig';

export default ({ localConfig }: any) => {
  const config = useGetDistributionChannelFieldConfig({
    localConfig,
  });
  return useMemo(() => {
    return lodash
      .chain(config)
      .filter((fieldConfig: any) => {
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
  }, [config]);
};
