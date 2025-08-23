import React from 'react';
import LoanTable from './LoanTable';
import style from './index.less';

const Loan = () => {
  return (
    <div className={style.loanTable}>
      <LoanTable />
    </div>
  );
};

export default Loan;
