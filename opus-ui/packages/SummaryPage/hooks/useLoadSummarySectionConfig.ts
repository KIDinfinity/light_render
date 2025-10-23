import { useEffect, useContext } from 'react';
import Context from 'summary/Context';
import summaryPageService from '@/services/summaryPageService';
import lodash from 'lodash';

export default ({ caseCategory }: any) => {
  const { dispatch } = useContext(Context);
  useEffect(() => {
    (async () => {
      if (!caseCategory) {
        return false;
      }
      const response = await summaryPageService.getSectionInfo({
        caseCategory,
      });
      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
      if (success) {
        dispatch({
          type: 'setSummarySectionConfig',
          payload: {
            summarySectionConfig: resultData,
          },
        });
      }
    })();
  }, [caseCategory]);
};
