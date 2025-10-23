import { useDispatch } from 'dva';
import { GlobalConfigCodeType } from 'opus/Enums';
import useGetGlobalConfig from 'opus/Hooks/useGetGlobalConfig';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { useEffect } from 'react';

export default () => {
  const retrieveExistCorpFromLA = useGetGlobalConfig({
    codeType: GlobalConfigCodeType.retrieveExistCorpFromLA,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/setRetrieveExistCorpFromLA`,
      payload: { retrieveExistCorpFromLA },
    });
  }, [retrieveExistCorpFromLA]);
};
