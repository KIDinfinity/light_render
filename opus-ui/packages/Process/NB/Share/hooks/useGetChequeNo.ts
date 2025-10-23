import { useMemo } from 'react';
import lodash from 'lodash';
import useGetChequeInfoList from 'process/NB/Share/hooks/useGetChequeInfoList';

export default () => {
  const chequeInfoList = useGetChequeInfoList();
  return useMemo(() => {
    return lodash.chain(chequeInfoList).first().get('chequeNo').value();
  }, [chequeInfoList]);
};
