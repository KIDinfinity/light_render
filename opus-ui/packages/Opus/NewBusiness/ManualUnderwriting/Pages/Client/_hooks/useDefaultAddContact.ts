import { useEffect } from 'react';

import { useDispatch } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import type { ContactType } from 'opus/NewBusiness/ManualUnderwriting/_enum';
import useGetContactIdByType from './useGetContactIdByType';

interface IParams {
  clientId: string;
  type: ContactType;
}

export default ({ clientId, type }: IParams) => {
  const dispatch = useDispatch();
  const contactId = useGetContactIdByType({
    clientId,
    mode: 'edit',
    type,
  });

  useEffect(() => {
    if (!contactId) {
      dispatch({
        type: `${NAMESPACE}/addContactInfo`,
        payload: {
          id: clientId,
          changedValues: { contactType: type, contactSeqNum: 1 },
        },
      });
    }
  }, [contactId, clientId, type]);
};
