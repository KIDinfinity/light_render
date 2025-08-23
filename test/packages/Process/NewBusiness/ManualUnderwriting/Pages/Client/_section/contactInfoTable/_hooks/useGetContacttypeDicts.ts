import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ config, fieldConfig, contactSeqNum, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const defaultDicts = getDrowDownList({ config, fieldProps });
  const contactInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.contactInfoList`
          : `modalData.entities.clientMap.${id}.contactInfoList`
      ),
    shallowEqual
  );
  const contactInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly ? `entities.contactInfoMap` : `modalData.entities.contactInfoMap`
      ),
    shallowEqual
  );
  const haveMBContactType = lodash.some(
    contactInfoList,
    (contactId) => formUtils.queryValue(contactInfoMap?.[contactId]?.contactType) === 'MB'
  );

  return tenant.region({
    [Region.ID]:
      contactSeqNum === 1 || !haveMBContactType
        ? lodash.filter(defaultDicts, (item) => ['MB'].includes(item.dictCode))
        : lodash.filter(defaultDicts, (item) => ['HM', 'OF'].includes(item.dictCode)),
    notMatch: defaultDicts,
  });
};
