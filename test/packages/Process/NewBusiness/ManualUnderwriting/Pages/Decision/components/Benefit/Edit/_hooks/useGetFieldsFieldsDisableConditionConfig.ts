import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetRoleDisplayConfigCode from 'basic/components/Elements/hooks/useGetRoleDisplayConfigCode';

export default () => {
  const roleDisplayConfigCode = useGetRoleDisplayConfigCode();
  const atomGroupCode = `${roleDisplayConfigCode}_disable_condition`;
  const config = useSelector((state: any) => {
    return lodash.get(state, `atomConfig.groups.${atomGroupCode}`, []);
  }, shallowEqual);
  return config;
};
