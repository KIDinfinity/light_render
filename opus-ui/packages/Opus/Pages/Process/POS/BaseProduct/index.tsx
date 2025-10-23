import React, { useEffect } from 'react';
import { useDispatch } from 'dva';

import PageContainer from 'basic/components/Elements/PageContainer';
import SectionLayout from 'opus/Components/SectionComponents/SectionLayout';

import { NAMESPACE } from './activity.config';
import setClaimEditableHocHook from 'claim/components/Hoc/setClaimEditableHocHook';
import Page from './page';

type Props = {
  taskDetail: any;
  businessData: any;
};

export default setClaimEditableHocHook(({ taskDetail, businessData }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function t() {
      const newBusinessData = {
        ...businessData,
        processInstanceId: taskDetail.processInstanceId,
        taskId: taskDetail.taskId,
        taskStatus: taskDetail.taskStatus,
        submissionDate: businessData?.submissionDate || taskDetail.submissionDate,
        caseCategory: taskDetail.caseCategory,
        taskDetailSubmissionChannel: taskDetail?.submissionChannel,
      };
      await dispatch({
        type: `${NAMESPACE}/saveProcessData`,
        payload: newBusinessData,
      });
      await dispatch({
        type: `${NAMESPACE}/getTransactionTypeCodeMap`,
      });
    }
    t();
    return () => {
      dispatch({
        type: `${NAMESPACE}/clearProcessData`,
      });
    };
  }, []);

  return (
    <PageContainer
      pageConfig={{ caseCategory: taskDetail?.caseCategory, activityKey: taskDetail?.activityKey }}
    >
      <Page />
    </PageContainer>
  );
});
