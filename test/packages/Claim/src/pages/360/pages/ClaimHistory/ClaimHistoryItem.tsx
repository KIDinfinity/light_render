import type { FunctionComponent } from 'react';
import React from 'react';
import { connect, useDispatch } from 'dva';
import classNames from 'classnames';
import { history } from 'umi';
import { Button, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useJudgeDisplayCaseStatus from 'claim/pages/360/_hooks/useJudgeDisplayCaseStatus';
import { formatDate } from '../../_functions';
import TextWrap from '../../_component/TextWrap';
import JumpLink from '../../_component/JumpLink';
import IncidentInfo from './IncidentInfo';
import PayableInfo from './PayableInfo';
import { CaseType } from '../../enum';
import styles from './style.less';

interface IProps {
  claimHistoryItem: any;
  dispatch: any;
  customerType: string;
  partyId: string;
}

const ClaimHistoryItem: FunctionComponent<IProps> = ({
  claimHistoryItem = {},
  customerType,
  partyId,
  ...res
}) => {
  const dispatch = useDispatch();
  const submissionDateVal = formatDate(claimHistoryItem?.submissionDate);
  const paymentApprovalDateVal = formatDate(claimHistoryItem?.paymentApprovalDate);
  const submissionDate = paymentApprovalDateVal
    ? `${submissionDateVal} - ${paymentApprovalDateVal}`
    : submissionDateVal;
  const caseType = claimHistoryItem?.claimNo?.indexOf('DL') === -1 ? CaseType.RCS : CaseType.KLIP;
  const displayStatus = useJudgeDisplayCaseStatus();

  return (
    <div className={styles.claimHistoryItem}>
      <div className={styles.HeaderData}>
        {submissionDate}
        {claimHistoryItem?.status && displayStatus && (
          <TextWrap.Grey
            className={classNames(styles.status, styles[claimHistoryItem?.status])}
            hasBorder
          >
            {formatMessageApi({
              claimStatus: claimHistoryItem?.status,
            })}
          </TextWrap.Grey>
        )}
      </div>

      <div className={styles.headerInfo}>
        <div className={styles.businessNo}>
          <TextWrap.White>
            {formatMessageApi({ Label_BIZ_Claim: 'BusinessNo' })}
            <JumpLink
              caseCategory={claimHistoryItem?.caseCategory}
              caseStatus={claimHistoryItem?.status}
              claimNo={claimHistoryItem?.claimNo}
              inquiryClaimNo={claimHistoryItem?.inquiryClaimNo}
              caseType={caseType}
              customerType={customerType}
              partyId={partyId}
              dispatch={dispatch}
              {...res}
            />
          </TextWrap.White>
          {claimHistoryItem?.assessmentDecision && (
            <TextWrap.Grey style={{ marginLeft: '8px' }} hasBorder>
              {formatMessageApi({
                Dropdown_CLM_AssessmentDecision: claimHistoryItem?.assessmentDecision,
              })}
            </TextWrap.Grey>
          )}
          {claimHistoryItem?.existDoc && (
            <div className={styles.link}>
              <Button
                onClick={() => {
                  history.push(`/documentManage/${claimHistoryItem?.caseNo}`);
                }}
              >
                <Icon type="camera" className={styles.icon} />
              </Button>
            </div>
          )}
        </div>
        <div className={styles.caseCategory}>
          <TextWrap.White>
            {formatMessageApi({ Label_BPM_CaseCategory: claimHistoryItem?.caseCategory })}
          </TextWrap.White>
        </div>
      </div>
      <IncidentInfo incidentList={claimHistoryItem?.incidentList} />
      <PayableInfo payableList={claimHistoryItem?.payableList} />
    </div>
  );
};

export default connect(({ insured360 }: any) => ({
  customerType: insured360?.customerType,
  partyId: insured360?.partyId,
}))(ClaimHistoryItem);
