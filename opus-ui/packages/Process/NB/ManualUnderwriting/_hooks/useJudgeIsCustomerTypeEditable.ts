import { useMemo } from 'react';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import lodash from 'lodash';
import CustomerRole from 'basic/enum/CustomerRole';

const DisabledRoleMap = [CustomerRole.Insured, CustomerRole.Beneficiary];

export default (id: string | number | undefined): boolean => {
  const list = useGetClientDetailList(); // 获取clientInfoList
  return useMemo(() => {
    const Rolelist = lodash
      .chain(list)
      .find((item: any) => {
        // 找到匹配clientInfo
        return item?.id === id;
      })
      // 提取roleList
      .get('roleList', [])
      // 提取cusomerRole的数组
      .map((item: any) => {
        return lodash.get(item, 'customerRole');
      })
      .value();

    if (Rolelist?.length > 0 && Rolelist?.length) {
      // 判断当单个或两个role时候属于关键CustomerRole
      const count = lodash.reduce(
        Rolelist,
        (sum: number, i: CustomerRole) => {
          if (DisabledRoleMap.includes(i)) {
            // eslint-disable-next-line no-param-reassign
            return (sum += 1);
          }
          return sum;
        },
        0
      );
      return count === Rolelist?.length;
    }

    return false;
  }, [list, id]);
};
