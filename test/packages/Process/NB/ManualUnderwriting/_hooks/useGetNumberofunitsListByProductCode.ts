import { useEffect, useMemo } from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetCfgPlanDictProduct from 'process/NB/ManualUnderwriting/_hooks/useGetCfgPlanDictProduct';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';

export default () => {
  const dispatch = useDispatch();
  const coverageList = useGetCoverageList();
  const numberofunitsList = useGetCfgPlanDictProduct();
  const lackCoreCodeList = useMemo(() => {
    const coreCodeList = lodash
      .chain(coverageList)
      .map((item) => formUtils.queryValue(item.coreCode))
      .value();
    const existCoreCodeList = lodash
      .chain(numberofunitsList)
      .map((item) => item.productCode)
      .value();
    return lodash.chain(existCoreCodeList).union(coreCodeList).xor(existCoreCodeList).value();
  }, [numberofunitsList, coverageList]);

  useEffect(() => {
    if (!lodash.isEmpty(lackCoreCodeList)) {
      dispatch({
        type: `${NAMESPACE}/getNumberofunitsList`,
        payload: {
          lackCoreCodeList,
        },
      });
    }
  }, [lackCoreCodeList, dispatch]);
};
