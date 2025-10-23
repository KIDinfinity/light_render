import { useSelector } from 'dva'
import { NAMESPACE } from 'process/PHCLM/ManualAssessment/activity.config';

export default (payableId) => {
  return useSelector(({ [NAMESPACE]: modelnamespace }) => !!modelnamespace.claimEntities?.[payableId]?.isNewPayable)
}
