import { useMemo } from 'react';
import lodash from 'lodash';
import useGetColumnsByCondition from './useGetColumnsByCondition';
import useGetCustomerType from 'process/NB/hooks/useGetCustomerType';

export default ({ columnList, item, atomConfig }: any) => {
  const newColumnList = useGetColumnsByCondition({ columnList, data: item });
  return useMemo(() => {
    let finalColumnList: any = [];
    if (lodash.isEmpty(item?.roleList)) {
      finalColumnList = newColumnList;
    }
    if (!lodash.isEmpty(item?.roleList)) {
      lodash.forEach(newColumnList, (column: any) => {
        const atomCodeSet = new Set();
        lodash.forEach(item?.roleList, (role: any) => {
          const key = (() => {
            return `BP_NB_CTG001_BP_NB_ACT002_${role?.customerRole}_${useGetCustomerType(
              item
            )}_CurrentClientInfo-Table_fields_${column?.field}`;
          })();
          atomCodeSet.add(key);
          const relateAtom = lodash.filter(atomConfig, (atom) => {
            return atomCodeSet.has(atom.atomCode);
          });
          if (column?.field === 'primaryExpiryDate' || column?.field === 'ctfStartDate') {
          }
          if (
            column?.visible === 'Y' &&
            relateAtom?.length &&
            lodash.some(relateAtom, (atom) => atom.applicable === 'Y')
          ) {
            finalColumnList.push(column);
          }
        });
      });
    }
    return lodash.uniq(finalColumnList);
  }, [newColumnList, item, atomConfig]);
};
