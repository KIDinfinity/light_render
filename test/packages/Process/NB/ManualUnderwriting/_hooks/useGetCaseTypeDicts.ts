import { useEffect, useMemo } from 'react';
import lodash from 'lodash';
import {  useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();
  const contractType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.contractType,
    shallowEqual
  );
  const caseType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData.caseType,
    shallowEqual
  );
  const _caseType = lodash.isObject(caseType) ? caseType.value : caseType;
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getContractType`,
      payload: {
        contractType: _caseType,
      },
    });
  }, [_caseType]);
  return useMemo(() => {
    return lodash.map(contractType, (item: any) => {
      return { dictCode: item, dictName: item };
    });
  }, [contractType]);
};
