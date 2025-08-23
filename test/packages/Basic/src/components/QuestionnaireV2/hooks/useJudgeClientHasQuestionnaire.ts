import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';

export default ({ clientId }: any) => {
  const questionnaireKey = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.questionnaireKey;
  }, shallowEqual);
  const processData = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.processData;
  }, shallowEqual);
  console.log('processData___', processData);
  return useMemo(() => {
    return lodash
      .chain(processData)
      .filter((item) => item?.clientInfo[questionnaireKey])
      .some((item) => {
        return item?.clientInfo[questionnaireKey] === clientId;
      })
      .value();
  }, [clientId, processData, questionnaireKey]);
};
