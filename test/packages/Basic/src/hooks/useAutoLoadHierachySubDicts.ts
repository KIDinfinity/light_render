import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

export default ({ parentCode, parentFieldName }: any) => {
  const dispatch = useDispatch();
  const targetDictExists: any = useSelector(({ dictionaryController }: any) => {
    return lodash.get(dictionaryController, `${parentFieldName}.${parentCode}`);
  }, shallowEqual);
  const dataLoaded = useSelector(({ dictionaryController }: any) => {
    return lodash.get(
      dictionaryController,
      `hierarchyDictsLoaded.${parentFieldName}.${parentCode}`
    );
  }, shallowEqual);
  const handleLoadSubDict = useCallback(
    ({ code }: any) => {
      if (!dataLoaded) {
        dispatch({
          type: 'dictionaryController/loadDictsByParentCode',
          payload: {
            parentCode: code,
            parentFieldName,
          },
        });
      }
    },
    [dataLoaded, targetDictExists, parentFieldName]
  );
  useEffect(() => {
    handleLoadSubDict({
      code: parentCode,
    });
  }, [parentCode]);
};
