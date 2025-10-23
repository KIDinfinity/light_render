import { useCallback } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import useGetContactInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetContactInfoList';
import { NAMESPACE } from '../activity.config';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  const contactInfoList = useGetContactInfoList({ id });

  return useCallback(
    ({ contactItemId }: any) => {
      const contactItem = lodash.find(contactInfoList, (item: any) => item.id === contactItemId);
      dispatch({
        type: `${NAMESPACE}/copyContactItem`,
        payload: {
          id,
          contactItem,
        },
      });
    },
    [id]
  );
};
