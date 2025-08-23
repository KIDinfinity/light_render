import { useCallback } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetContactInfoById from 'process/NB/ManualUnderwriting/_hooks/useGetContactInfoById';
import ContactType from 'process/NB/ManualUnderwriting/Enum/ContactType';
import { formUtils } from 'basic/components/Form';

export default ({ clientId, contactId }: any) => {
  const dispatch = useDispatch();
  const contactInfo = useGetContactInfoById({ clientId, contactId });
  return useCallback(
    (value) => {
      const relateFieldKey = (() => {
        const contactType = formUtils.queryValue(contactInfo.contactType);
        if (contactType === ContactType.Mobile) {
          return 'phoneNo';
        }
        if (contactType === ContactType.Home) {
          return 'homeNumber';
        }
        if (contactType === ContactType.Office) {
          return 'workNumber';
        }
      })();
      const relateFieldValue = (() => {
        const contactNo = formUtils.queryValue(contactInfo.contactNo);
        const countryCode = formUtils.queryValue(value);
        return lodash
          .chain([countryCode, contactNo])
          .filter((item: any) => !!item)
          .join('')
          .value();
      })();
      dispatch({
        type: `${NAMESPACE}/changeBasicInfoFields`,
        payload: {
          id: clientId,
          changedFields: {
            [relateFieldKey]: relateFieldValue,
          },
        },
      });
    },
    [dispatch, clientId, contactInfo]
  );
};
