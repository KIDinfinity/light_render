import React from 'react';
import PolicyInfo from './PolicyInfo';
import CalculateInfo from './CalculateInfo';
import styles from './index.less';
import useGetNtuDate from 'opus/NewBusiness/PremiumSettlement/_hooks/useGetNtuDate';
import { FormAntCard } from 'basic/components/Form';
import { Icon } from 'antd';
import { ReactComponent as BankIcon } from 'opus/Assets/icon-bank.svg';

const CalcProcess = () => {
  const ntuDate = useGetNtuDate();
  const Header = () => {
    return (
      <div className={styles.header}>
        {<Icon component={BankIcon} className={styles.headerIcon} />}
        <span className={styles.title}>Premium Information</span>
      </div>
    );
  };
  return (
    <div className={styles.wrap}>
      <FormAntCard title={<Header />}>
        <div className={styles.container}>
          <PolicyInfo />
          <CalculateInfo />
        </div>
      </FormAntCard>
    </div>
  );
};
CalcProcess.displayName = 'CalcProcess';
export default CalcProcess;
