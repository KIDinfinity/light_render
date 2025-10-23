import { useEffect, useState } from 'react';
import useGetCaseDetail from 'basic/components/CaseContainer/hooks/useGetCaseDetail';
import summaryPageService from '@/services/summaryPageService';
import lodash from 'lodash';
export default () => {
  const caseDetail = useGetCaseDetail();
  const [length, setLength] = useState(0);
  useEffect(() => {
    (async () => {
      const response = await summaryPageService.getSectionData({
        caseCategory: caseDetail?.caseCategory,
        sectionIds: ['envoy'],
        businessNo: caseDetail?.businessNo,
        caseNo: caseDetail?.caseNo,
      });
      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
      const businessData = lodash.get(resultData, 'businessData', {});
      if (success) {
        setLength(businessData?.envoy?.historyReasonGroups?.length);
      }
    })();
  }, []);

  return length;
};
