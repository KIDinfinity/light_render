import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';

export default () => {
  const list = useGetClientDetailList();
  return useMemo(() => {
    const isRoleList: any = [];
    let isRole = false;
    lodash.forEach(list, (item: any) => {
      const roleGroup: string[] = [];
      const roleList = lodash.get(item, 'roleList', []);
      lodash.forEach(roleList, (e: any) => {
        roleGroup.push(e?.customerRole);
      });
      if (roleGroup.includes('CUS001') && roleGroup.includes('CUS002')) {
        isRole = true;
        isRoleList.push(isRole);
      } else {
        isRole = false;
        isRoleList.push(isRole);
      }
    });
    if (lodash.includes(isRoleList, true)) {
      return true;
    }
    return false;
  }, [list]);
};
