import { useEffect } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { tenant, Region } from '@/components/Tenant';
import lodash from 'lodash';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default ({
  parentFieldName,
  id,
  field,
  fieldName,
  syncChangeValue,
  effect,
  parentField,
  readOnly,
}: any) => {
  const parentFieldData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.modalData?.entities?.clientMap?.[id]?.backgroundInfo?.[parentField],
    shallowEqual
  );
  const parentFieldDataReadOnly = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.clientMap?.[id]?.backgroundInfo?.[parentField],
    shallowEqual
  );
  const parentCode = readOnly ? parentFieldDataReadOnly : formUtils.queryValue(parentFieldData);
  const parentFieldTouched = parentFieldData?.touched;
  const dispatch = useDispatch();
  const dicts = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.linkDicts[`${parentFieldName}-${parentCode}`],
    shallowEqual
  );
  useEffect(() => {
    tenant.region({
      [Region.ID]: async () => {
        const resultData = await dispatch({
          type: `${NAMESPACE}/getLinkDicts`,
          payload: { parentCode, parentFieldName, id, field, syncChangeValue, effect },
        });
        const resultDicts = lodash.filter<any>(
          resultData,
          (item: any) => item?.typeCode === fieldName
        );
        if (syncChangeValue && parentFieldTouched) {
          await dispatch({
            type: `${NAMESPACE}/${effect}`,
            payload: {
              changedFields: {
                [field]: { name: 'field', value: resultDicts?.[0]?.dictCode, touched: true },
              },
              id,
            },
          });
        }
      },
      notMatch: null,
    });
  }, [parentCode, parentFieldName, parentFieldTouched]);
  return lodash.filter(dicts, (item) => item.typeCode === fieldName) || [];
};
