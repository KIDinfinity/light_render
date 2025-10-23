import lodash from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import useGetBasicProductData from 'process/NB/ManualUnderwriting/_hooks/useGetBasicProductData';

export default () => {
  const dispatch = useDispatch();
  const basicProduct = useGetBasicProductData();
  const productCode = formUtils.queryValue(lodash.get(basicProduct, 'coreCode'));
  useEffect(() => {
    dispatch({
      type: 'dictionaryController/loadDictsByParentCode',
      payload: {
        parentCode: productCode,
        parentFieldName: 'productCode',
      },
    });
  }, [productCode]);
};
