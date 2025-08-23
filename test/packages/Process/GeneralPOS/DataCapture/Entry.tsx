import React, { useEffect } from 'react';
import bpm, { BPM } from 'bpm/pages/OWBEntrance';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CaseNoLink from '@/components/Claim/CaseNoLink';
import Claim from '../BaseProduct/index';
import actionConfig from './action.config';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';
import SubmissionDate from '../common/Header/SubmissionDate';
import SubmissionTime from '../common/Header/SubmissionTime';
import SubmissionChannel from '../common/Header/SubmissionChannel';
import InquiryBusinessNo from '../common/Header/InquiryBusinessNo';
import { useDispatch } from 'dva';
import { isDataCapture } from '../common/utils';
import OverdueTime from 'bpm/pages/OWBEntrance/Header/OverdueTime';
import useGetOverDueTime from 'navigator/components/CaseTaskDetail/hooks/useGetOverDueTime';

function Entry({ taskDetail, businessData, buttonList }: any) {
  const dispatch = useDispatch();
  const overdueTime = useGetOverDueTime();

  useEffect(() => {
    if (
      businessData?.qaRequired === 'checker' ||
      (taskDetail?.submissionChannel === 'OMNE' &&
        isDataCapture({ caseCategory: taskDetail?.caseCategory }))
    ) {
      dispatch({
        type: 'claimEditable/setTaskNotEditable',
        payload: { taskNotEditable: true },
      });
    }
  }, [businessData, taskDetail]);
  bpm.setActionConfig(actionConfig);

  const inquiryBusinessNoParams =
    taskDetail?.submissionChannel === 'OMNE' &&
    isDataCapture({ caseCategory: taskDetail?.caseCategory })
      ? {
          render: () => <InquiryBusinessNo />,
        }
      : {
          value: taskDetail.inquiryBusinessNo,
        };

  return (
    <BPM>
      <BPM.Header>
        <BPM.HeaderTitle>
          {formatMessageApi({
            activity: taskDetail.taskDefKey,
          })}
        </BPM.HeaderTitle>
        <OverdueTime overdueTime={overdueTime} />
        <BPM.HeaderInfoContainer>
          <BPM.HeaderInfo>
            <BPM.HeaderInfoItem
              key="processInstanceId"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
              })}
              value={taskDetail.processInstanceId}
              render={(value: any) => <CaseNoLink value={value} />}
            />
            <BPM.HeaderInfoItem
              key="caseCategory"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-category',
              })}
              value={taskDetail.caseCategory}
              renderValue={(value: any) => formatMessageApi({ Label_BPM_CaseCategory: value })}
            />

            <BPM.HeaderInfoItem
              key="inquiryBusinessNo"
              title={formatMessageApi({
                Label_COM_General: 'BusinessNo',
              })}
              {...inquiryBusinessNoParams}
            />
            <BPM.HeaderInfoItem
              key="submissionDate"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-date',
              })}
              render={() => <SubmissionDate />}
            />
            <BPM.HeaderInfoItem
              key="submissionTime"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-time',
              })}
              render={() => <SubmissionTime />}
            />
            <BPM.HeaderInfoItem
              key="submissionChannel"
              title={formatMessageApi({
                Label_BIZ_Claim:
                  'app.navigator.task-detail-of-data-capture.label.submission-channel',
              })}
              render={() => <SubmissionChannel />}
            />
          </BPM.HeaderInfo>
        </BPM.HeaderInfoContainer>
      </BPM.Header>
      <Claim taskDetail={taskDetail} businessData={businessData} buttonList={buttonList} />
      <EntryErrorsUpdate />
    </BPM>
  );
}

export default Entry;
