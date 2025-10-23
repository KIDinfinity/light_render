import type { FunctionComponent } from 'react';
import React from 'react';
import { connect } from 'dva';
import { Collapse } from 'antd';
import JumpLink from '../../_component/JumpLink';
import Section from '../../_component/Section';
import IncidentInfo from './IncidentInfo';
import PayableInfo from './PayableInfo';
import { CaseType } from '../../enum';
import styles from './style.less';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';

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
  // const submissionDateVal = formatDate(claimHistoryItem?.submissionDate);
  // const paymentApprovalDateVal = formatDate(claimHistoryItem?.paymentApprovalDate);
  // const submissionDate = paymentApprovalDateVal
  //   ? `${submissionDateVal} - ${paymentApprovalDateVal}`
  //   : submissionDateVal;

  const transConfig = {
    status: { type: 'status' },
    assessmentDecision: { type: 'status' },
    submissionDate: { type: 'date' },
    inquiryClaimNo: {
      render: () =>
        tenant.region() === Region.TH ? (
          <span>{claimHistoryItem?.inquiryClaimNo}</span>
        ) : (
          <JumpLink
            caseCategory={claimHistoryItem?.caseCategory}
            caseStatus={claimHistoryItem?.status}
            claimNo={claimHistoryItem?.claimNo}
            inquiryClaimNo={claimHistoryItem?.inquiryClaimNo}
            caseType={
              claimHistoryItem?.claimNo?.indexOf('DL') === -1 ? CaseType.RCS : CaseType.KLIP
            }
            customerType={customerType}
            partyId={partyId}
            {...res}
          />
        ),
    },
  };

  return (
    <div className={styles.claimHistoryItem}>
      <Collapse bordered={false}>
        <Collapse.Panel
          key={'claimHistoryItem'}
          disabled={!claimHistoryItem?.payableList?.length}
          showArrow={!!claimHistoryItem?.payableList?.length}
          header={
            <>
              <div className={styles.title}>{t('claimDetails')}</div>
              <Section
                sectionId={'Claim'}
                transConfig={transConfig}
                data={{
                  ...claimHistoryItem,
                  inquiryClaimNo: claimHistoryItem?.inquiryClaimNo || claimHistoryItem?.claimNo,
                }}
              />
              <IncidentInfo
                incidentList={claimHistoryItem?.incidentList}
                offsetNonInvasiveCancerFlag={claimHistoryItem?.offsetNonInvasiveCancerFlag}
              />
            </>
          }
        >
          <PayableInfo payableList={claimHistoryItem?.payableList} />
        </Collapse.Panel>
      </Collapse>

      {/* {claimHistoryItem?.existDoc && (
            <div className={styles.link}>
              <Button
                onClick={() => {
                  history.push(`/documentManage/${claimHistoryItem?.caseNo}`);
                }}
              >
                <Icon type="camera" className={styles.icon} />
              </Button>
            </div>
          )} */}
      {/* {formatMessageApi({ Label_BPM_CaseCategory: claimHistoryItem?.caseCategory })} */}
    </div>
  );
};

export default connect(({ insured360 }: any) => ({
  customerType: insured360?.customerType,
  partyId: insured360?.partyId,
}))(ClaimHistoryItem);
