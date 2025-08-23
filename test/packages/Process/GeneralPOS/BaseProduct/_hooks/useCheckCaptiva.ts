import { useMemo } from 'react';
import { useSelector } from 'dva';
import { NAMESPACE } from '../activity.config';
import { isCaptiva } from '../../common/utils';

export default function useCheckCaptiva() {
  const taskDetailSubmissionChannel = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.taskDetailSubmissionChannel
  );

  const caseCategory = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.caseCategory
  );

  return useMemo(() => {
    return isCaptiva({ submissionChannel: taskDetailSubmissionChannel, caseCategory });
  }, [taskDetailSubmissionChannel, caseCategory]);
}
