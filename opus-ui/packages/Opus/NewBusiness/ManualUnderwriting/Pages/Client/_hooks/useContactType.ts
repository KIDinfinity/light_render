import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

const useGetExistCodes = ({ id, readOnly, field, value }: any) => {
  const contactInfoList = useSelector(
    ({ [NAMESPACE]: modal }: any) =>
      lodash.get(
        modal,
        readOnly
          ? `entities.clientMap.${id}.contactInfoList`
          : `modalData.entities.clientMap.${id}.contactInfoList`
      ),
    shallowEqual
  );

  const contactInfoMap = useSelector(
    ({ [NAMESPACE]: modal }: any) =>
      lodash.get(modal, readOnly ? `entities.contactInfoMap` : `modalData.entities.contactInfoMap`),
    shallowEqual
  );
  const existCodes = lodash
    .chain(contactInfoList)
    .map((itemId) => formUtils.queryValue(lodash.get(contactInfoMap, `${itemId}.${field}`)))
    .filter((code) => code !== value)
    .value();
  return existCodes;
};

export { useGetExistCodes };
