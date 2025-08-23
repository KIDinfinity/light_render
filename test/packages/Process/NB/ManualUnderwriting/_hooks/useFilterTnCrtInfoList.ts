import { useMemo } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';

export default ({ data, Edit, id }: any) => {
  const dispatch = useDispatch();
  return useMemo(() => {
    const filterData = tenant.region({
      [Region.MY]: lodash
        .chain(data)
        .filter(
          (item: any) =>
            formUtils.queryValue(item.ctfType) === 'TN' && formUtils.queryValue(item.type) === 'S'
        )
        .value(),
      [Region.ID]: lodash
        .chain(data)
        .filter((item) => item?.ctfType === 'TN' && item?.type === 'S' && item.deleted!==1 && item.ctfCountryCode !== "RI")
        .value(),
      notMatch: lodash
        .chain(data)
        .filter(
          (item: any) =>
            formUtils.queryValue(item.ctfType) === 'TN' &&
            formUtils.queryValue(item.type) === 'S' &&
            formUtils.queryValue(item.ctfCountryCode) !== 'RI'
        )
        .value(),
    });
    const lastData = filterData[filterData.length - 1];
    if (
      Edit &&
      (lodash.isNil(lastData) ||
      filterData.every((item: any) => {
          return !lodash.isNil(formUtils.queryValue(item.ctfCountryCode));
        }))
    ) {
      const newItemId = uuidv4();
      dispatch({
        type: `${NAMESPACE}/addTnCrtInfoList`,
        payload: {
          id,
          itemId: newItemId,
          ctfCountryCode: undefined,
          ctfId: undefined,
          reasonflag: undefined,
          reason: undefined,
          ctfType: 'TN',
          type: 'S',
        },
      });
    }
    filterData.sort((a, b) => {
      if (
        lodash.isNil(formUtils.queryValue(a.ctfCountryCode)) &&
        !lodash.isNil(formUtils.queryValue(b.ctfCountryCode))
      ) {
        return 1;
      } else if (
        !lodash.isNil(formUtils.queryValue(a.ctfCountryCode)) &&
        lodash.isNil(formUtils.queryValue(b.ctfCountryCode))
      ) {
        return -1;
      } else {
        return 0;
      }
    });
    return filterData;
  }, [data]);
};
