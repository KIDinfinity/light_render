import { useMemo, useEffect } from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';

import { tenant } from '@/components/Tenant';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import { NAMESPACE } from '../../activity.config';

export default ({ payeeId }: any) => {
  const dispatch = useDispatch();

  const Dropdown_COM_CountryCode = getDrowDownList('Dropdown_COM_CountryCode');
  const countryCode =
    lodash
      .chain(Dropdown_COM_CountryCode)
      .find((el: any) => el.dictCode === tenant.region())
      .get('dictName')
      .value() || '';

  useEffect(() => {
    if (countryCode && !lodash.isEmpty(countryCode)) {
      dispatch({
        type: `${NAMESPACE}/initPayeeItem`,
        payload: {
          payeeId,
          countryCode,
        },
      });
    }
  }, [countryCode]);

  return useMemo(() => {
    return countryCode;
  }, [countryCode]);
};
