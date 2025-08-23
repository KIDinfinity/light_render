import { useSelector } from 'dva';
import { NAMESPACE } from 'process/MYCLM/ManualAssessment/activity.config';

export default () => {
  return useSelector(
    ({ [NAMESPACE]: modelnamespace }) => !!modelnamespace.claimProcessData?.appeal
  );
};
