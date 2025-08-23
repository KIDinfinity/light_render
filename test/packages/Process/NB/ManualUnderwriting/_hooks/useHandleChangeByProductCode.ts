import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetProductCodeConfig from 'process/NB/ManualUnderwriting/_hooks/useGetProductCodeConfig';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  const takeOverList =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.businessData?.takeOverList
    ) || [];

  const item = useMemo(() => {
    return formUtils.formatFlattenValue(
      formUtils.cleanValidateData(lodash.find(takeOverList, (dataItem: any) => dataItem.id === id))
    );
  }, [id, takeOverList]);
  const productCodeConfig = useGetProductCodeConfig({
    policyNo: item?.policyNo,
  });
  return useCallback(
    (e) => {
      dispatch({
        type: `${NAMESPACE}/updateTakeOverInfoByProductCode`,
        payload: {
          policyNo: item?.policyNo,
          productCode: e,
          id,
          productCodeConfig,
        },
      });
    },
    [id, item]
  );
};
