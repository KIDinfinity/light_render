import React from 'react';
import bpm from 'bpm/pages/OWBEntrance';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
import BPM from 'bpm/pages/OWBEntrance/BPM';
import CaseNoLink from '@/components/Claim/CaseNoLink';
import { useSelector } from 'dva';
import Arrow from 'configuration/components/Arrow';
import { Mode } from 'configuration/constant';
import TaskDefKey from 'enum/TaskDefKey';
import classnames from 'classnames';
import Claim from './index';
import actionConfigDataCapture from './actionConfig';
import actionConfigApprove from './actionConfig.approve';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';
import styles from './Entry.less';

export default ({ taskDetail, previewRecord }: any) => {
  const { taskDefKey } = taskDetail
  const actionConfig = taskDefKey === TaskDefKey.BP_DT_ACT002 ? actionConfigApprove : actionConfigDataCapture
  bpm.setActionConfig(actionConfig);
  const mode = useSelector((state: any) => state.configurationController.mode);
  return (
    <BPM>
      {/**
      // @ts-ignore */}
      <BPM.Header>
        {/**
        // @ts-ignore */}
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
                  <div className={classnames(styles.container, styles.Abbreviated)}>
                    <Arrow mode={mode} type='configureUserGroupController' />
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
      {mode === Mode.Expansion ? (
        <div className={styles.container}>
          <Arrow mode={mode} type='configureUserGroupController' />
        </div>
      ) : (
        <></>
      )}
      <EntryErrorsUpdate />
    </BPM>
  );
};
