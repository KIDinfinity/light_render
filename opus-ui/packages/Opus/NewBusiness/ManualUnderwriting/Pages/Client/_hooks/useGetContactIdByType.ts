import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { useMemo } from 'react';
import type { ContactType } from 'opus/NewBusiness/ManualUnderwriting/_enum';
import { formUtils } from 'basic/components/Form';

interface IParams {
  mode: 'edit' | 'show';
  clientId: string;
  type: ContactType;
}

export default ({ clientId, mode, type }: IParams) => {
  const contactInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        `${mode === 'edit' ? 'modalData.' : ''}entities.clientMap.${clientId}.contactInfoList`,
        []
      ),
    shallowEqual
  );

  const contactInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        `${mode === 'edit' ? 'modalData.' : ''}entities.contactInfoMap`,
        []
      ),
    shallowEqual
  );

  return useMemo(() => {
    return lodash.find(contactInfoList, (id) => {
      const contactType = formUtils.queryValue(contactInfoMap[id]?.contactType);
      return !contactType || contactType === type;
    });
  }, [contactInfoList, contactInfoMap, type]);
};
