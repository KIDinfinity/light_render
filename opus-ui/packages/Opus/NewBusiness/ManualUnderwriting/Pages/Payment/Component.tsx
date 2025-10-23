import { Icon } from 'antd';
import classNames from 'classnames';
import { useSelector } from 'dva';
import { ReactComponent as ChevronDownIcon } from 'opus/Assets/icon-chevron-down.svg';
import { ReactComponent as ChevronRightIcon } from 'opus/Assets/icon-chevron-right.svg';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import React, { useCallback, useState } from 'react';
import styles from './index.less';
import Cheque from './_components/Cheque';
import EPFinformation from './_components/EPFinformation';
import Initial from './_components/Initial';
import PayoutFund from './_components/PayoutFund';
import Renewal from './_components/Renewal';
import Withdrawal from './_components/Withdrawal';
import {
  useGerEPFDisplay,
  useGetCheuqeDisplay,
  useGetIsShowPayoutFundBankInfo,
  useGetIsShowWithdrawalPaymentInfo,
  useGetShowDividendICPInfo,
} from './_hooks';

// const { TabPane } = Tabs;

// TODO:默认的时候应该不展示
export default (datas: any) => {
  // const dispatch = useDispatch();

  const { activitykey, setActivitykey } = datas || {};

  const editingAssignee =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.editingAssignee) || '';

  const [collapsedKeys, setCollapsedKeys] = useState<string[]>([]);

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
      title: 'Refund Payment Method',
      Component: Withdrawal,
    },
    {
      show: showCheuqe,
      key: 'cheque',
      title: 'Cheque',
      Component: Cheque,
    },
    {
      show: showEPF,
      key: 'EPF',
      title: 'EPF Information',
      Component: EPFinformation,
    },
  ];

  const toggleCollapsed = useCallback(
    (key: string) => {
      if (collapsedKeys.includes(key)) {
        setCollapsedKeys(collapsedKeys.filter((item) => item !== key));
      } else {
        setCollapsedKeys([...collapsedKeys, key]);
      }
    },
    [collapsedKeys]
  );

  return (
    <div className={classNames(styles.paymentSection, !datas.showOnly && styles.modalContent)}>
      {!!editingAssignee && activitykey === 'cheque' && !datas?.showOnly && (
        <div className={styles.error}>{editingAssignee} is editing</div>
      )}

      {/* <Tabs
        defaultActiveKey={activitykey}
        className={styles.tabWrap}
        animated={false}
        onChange={async (key: any) => {
          await dispatch({
            type: `${NAMESPACE}/saveModalCleanValidateData`,
          });
          await dispatch({
            type: `${NAMESPACE}/clearError`,
          });
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
      </Tabs> */}

      {list.map(({ key, title, Component, show }: any) => {
        const collapsed = collapsedKeys.includes(key);

        return show ? (
          <div key={key} className={styles.section}>
            <div className={styles.sectionTitle}>{title}</div>
            <Icon
              className={styles.collapse}
              component={collapsed ? ChevronRightIcon : ChevronDownIcon}
              onClick={() => toggleCollapsed(key)}
            />
            {!collapsed && <Component {...datas} />}
          </div>
        ) : null;
      })}
    </div>
  );
};
