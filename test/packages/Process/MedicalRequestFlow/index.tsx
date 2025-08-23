import React from 'react';
import { useSelector } from 'dva';
import bpm, { BPM } from 'bpm/pages/OWBEntrance';
import { Mode } from 'configuration/constant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Arrow from 'navigator/components/CaseTaskDetail/MedicalRequestModal/Arrow';
import classnames from 'classnames';
import moment from 'moment';
import CaseNoLink from '@/components/Claim/CaseNoLink';
import actionConfig from './actionConfig';
import MedicalRequestFlow from './Entry';
import styles from './index.less';

export default ({ taskDetail, businessData }: any) => {
  const mode = useSelector((state: any) => state.medicalRequestFlow.mode);
  bpm.setActionConfig(actionConfig);
  return (
    <>
      <BPM>
        <BPM.Header>
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
                      <Arrow mode={mode} type="medicalRequestFlow" />
                    </div>
                  )}
                />
              ) : (
                <></>
              )}
            </BPM.HeaderInfo>
          </BPM.HeaderInfoContainer>
        </BPM.Header>
        <MedicalRequestFlow businessData={businessData} taskDetail={taskDetail} />
      </BPM>
    </>
  );
};
