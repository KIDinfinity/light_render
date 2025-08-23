import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { serialize as objectToFormData } from 'object-to-formdata';
import { getAddressSubListV3 } from '@/services/miscCfgInquiryControllerService';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const response = await getAddressSubListV3(
        objectToFormData({
          parentCode: '',
        })
      );
      dispatch({
        type: `${NAMESPACE}/setCountrys`,
        payload: {
          countrys: response,
        },
      });
    })();
  }, []);
};
