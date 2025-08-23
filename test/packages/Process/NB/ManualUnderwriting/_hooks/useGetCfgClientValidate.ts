import { useEffect } from 'react';
import lodash from 'lodash';
import { getCfgClientValidate } from '@/services/owbNbCfgControllerService';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { serialize as objectToFormData } from 'object-to-formdata';

export default () => {
  const dispatch = useDispatch();
  const addrTypeDicts = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.addrTypeDicts,
    shallowEqual
  );
  useEffect(() => {
    (async () => {
      if (lodash.isEmpty(addrTypeDicts)) {
        const response: any = await getCfgClientValidate(objectToFormData({ infoType: 'A' }));
        if (
          lodash.isPlainObject(response) &&
          response?.success &&
          !lodash.isEmpty(response?.resultData)
        ) {
          await dispatch({
            type: `${NAMESPACE}/setAddrTypeDicts`,
            payload: {
              addrTypeDicts: response?.resultData,
            },
          });
        }
      }
    })();
  }, []);
};
