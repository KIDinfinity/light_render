import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import PremiumType from 'opus/NewBusiness/PremiumSettlement/Enum/premiumType';
import useGetPremiumType from 'opus/NewBusiness/PremiumSettlement/_hooks/useGetPremiumType';
import PremiumRefund from './PremiumRefund';
import PremiumCollection from './PremiumCollection';
import styles from './index.less';
import { FormAntCard } from 'basic/components/Form';
import { Icon } from 'antd';
import { ReactComponent as BankIcon } from 'opus/Assets/icon-bank.svg';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const Premium = () => {
  const premiumType = useGetPremiumType();
  return (
    <div className={styles.process}>
      <Tabs activeKey={premiumType}>
        <TabPane
          tab={formatMessageApi({
            Dropdown_POL_PremiumSettlementType: 'Collect',
          })}
          key={PremiumType.PremiumCollection}
        >
          <PremiumCollection />
        </TabPane>
        <TabPane
          tab={formatMessageApi({
            Dropdown_POL_PremiumSettlementType: 'Refund',
          })}
          key={PremiumType.PremiumRefund}
        >
          <PremiumRefund />
        </TabPane>
      </Tabs>
    </div>
  );
};

const PremiumWrap = () => {
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
        <Premium />
      </FormAntCard>
    </div>
  );
};

PremiumWrap.displayName = 'Premium';
export default PremiumWrap;
