import { useSelector } from 'dva';
import { NAMESPACE } from 'process/MYCLM/ManualAssessment/activity.config';

export default (payableId) => {
  return useSelector(
    ({ [NAMESPACE]: modelnamespace }) => !!modelnamespace.claimEntities?.[payableId]?.isNewPayable
  );
};
