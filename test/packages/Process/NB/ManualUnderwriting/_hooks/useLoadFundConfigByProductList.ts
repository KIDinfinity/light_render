import { useEffect } from 'react';
import { useDispatch } from 'dva';
import useGetCoverageProductList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageProductList';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const productList = useGetCoverageProductList();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getFundConfigListByProductCodeList`,
      payload: {
        productCodeList: productList,
      },
    });
  }, []);
};
