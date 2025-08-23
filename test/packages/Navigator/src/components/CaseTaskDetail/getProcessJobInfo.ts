import { getProcessJobInfo } from '@/services/owbNbProposalControllerService';

export default async ({ caseNo }: any) => {
  const response = await getProcessJobInfo({ caseNo });

  return (() => {
    if (response?.success) {
      return response.resultData?.overdueTime;
    }
    return null;
  })();
};
