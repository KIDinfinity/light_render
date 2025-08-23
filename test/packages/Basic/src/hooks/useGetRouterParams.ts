import { useMemo } from 'react';
import lodash from 'lodash';

export default ({ match, keys }: any) => {
  return useMemo(() => {
    return lodash.chain(match).get('params', {}).pick(keys).value();
  }, []);
};
