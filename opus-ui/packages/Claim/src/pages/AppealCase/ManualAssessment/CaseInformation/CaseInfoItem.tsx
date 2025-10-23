import type { FunctionComponent } from 'react';
import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { CaseInfoModal } from '../_dto/Models';
import { formatAmount } from '../_functions';

import styles from './styles.less';

interface IProps {
  onClick: Function;
  caseItem: CaseInfoModal;
  selected: boolean;
}

const format = (claimTypeList) => {
  const result = lodash
    .chain(claimTypeList)
    .split(',')
    .compact()
    .map((item) => formatMessageApi({ Dropdown_CLM_PHClaimType: item }))
    .value();
  return lodash.size(result) > 1 ? result.join(',') : result;
};

const CaseInfoItem: FunctionComponent<IProps> = ({ onClick, caseItem, selected }) => {
  return (
    <div
      className={classNames({ [styles.selected]: selected }, styles.caseInfoItem)}
      onClick={() => onClick(caseItem)}
    >
      <div className={styles.caseInfoMember}>{caseItem.caseNo}</div>
      <div className={styles.caseInfoMember}>{caseItem.insuredName}</div>
      <div className={styles.caseInfoMember}>{format(caseItem.claimType)}</div>
      <div className={styles.caseInfoMember}>
        {formatMessageApi({ Dropdown_CLM_PHClaimDecision: caseItem.assessmentDecision })}
      </div>
      <div className={styles.caseInfoMember}>{formatAmount(caseItem.payableAmount)}</div>
      <div className={styles.caseInfoMember}>{caseItem.splitRemark}</div>
    </div>
  );
};

export default CaseInfoItem;
