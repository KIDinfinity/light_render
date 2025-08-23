import { useEffect } from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { tenant, Region } from '@/components/Tenant';
import ContactType from 'process/NB/ManualUnderwriting/Enum/ContactType';
import useJudgeIsEntityPolicyOwner from 'process/NB/ManualUnderwriting/_hooks/useJudgeIsEntityPolicyOwner';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import {v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';

export default ({ id }: any) => {
  const regionCode = tenant.region();
  const dispatch = useDispatch();
  const list = useGetClientDetailList();
  const isEntityPolicyOwner = useJudgeIsEntityPolicyOwner({ id });
  const currentContactInfoList = lodash
    .chain(list)
    .find((client: any) => client.id === id)
    .get('contactInfoList')
    .value();
  useEffect(() => {
    const MBContactSize = lodash
      .chain(currentContactInfoList)
      .filter((contact) => formUtils.queryValue(contact.contactType) === ContactType.Mobile)
      .size()
      .value();

    if (isEntityPolicyOwner) {
      if (MBContactSize < 2 && regionCode === Region.PH) {
        dispatch({
          type: `${NAMESPACE}/setMBContact`,
          payload: {
            id,
          },
        });
      }
    } else {
      if (lodash.isEmpty(currentContactInfoList)) {
        const newItemId = uuidv4();
        dispatch({
          type: `${NAMESPACE}/addContactInfoList`,
          payload: {
            id,
            itemId: newItemId,
            contactType: undefined,
            contactNo: undefined,
            contactSeqNum: 1,
          },
        });
      }
    }
  }, [dispatch, currentContactInfoList, id, regionCode, isEntityPolicyOwner]);
};
