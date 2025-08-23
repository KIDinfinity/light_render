import React from 'react';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { useSelector, useDispatch,  } from 'dva';
import { shallowEqual } from 'react-redux';

export default () => {
  const addProduct = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addDPRemarkSelectedProduct,
    shallowEqual
  );
  const dispatch = useDispatch();
  return React.useCallback(
    (value: any) => {
      if (!addProduct?.name || !value) return;
      if (addProduct?.name === '') return;
      if (addProduct?.name === value) return;
      dispatch({
        type: `${NAMESPACE}/changeSelectedDPRemarkProductFields`,
        payload: {
          changedFields: { productName: null },
        },
      });
    },
    [addProduct?.name, dispatch]
  );
};
