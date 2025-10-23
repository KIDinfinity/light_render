import { useCallback } from 'react';
import { useDispatch } from 'dva';
import useGetClientDetailById from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailById';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import ContactType from 'process/NB/ManualUnderwriting/Enum/ContactType';
import lodash from 'lodash';

export default ({ clientId, contactId, isLast }: any) => {
  const dispatch = useDispatch();
  const clientInfo = useGetClientDetailById({ clientId });
  return useCallback(
    (value) => {
      const contactType = formUtils.queryValue(value);
      const supplementValues = (() => {
        const { contactInfoList = [] } = clientInfo;
        // 已有对应contactType条目时不自动填充
        const hasDuplicate = contactInfoList.some((item: any) => item.contactType === contactType);

        if (contactType === ContactType.Mobile) {
          return {
            contactSeqNum: 1,
            contactNo: !hasDuplicate ? formUtils.queryValue(clientInfo.phoneNo) : '',
          };
        }
        if (contactType === ContactType.Home) {
          return {
            contactSeqNum: 2,
            contactNo: !hasDuplicate ? formUtils.queryValue(clientInfo.homeNumber) : '',
          };
        }
        if (contactType === ContactType.Office) {
          return {
            contactSeqNum: 3,
            contactNo: !hasDuplicate ? formUtils.queryValue(clientInfo.workNumber) : '',
          };
        }
        if (contactType === ContactType.Fax) {
          return {
            contactSeqNum: 4,
          };
        }
      })();
      if (isLast) {
        dispatch({
          type: `${NAMESPACE}/addContactItem`,
          payload: {
            id: clientId,
          },
        });
      }
      if (!lodash.isEmpty(supplementValues)) {
        return dispatch({
          type: `${NAMESPACE}/changeContactInfoFields`,
          payload: {
            changedFields: {
              ...supplementValues,
            },
            id: clientId,
            contactItemId: contactId,
          },
        });
      }
    },
    [dispatch, clientId, contactId, clientInfo]
  );
};

