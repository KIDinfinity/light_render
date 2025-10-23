import { useCallback } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';
import owbNbCfgControllerService from '@/services/owbNbCfgControllerService';
import useGetProductCategory from 'process/NB/PremiumSettlement/_hooks/useGetProductCategory';
import { serialize as objectToFormData } from 'object-to-formdata';

export default () => {
  const dispatch = useDispatch();
  const productCategory = useGetProductCategory();
  return useCallback(
    async ({ paymentMethod }: any) => {
      const response = await owbNbCfgControllerService.getBankCodeFactoringHouseMap(
        objectToFormData({
          productCategory,
          paymentMethod,
        })
      );
      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
      if (success) {
        dispatch({
          type: `${NAMESPACE}/saveFactoringHouseList`,
          payload: {
            factoringHouseList: resultData,
          },
        });
      }
    },
    [productCategory]
  );
};
