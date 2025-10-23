import { useMemo } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import dropEmptyData from 'process/NB/ManualUnderwriting/utils/dropEmptyData';
import { NAMESPACE } from '../activity.config';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  const list = useGetClientDetailList();
  const currentContactInfoList = lodash
    .chain(list)
    .find((client: any) => client.id === id)
    .get('contactInfoList')
    .value();
  return useMemo(() => {
    const haveEmptyContactInfo = lodash.find(currentContactInfoList, (item) => {
      return dropEmptyData({ objItem: item, loseFileds: ['id', 'contactSeqNum'] });
    });
    if (!haveEmptyContactInfo) {
      dispatch({
        type: `${NAMESPACE}/addContactItem`,
        payload: {
          id,
        },
      });
    }
  }, [currentContactInfoList, id]);
};
