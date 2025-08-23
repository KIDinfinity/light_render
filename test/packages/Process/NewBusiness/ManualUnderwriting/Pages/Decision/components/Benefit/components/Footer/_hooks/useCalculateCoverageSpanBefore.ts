import { useMemo } from 'react';
import lodash from 'lodash';
import useGetDecisionColumnsMW from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetDecisionColumnsMW.ts';

export default ({ field }: any) => {
  const sectionConfig = useGetDecisionColumnsMW();

  return useMemo(() => {
    const currentFieldOrder = lodash
      .chain(sectionConfig)
      .find((fieldConfig: any) => {
        return fieldConfig?.field === field;
      })
      .get('field-props.x-layout.lg.order')
      .toNumber()
      .value();
    return lodash
      .chain(sectionConfig)
      .filter((fieldConfig: any) => {
        return lodash.get(fieldConfig, 'field-props.visible') !== 'N';
      })
      .filter((fieldConfig: any) => {
        const order = lodash
          .chain(fieldConfig)
          .get('field-props.x-layout.lg.order')
          .toNumber()
          .value();
        return order < currentFieldOrder;
      })
      .map((fieldConfig: any) => lodash.get(fieldConfig, 'field-props.x-layout.lg.span'))
      .reduce((sum, n) => {
        return sum + n;
      }, 0)
      .value();
  }, [sectionConfig]);
};
