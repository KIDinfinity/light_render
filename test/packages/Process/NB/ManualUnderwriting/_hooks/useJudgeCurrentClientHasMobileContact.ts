import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import { formUtils } from 'basic/components/Form';

export default ({ id }: any) => {
  const list = useGetClientDetailList();

  return useMemo(() => {
    return lodash
      .chain(list)
      .find((client: any) => client.id === id)
      .get('contactInfoList', [])
      .some((contactItem: any) => ['MB'].includes(formUtils.queryValue(contactItem.contactType)))
      .value();
  }, [list, id]);
};
