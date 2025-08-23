import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { useEffect } from 'react';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';

export default () => {
  const coverageList = useGetCoverageList('edit');
  const dispatch = useDispatch();
  const deductibleOptionList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.deductibleOptionList,
    shallowEqual
  );
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getDeductibleOptionList`,
      payload: {
        coverageList,
      },
    });
  }, [coverageList, dispatch]);
  return deductibleOptionList;
};
