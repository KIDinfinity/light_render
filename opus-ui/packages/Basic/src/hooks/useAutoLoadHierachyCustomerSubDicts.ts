import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

export default ({ parentCode, parentFieldName }: any) => {
  const dispatch = useDispatch();
  const targetDictExists: any = useSelector(({ dictionaryController }: any) => {
    return lodash.get(dictionaryController, `${parentFieldName}.${parentCode}`);
  }, shallowEqual);
  const dataLoaded = useSelector(({ dictionaryController }: any) => {
    return lodash.get(dictionaryController, `customerRoleDicts.${parentFieldName}.${parentCode}`);
  }, shallowEqual);
  const handleLoadCustomerDict = useCallback(
    ({ code }: any) => {
      const param = code.map((item: any) => ({
        parentCode: item,
        parentFieldName,
      }));

      if (!dataLoaded) {
        dispatch({
          type: 'dictionaryController/loadMutipleDictsByParentCode',
          payload: param,
        });
      }
    },
    [dataLoaded, targetDictExists, parentFieldName]
  );
  useEffect(() => {
    if (parentCode && parentCode.length > 0) {
      handleLoadCustomerDict({
        code: parentCode,
      });
    }
  }, [parentCode]);
};
