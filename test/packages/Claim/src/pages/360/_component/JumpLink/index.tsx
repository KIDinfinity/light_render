import React from 'react';
import jump from './jump';
// import { CaseStatus } from '../../enum';
import { transEllipsisVal } from '../../_functions';
import styles from './index.less';

const JumpLink = ({
  caseCategory,
  caseStatus,
  claimNo,
  inquiryClaimNo,
  dispatch,
  caseType,
  partyId,
  customerType,
}: any) => {
  // const isCancel = caseStatus === CaseStatus.Cancel;

  const onClick = (e: any) => {
    // if (isCancel) return;
    e.stopPropagation();

    jump({
      claimNo,
      caseCategory,
      caseStatus,
      dispatch,
      caseType,
      partyId,
      customerType,
    });
  };
  return (
    <span onClick={onClick} className={!(inquiryClaimNo || claimNo) ? styles.unlink : styles.link}>
      {`${transEllipsisVal(inquiryClaimNo || claimNo)}`}
    </span>
  );
};

export default JumpLink;
