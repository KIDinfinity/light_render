import React, { useState } from 'react';
import Calculation from './Calculation';
import CoverageRiderDetails from './CoverageRiderDetails';
import style from './index.less';
import SuspenseBalanceDetails from './SuspenseBalanceDetails';
import lodash from 'lodash';

const Layout = ({ transactionId }: any) => {
  const [select, setSelect] = useState('suspBalanceAmt');
  const calculationSelectList = ['cashValue', 'totalEstimatedValue'];
  return (
    <div className={style.layout}>
      <Calculation transactionId={transactionId} select={select} setSelect={setSelect} />
      {select === 'suspBalanceAmt' && <SuspenseBalanceDetails />}
      {lodash.includes(calculationSelectList, select) && (
        <CoverageRiderDetails transactionId={transactionId} />
      )}
    </div>
  );
};

export default Layout;
