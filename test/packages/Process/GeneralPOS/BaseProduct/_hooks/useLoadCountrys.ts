import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { serialize as objectToFormData } from 'object-to-formdata';
import { getAddressSubListV2 } from '@/services/miscCfgInquiryControllerService';
import { NAMESPACE } from '../activity.config';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const response = await getAddressSubListV2(
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
