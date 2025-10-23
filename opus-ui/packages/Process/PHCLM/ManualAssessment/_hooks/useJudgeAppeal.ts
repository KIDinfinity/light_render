import { useSelector } from "dva"
import { NAMESPACE } from 'process/PHCLM/ManualAssessment/activity.config';

export default () => {
  return useSelector(({ [NAMESPACE]: modelnamespace }) => !!modelnamespace.claimProcessData?.appeal)
}
