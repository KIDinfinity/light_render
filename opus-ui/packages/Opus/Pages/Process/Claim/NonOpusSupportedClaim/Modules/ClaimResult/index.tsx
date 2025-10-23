import React, { PureComponent } from 'react';
import lodash from 'lodash';
import TaskStatus from 'basic/enum/TaskStatus';

import { LS, LSKey } from '@/utils/cache';
import { SS, SSKey } from '@/utils/cache';
import { connect } from 'dva';
import { Button, Form, Icon } from 'antd';
import { ReactComponent as fileSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentTitleFile.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../../activity.config';
import { formUtils } from 'basic/components/Form';
import ClaimEstimate from '../ClaimEstimate';
import styles from './index.less';
import Section, { Fields } from './Section';
import { DiagnosisType } from 'basic/enum';

//@ts-ignore
@connect(
  ({ formCommonController, claimEditable, processTask, [NAMESPACE]: modelnamepsace }: any) => ({
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    incidentItem: modelnamepsace?.businessData?.incidentList?.[0] || {},
    caseInfoItem: modelnamepsace?.businessData?.incidentList?.[0]?.klipCaseInfoList?.[0] || {},
    gmtCreate: modelnamepsace?.businessData?.gmtCreate || '',
    nonSupportClaimEstimation: modelnamepsace?.businessData?.nonSupportClaimEstimation || {},
    claimNo: modelnamepsace?.businessData?.claimNo || '',
    firstMcReceiveDate: modelnamepsace?.businessData?.firstMcReceiveDate,
    activityKey: processTask?.getTask?.activityKey || '',
    taskDetail: processTask?.getTask,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props: any, changedFields: any) {
    const { dispatch }: any = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      dispatch({
        type: `${NAMESPACE}/saveFormData`,
        target: 'saveClaimDecision',
        payload: {
          changedFields,
        },
      });
    }
  },
  mapPropsToFields(props: any) {
    const { incidentItem, caseInfoItem, gmtCreate, firstMcReceiveDate }: any = props;

    // 兼容旧数据
    const claimType = !!incidentItem?.claimType ? incidentItem?.claimType.split(',') : [];

    const diagnosisName = lodash.get(incidentItem, 'diagnosisList[0].diagnosisName');

    const claimTypeArray = incidentItem?.claimTypeArray || claimType;
    const extra = claimTypeArray?.length ? { claimTypeArray } : {}; // 解决判空标红校验问题

    const newDatas = {
      ...(caseInfoItem || {}),
      notificationOfLossDate: caseInfoItem?.notificationOfLossDate || gmtCreate,
      documentSendDate: caseInfoItem?.documentSendDate || gmtCreate,
      firstMcReceiveDate,
      diagnosisName,
      diagnosisType: DiagnosisType.Primary,
      ...extra,
    };

    return formUtils.mapObjectToFields(newDatas);
  },
})
class ClaimResult extends PureComponent {
  render() {
    const {
      dispatch,
      form,
      taskNotEditable,
      taskDetail: { taskStatus, assignee },
      nonSupportClaimEstimation,
      claimNo,
    }: any = this.props;

    const showEstimate =
      taskStatus === TaskStatus.todo &&
      LS.getItem(LSKey.CURRENTUSER)?.userId === assignee &&
      lodash.includes(['sit', 'presit'], SS.getItem(SSKey.CONFIGS)?.activeProfile);

    return (
      <div className={styles.result}>
        <div className={styles.titleRow}>
          <Icon component={fileSvg} />
          {formatMessageApi({ Label_CLM_Opus: 'BusinessDecision' })}
        </div>
        {!!showEstimate && (
          <Button
            className={styles.buttonWrap}
            onClick={async () => {
              await dispatch({
                type: `${NAMESPACE}/claimEstimateInit`,
                payload: {
                  nonSupportClaimEstimation,
                  claimNo,
                },
              });
              dispatch({
                type: `${NAMESPACE}/claimEstimateShowSave`,
                payload: {
                  show: true,
                },
              });
            }}
          >
            {formatMessageApi({ Label_CLM_Opus: 'quickClaimEstimate' })}
          </Button>
        )}

        <div className={styles.innerCard}>
          <Section section="ClaimResult" form={form} editable={!taskNotEditable}>
            <Fields.KlipClaimNo />
            <Fields.claimTypeArray />
            <Fields.NotificationOfLossDate />
            <Fields.DocumentSendDate />
            <Fields.CompletionDate />
            <Fields.ClaimStatus />
            <Fields.SettlementDecision />
            <Fields.PaymentAmount />
            <Fields.PaymentDate />
            <Fields.MCReceiveDate />
            {/* <Fields.DiagnosisName /> */}
            <Fields.Remark />
          </Section>
        </div>
        <ClaimEstimate />
      </div>
    );
  }
}

export default ClaimResult;
