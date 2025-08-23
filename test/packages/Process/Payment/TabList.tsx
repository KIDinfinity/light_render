import React, { useState } from 'react';
import { useSelector } from 'dva';
import { Tabs } from 'antd';
import classnames from 'classnames';
import lodash from 'lodash';

import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';

import PaymentInformation from './_Components/PaymentInformation';
import PaymentAllocation from './_Components/PaymentAllocation';
import PayeeInformation from './_Components/PayeeInformation';

import styles from './TabList.less';

const { TabPane } = Tabs;

const Payment = ({ NAMESPACE }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabErrors =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.tabErrors
    ) || [];

  const TabKeys = ['Payment Information', 'Payment Allocation', 'Payee Information'];

  return (
    <Tabs
      renderTabBar={() => (
        <div className={styles.tabBar}>
          {TabKeys.map((key, index) => (
            <div
              className={classnames({
                [styles.tab]: true,
                [styles.selectedTab]: index === activeIndex,
              })}
              key={key}
              style={{ padding: 10 - index }}
              onClick={() => {
                setActiveIndex(index);
              }}
            >
              <div
                className={classnames({
                  [styles.twistedTab]: true,
                  [styles.selectedTab]: index === activeIndex,
                })}
                onClick={(evt) => {
                  evt.stopPropagation();
                  setActiveIndex(index);
                }}
                style={{ zIndex: 9 - index }}
              />
              <div className={styles.textContainer}>{key}</div>
              {!!tabErrors[index]?.length && (
                <ErrorTooltipManual
                  style={{ zIndex: 10 }}
                  manualErrorMessage={tabErrors[index].map((i) => (
                    <div>{lodash.isPlainObject(i) ? i.message : i}</div>
                  ))}
                />
              )}
            </div>
          ))}
        </div>
      )}
      activeKey={TabKeys[activeIndex]}
    >
      <TabPane key={TabKeys[0]} forceRender={true}>
        <PaymentInformation NAMESPACE={NAMESPACE} />
      </TabPane>
      <TabPane key={TabKeys[1]} forceRender={true}>
        <PaymentAllocation NAMESPACE={NAMESPACE} />
      </TabPane>
      <TabPane key={TabKeys[2]} forceRender={true}>
        <PayeeInformation NAMESPACE={NAMESPACE} />
      </TabPane>
    </Tabs>
  );
};

export default Payment;
