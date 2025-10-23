import React, { useContext } from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import moment from 'moment';
import context from '../../../../Context/context';
import InfoItem from './InfoItem';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import bpm, { OpusBPM } from 'bpm/pages/OWBEntrance';

export default React.memo(
  ({ children, className }: any) => {
    const { state } = useContext(context);
    const { taskDetail, headerInfoRender, policyId } = state;

    const {
      processInstanceId,
      caseCategory,
      submissionDate,
      submissionChannel,
      originalSubmissionDate,
    } = lodash.pick(taskDetail, [
      'processInstanceId',
      'caseCategory',
      'inquiryBusinessNo',
      'submissionDate',
      'submissionChannel',
      'originalSubmissionDate',
    ]);
    const submissionDateTemp =
      caseCategory === 'BP_AP_CTG02' ? originalSubmissionDate || submissionDate : submissionDate;
    if (React.Children.count(children)) {
      return (
        <div
          className={classnames({
            [styles.wrap]: true,
            [className]: className,
          })}
        >
          <div className={styles.info}>{children}</div>
        </div>
      );
    }

    if (React.isValidElement(headerInfoRender))
      return (
        <div
          className={classnames({
            [styles.wrap]: true,
            [className]: className,
          })}
        >
          {headerInfoRender}
        </div>
      );
    // console.log(
    //   'test12312312',
    //   OpusBPM.HeaderPolicyId,
    //   React.isValidElement(OpusBPM.HeaderPolicyId)
    // );
    const policyIdComponent = OpusBPM.HeaderPolicyId;
    return (
      <div
        className={classnames({
          [styles.wrap]: true,
          [className]: className,
        })}
      >
        <div className={styles.info}>
          <InfoItem
            keyName="policyId"
            title={formatMessageApi({
              Label_BIZ_Policy: 'PolicyNo',
            })}
            // value={'test'}
            renderValue={policyIdComponent}
          />
          <InfoItem
            keyName="processInstanceId"
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
            })}
            value={processInstanceId}
          />
          <InfoItem
            keyName="caseCategory"
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-category',
            })}
            value={caseCategory}
            renderValue={(value: any) => formatMessageApi({ Label_BPM_CaseCategory: value })}
          />
          <InfoItem
            keyName="submissionDate"
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-date',
            })}
            value={submissionDateTemp}
            renderValue={(value: any) => value && moment(value).format('L')}
          />
          <InfoItem
            keyName="submissionTime"
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-time',
            })}
            value={submissionDateTemp}
            renderValue={(value: any) => value && moment(value).format('LT')}
          />
          <InfoItem
            keyName="submissionChannel"
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-channel',
            })}
            value={submissionChannel}
            renderValue={(value: any) =>
              formatMessageApi({
                Dropdown_COM_SubmissionChannel: value,
              })
            }
          />
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => lodash.isEqual(prevProps, nextProps)
);
