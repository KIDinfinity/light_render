import { useEffect, useMemo } from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

export default () => {
  const dispatch = useDispatch();
  const coverageList = useGetCoverageList('edit');
  const numberofunitsList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.numberofunitsList,
    shallowEqual
  );
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
