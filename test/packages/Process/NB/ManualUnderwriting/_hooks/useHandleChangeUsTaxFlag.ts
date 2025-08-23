import { useCallback } from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { tenant, Region } from '@/components/Tenant';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import useGetCrtInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetCrtInfoList';
export default ({ id, crtItemId, name }: any) => {
  const dispatch = useDispatch();
  const crtInfoList = useGetCrtInfoList({ id });

  return useCallback(
    (e) => {
      const newCrtInfoList = lodash
        .chain(crtInfoList)
        .map((item: any) => {
          if (item?.id === crtItemId) {
            return {
              ...item,
              [name]: e,
            };
          }
          return item;
        })
        .value();
      const usTaxFlag = (() => {
        return tenant.region({
          [Region.ID]: () => {
            if (
              lodash
                .chain(newCrtInfoList)
                .some((item: any) => {
                  return lodash
                    .chain(item)
                    .entries()
                    .some((fieldItem: any) => {
                      const targetFields = ['ctfCountryCode', 'ctfId', 'reason'];
                      const [key, value] = fieldItem;
                      if (lodash.includes(targetFields, key) && !!formUtils.queryValue(value)) {
                        return true;
                      }
                      return false;
                    });
                })
                .value()
            ) {
              return 'Y';
            }
            return 'N';
          },
          [Region.MY]: () => {
            if (
              lodash
                .chain(newCrtInfoList)
                .some((item: any) => {
                  return lodash
                    .chain(item)
                    .entries()
                    .some((fieldItem: any) => {
                      const targetFields = ['ctfCountryCode', 'ctfId', 'reason'];
                      const [key, value] = fieldItem;
                      if (lodash.includes(targetFields, key) && !!formUtils.queryValue(value)) {
                        return true;
                      }
                      return false;
                    });
                })
                .value()
            ) {
              return 'Y';
            }
            return 'N';
          },
          notMatch: () => {
            if (
              lodash
                .chain(newCrtInfoList)
                .some((fieldItem: any) => {
                  return (
                    formUtils.queryValue(fieldItem?.ctfType) === 'TN' &&
                    formUtils.queryValue(fieldItem?.ctfCountryCode) === 'USA'
                  );
                })
                .value()
            ) {
              return 'Y';
            }
            return 'N';
          },
        });
      })();
      dispatch({
        type: `${NAMESPACE}/changeBasicInfoFields`,
        payload: {
          changedFields: {
            usTaxFlag,
          },
          id,
        },
      });
    },
    [crtInfoList, crtItemId, dispatch, id, name]
  );
};
