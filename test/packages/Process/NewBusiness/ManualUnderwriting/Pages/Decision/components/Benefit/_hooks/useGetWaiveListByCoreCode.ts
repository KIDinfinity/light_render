import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetCurrentContractTypeProductDicts from './useGetCurrentContractTypeProductDicts';
import lodash from 'lodash';

export default () => {
  const dispatch = useDispatch();
  const dicts = useGetCurrentContractTypeProductDicts();
  const productCodes = useMemo(() => {
    return lodash.map(dicts, (item: any) => {
      return item?.productCode;
    });
  }, [dicts]);
  const handleLoadWaiveProductConfig = useCallback(
    ({ coreCodes }) => {
      if (!lodash.isEmpty(coreCodes)) {
        dispatch({
          type: `${NAMESPACE}/getCfgWaiverList`,
          payload: {
            coreCodes,
          },
        });
      }
    },
    [dispatch]
  );
  useEffect(() => {
    handleLoadWaiveProductConfig({ coreCodes: productCodes });
  }, [productCodes, handleLoadWaiveProductConfig]);
};
