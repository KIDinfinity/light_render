import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';

export default () => {
  const activeLanguage = useSelector((state: any) => state.language.activeLanguage);
  const bankCodeList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.bankCodeList,
    shallowEqual
  );

  return useMemo(() => {
    return lodash.filter(bankCodeList, (item) => item.language === activeLanguage);
  }, [activeLanguage, bankCodeList]);
};
