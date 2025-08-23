import React from 'react';
import { Tabs } from 'antd';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Initial from './_components/Initial';
import Renewal from './_components/Renewal';
import Withdrawal from './_components/Withdrawal';
import PayoutFund from './_components/PayoutFund';
import Dividend from './_components/Dividend';
import Cheque from './_components/Cheque';
import EPFinformation from './_components/EPFinformation';
import lodash from 'lodash';

const { TabPane } = Tabs;

import styles from './index.less';

import {
  useGetIsShowPayoutFundBankInfo,
  useGetIsShowWithdrawalPaymentInfo,
  useGetShowDividendICPInfo,
  useGetCheuqeDisplay,
  useGerEPFDisplay,
} from './_hooks';

// TODO:默认的时候应该不展示
export default (datas: any) => {
  const dispatch = useDispatch();

  const { activitykey, setActivitykey, planInfoData } = datas || {};

  const editingAssignee =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.editingAssignee) || '';
  const errorCount =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.errorLog?.errorCount,
      shallowEqual
    ) || 0;
  const showPayoutFund = useGetIsShowPayoutFundBankInfo();
  const showWithdrawal = useGetIsShowWithdrawalPaymentInfo();
  const showDividend = useGetShowDividendICPInfo();
  const showCheuqe = useGetCheuqeDisplay({ showOnly: datas.showOnly });
  const showEPF = useGerEPFDisplay({ groupInd: ['P', 'E'] });
  const list = [
    {
      show: true,
      key: 'init',
      title: 'Initial Payment',
      Component: Initial,
    },
    {
      show: true,
      key: 'renewal',
      title: 'Renewal Payment',
      Component: Renewal,
    },
    {
      show: showPayoutFund,
      key: 'refund',
      title: 'Payout Bank Fund',
      Component: PayoutFund,
    },
    {
      show: showWithdrawal,
      key: 'payout',
      title: 'Withdrawal Payment',
      Component: Withdrawal,
    },
    {
      show: showDividend,
      key: 'dividend',
      title: 'Dividend and ICP',
      Component: Dividend,
    },
    {
      show: showCheuqe,
      key: 'cheque',
      title: planInfoData?.payType === 'DBT' ? 'Direct Transfer' : 'Cheque',
      Component: Cheque,
    },
    {
      show: showEPF,
      key: 'EPF',
      title: 'EPF Information',
      Component: EPFinformation,
    },
  ];
  const configKeys = {
    init: ['InitialPaymentInfo-Table'],
    renewal: ['RenewalPaymentInfo-Table'],
    refund: ['PayoutFundBankInfo-Table'],
    payout: ['WithdrawalPaymentInfo-Table'],
    dividend: ['DividendandICPInfo-Field'],
  };

  return (
    <div className={classNames(styles.paymentSection, !datas.showOnly && styles.modalContent)}>
      {!!editingAssignee && activitykey === 'cheque' && !datas?.showOnly && (
        <div className={styles.error}>{editingAssignee} is editing</div>
      )}

      <Tabs
        defaultActiveKey={activitykey}
        className={styles.tabWrap}
        activeKey={activitykey}
        animated={false}
        onChange={async (key: any) => {
          if (!!errorCount) return;
          const errors = await dispatch({
            type: `${NAMESPACE}/validateForms`,
            payload: { formKeys: configKeys?.[activitykey] || [] },
          });
          if (!lodash.isEmpty(errors)) return;
          setActivitykey(key);
        }}
      >
        {list.map(({ key, title, Component, show }: any) => {
          return show ? (
            <TabPane tab={title} key={key}>
              <Component {...datas} />
            </TabPane>
          ) : null;
        })}
      </Tabs>
    </div>
  );
};
