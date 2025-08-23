import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ form, field }: any) => {
  const dispatch = useDispatch();
  const childrenFieldName = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.addressDict?.[field]?.childrenFieldName,
    shallowEqual
  );
  const parentFieldName = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addressDict?.[field]?.parentFieldName,
    shallowEqual
  );
  const parentFieldValue = parentFieldName && form ? form.getFieldValue(parentFieldName) : '';
  const dicts = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.addressDict?.[field]?.[parentFieldValue],
    shallowEqual
  );

  const handleLoadSubAddress = (parentCode: string) => {
    dispatch({
      type: `${NAMESPACE}/getAddressList`,
      payload: { parentCode: parentCode, fieldName: childrenFieldName },
    });
  };

  return { dicts, handleLoadSubAddress };
};
