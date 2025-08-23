import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { tenant, Region } from '@/components/Tenant';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ id, contactItemId, contactSeqNum }: any) => {
  const regionCode = tenant.region();
  const dispatch = useDispatch();
  useEffect(() => {
    if (regionCode === Region.ID && contactSeqNum === 1) {
      dispatch({
        type: `${NAMESPACE}/changeContactInfoFields`,
        payload: {
          changedFields: {
            contactType: 'MB',
          },
          id,
          contactItemId,
        },
      });
    }
  }, []);
};
