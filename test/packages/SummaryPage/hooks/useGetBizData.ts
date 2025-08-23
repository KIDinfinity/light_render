import { useContext, useMemo } from 'react';
import Context from 'summary/Context';
import lodash from 'lodash';

export default () => {
  const { state } = useContext(Context);

  return useMemo(() => {
    return lodash.chain(state).get('businessData').value();
  }, [state]);
};
