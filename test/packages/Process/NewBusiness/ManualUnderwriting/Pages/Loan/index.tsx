import React from 'react';
import ExpandableCard from 'process/NewBusiness/ManualUnderwriting/_components/ExpandableCard';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Show from './Show';
import Edit from './Edit';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import styles from './index.less';
import { useLoanDetailList, useShowLoan } from './hooks';
import { useDispatch } from 'dva';
import { OptionType } from '../../_enum';
//modelNamespace?.policyList?.[0]?.loanInfoList?.[0]?.loanDetailList || [];

const Loan = () => {
  const dispatch = useDispatch();
  const showLoan = useShowLoan();
  const loadDetailList = useLoanDetailList();
  return (
    <>
      {showLoan && (
        <ExpandableCard
          errorBoundaryName="Loan"
          title={formatMessageApi({ Label_BIZ_Policy: 'Loan' })}
          contentClassName={styles.expandBody}
          editModalProps={{
            onAfterConfirm: async () => {
              dispatch({
                type: `${NAMESPACE}/setLoanProcessData`,
              });
              const result: boolean = await dispatch<any>({
                type: `${NAMESPACE}/submit`,
                payload: {
                 type: OptionType.other,
                  formKeys: ['Loan-Table'],
                },
              });
              return result;
            },
            onBeforeBack: async () => {},
            onBeforeOpen: async () => {
              dispatch({
                type: `${NAMESPACE}/resetLoanModalData`,
              });
              dispatch({
                type: `${NAMESPACE}/addLoanItem`,
              });
            },
            children: <Edit />,
          }}
        >
          <Show data={loadDetailList} />
        </ExpandableCard>
      )}
    </>
  );
};

Loan.displayName = 'loan';
export default Loan;
