import { useContext, useMemo } from 'react';
import Context from 'summary/Context';
import lodash from 'lodash';

export default () => {
  const { state }: any = useContext(Context);
  return useMemo(() => {
    return lodash.get(state, 'summarySectionConfig', []);
  }, [state]);
};
