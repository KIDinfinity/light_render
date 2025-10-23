import type OWBLoadingCode from 'opus/NewBusiness/ManualUnderwriting/_enum/OWBLoadingCode';
import useGetOWBLoadingCode from './useGetOWBLoadingCode';
import useJudgeIsCopyLoading from './useJudgeIsCopyLoading';

export default ({
  coverageId,
  loadingId,
  targetLoadingCode,
}: {
  coverageId: string;
  loadingId: string;
  targetLoadingCode: OWBLoadingCode;
}) => {
  const owbLoadingCode = useGetOWBLoadingCode({ coverageId, loadingId });
  const isCopyLoading = useJudgeIsCopyLoading({ loadingId, coverageId });

  if (!isCopyLoading) {
    return true;
  }

  if (owbLoadingCode === targetLoadingCode) {
    return true;
  }

  return false;
};
