import React from 'react';
import bpm from 'bpm/pages/OWBEntrance';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
import BPM from 'bpm/pages/OWBEntrance/BPM';
import CaseNoLink from '@/components/Claim/CaseNoLink';
import { useSelector, useDispatch } from 'dva';
import actionConfig from './actionConfig';
import Claim from './index';
import Arrow from './Arrow';
import styles from './Entry.less';
import { Mode } from './Enum';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';

export default ({ taskDetail, previewRecord }: any) => {
  const dispatch = useDispatch();
  bpm.setActionConfig(actionConfig);
  const mode = useSelector((state: any) => state.leaveManagement.mode);
  return (
    <BPM>
      {/**
      //@ts-ignore */}
      <BPM.Header>
        {/**
      //@ts-ignore */}
        <BPM.HeaderTitle>
          {formatMessageApi({
            activity: taskDetail.taskDefKey,
          })}
        </BPM.HeaderTitle>
        <BPM.HeaderInfoContainer>
          <BPM.HeaderInfo>
            <BPM.HeaderInfoItem
              key="processInstanceId"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
              })}
              value={taskDetail.processInstanceId}
              render={(value: any) => (
                <CaseNoLink
                  value={value}
                  beforeGoRouter={() => {
                    dispatch({
                      type: 'leaveManagement/saveState',
                      payload: {
                        showModal: false,
                      },
                    });
                  }}
                />
              )}
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
              key="submissionDate"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-date',
              })}
              value={taskDetail.submissionDate}
              renderValue={(value: any) => value && moment(value).format('L')}
            />
            <BPM.HeaderInfoItem
              key="submissionTime"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-time',
              })}
              value={taskDetail.submissionDate}
              renderValue={(value: any) => value && moment(value).format('LT')}
            />
            {mode === Mode.Abbreviated ? (
              <BPM.HeaderInfoItem
                renderValue={() => (
                  <div className={styles.container}>
                    <Arrow />
                  </div>
                )}
              />
            ) : (
              <></>
            )}
          </BPM.HeaderInfo>
        </BPM.HeaderInfoContainer>
      </BPM.Header>
      <Claim taskDetail={taskDetail} previewRecord={previewRecord} />
      <EntryErrorsUpdate />
      {mode === Mode.Expansion ? (
        <div className={styles.container}>
          <Arrow />
        </div>
      ) : (
        <></>
      )}
    </BPM>
  );
};
