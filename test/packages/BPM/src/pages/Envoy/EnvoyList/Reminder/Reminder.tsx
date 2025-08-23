import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Tabs, Button, Icon, notification } from 'antd';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import moment from 'moment';
import classNames from 'classnames';
import { ReactComponent as SendIcon } from 'bpm/assets/sent.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import { EGlobalAuthCode, ESelfAuthCode } from 'bpm/pages/Envoy/enum';
import { notSendReminder } from 'bpm/pages/Envoy/_utils/getDisabled';
import CurrentReminder from './CurrentReminder';
import TabBar from './TabBar';
import styles from './reminder.less';

interface IConnectProps {
  authController: any;
  errorInfo: any;
  dispatch: Dispatch;
}

interface IProps extends IConnectProps {
  currentReason: any;
}

const Reminder = (props: IProps) => {
  const [viewTabKey, setViewTabKey] = useState('0');
  const [sendLoading, setSendLoading] = useState(false);
  const { authController, errorInfo, currentReason, groupCode, dispatch } = props;
  const {
    enableReminder,
    enableWorkday,
    period,
    startTime,
    reasonReminders,
  } = lodash.pick(currentReason, [
    'enableReminder',
    'enableWorkday',
    'period',
    'startTime',
    'reasonReminders',
  ]);

  const sendReminder = async (reminder: any) => {
    const { reasonName } = currentReason;
    const isBeforeDispatchDate = () => {
      const sortModuleArr = getSortModuleArr(lodash.get(reminder, 'displayConfig'));
      const hasModule = lodash.some(
        sortModuleArr,
        (module: any) => module.moduleName === 'dispatchDate'
      );
      const isBeforeDate = moment(reminder.dispatchDate).isBefore(moment(new Date()), 'days');
      return hasModule && isBeforeDate;
    };
    if (isBeforeDispatchDate()) {
      notification.open({
        description: formatMessageApi({
          Label_COM_WarningMessage: 'app.pending.message.outdate',
        }),
      });
      return;
    }
    setSendLoading(true);
    await dispatch({
      type: 'envoyController/sendReminder',
      payload: {
        reminder,
        reasonName,
      },
    });
    setSendLoading(false);
  };

  const setViewTab = (tabKey: string) => {
    setViewTabKey(tabKey);
    dispatch({
      type: 'envoyController/setReminderIndex',
      payload: {
        reminderIndex: tabKey,
      },
    });
  };

  useEffect(() => {
    return () => {
      dispatch({
        type: 'envoyController/setReminderIndex',
        payload: {
          reminderIndex: '0',
        },
      });
    };
  }, []);

  return (
    <Tabs
      className={classNames(styles.reminder)}
      renderTabBar={() => (
        <TabBar
          authEnvoy={authController}
          tabOpt={reasonReminders}
          enableReminder={enableReminder}
          enableWorkday={enableWorkday}
          period={period}
          startTime={startTime}
          errorInfo={errorInfo}
          viewTabKey={viewTabKey}
          setViewTabKey={setViewTab}
        />
      )}
      activeKey={viewTabKey}
      size="small"
    >
      {lodash
        .chain(reasonReminders)
        .orderBy(['cron'], ['asc'])
        .map((reminder: any, reminderIdx: number) => {
          return (
            <Tabs.TabPane key={`${reminderIdx}`}>
              <CurrentReminder
                enableReminder={enableReminder}
                remindersData={reasonReminders}
                currentReminder={reminder}
                groupCode={groupCode}
              />
              {!notSendReminder({
                globalAuth: lodash.get(authController, EGlobalAuthCode.SEND),
                selfAuth: lodash.get(reminder?.envoyAuth, ESelfAuthCode.SEND),
                remindersData: reasonReminders,
                enableReminder,
                reminderData: reminder,
              }) && (
                <Button
                  className={styles.btnSend}
                  shape="circle"
                  loading={sendLoading}
                  onClick={() => sendReminder(reminder)}
                >
                  {!sendLoading && <Icon className="sendIcon" component={SendIcon} />}
                </Button>
              )}
            </Tabs.TabPane>
          );
        })
        .value()}
    </Tabs>
  );
};

export default connect(({ authController, envoyController }: any) => ({
  authController,
  errorInfo: envoyController.errorInfo,
}))(Reminder);
