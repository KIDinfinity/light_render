import { useContext, useMemo } from 'react';
import lodash from 'lodash';
import context from '../Context/context';

export default ({ indicator }: any) => {
  const { state } = useContext(context);
  const { pageAtomConfig } = lodash.pick(state, ['pageAtomConfig']);
  return useMemo(() => {
    return lodash.some(indicator, (value, key) => {
      const newValue = value?.trim ? value.trim() : value;
      if (
        ![null, 'N', 'NA', 'N/A'].includes(newValue) ||
        (lodash.includes(['saleSubChannel', 'gsIndicator'], key) && !!newValue)
      ) {
        const visible = lodash.get(
          lodash.chain(pageAtomConfig).find({ field: key }).value(),
          'field-props.visible'
        );
        return lodash.includes(['Y', 'C'], visible);
      }
      return false;
    });
  }, [indicator, pageAtomConfig]);
};
