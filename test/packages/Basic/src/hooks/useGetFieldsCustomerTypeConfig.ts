import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

export default ({ atomGroupCode }: any) => {
  const config = useSelector((state: any) => {
    return lodash.get(state, `atomConfig.groups.${atomGroupCode}`, []);
  }, shallowEqual);
  return config;
};
