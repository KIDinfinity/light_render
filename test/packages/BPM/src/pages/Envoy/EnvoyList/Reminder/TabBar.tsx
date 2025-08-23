import React, { memo, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch } from 'dva';
import { Button, Icon } from 'antd';
import classNames from 'classnames';
import lodash from 'lodash';
import SendDay from 'bpm/pages/Envoy/modules/SendDay/SendDay';
import { EGlobalAuthCode, ESelfAuthCode } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftOrWait } from 'bpm/pages/Envoy/_utils/getDisabled';
import styles from './tabBar.less';

const TabBar = (props) => {
  const { authEnvoy, tabOpt, viewTabKey, setViewTabKey, enableReminder, enableWorkday } = props;
  const dispatch = useDispatch();

  let [mobileNum, setMobileNum] = useState(0);
  const minimum = 0;
  const maximum = tabOpt?.length - 4;
  const isMinimum = (num): boolean => num <= minimum;
  const isMaximum = (num): boolean => num >= maximum;
  const setTranslateX = (type: string) => {
    if (type === 'pre') {
      mobileNum -= 1;
      if (isMinimum(mobileNum)) {
        mobileNum = minimum;
      }
    } else {
      mobileNum += 1;
      if (isMaximum(mobileNum)) {
        mobileNum = maximum;
      }
    }
    setMobileNum(mobileNum);
  };
  const setScheduleSendTime = async (currentReminder: any, value: number) => {
    await dispatch({
      type: 'envoyController/setScheduleSendTime',
      payload: {
        cron: value,
        enableWorkday,
        startTime: currentReminder?.startTime,
        ctn: currentReminder,
      },
    });
  };

  return (
    <div
      className={classNames(styles.tabBar, {
        [styles.hide]: tabOpt?.length <= 4,
      })}
    >
      <div className={classNames(styles.btnOpt, styles.btnOptPre)}>
        {!isMinimum(mobileNum) && <Icon type="left" onClick={() => setTranslateX('pre')} />}
      </div>
      <div
        className={styles.main}
        style={{
          transform: `translateX(-${mobileNum * 25}%)`,
        }}
      >
        {lodash
          .chain(tabOpt)
          .orderBy(['cron'], ['asc'])
          .map((item: any, idx: number) => {
            const {
              cron,
              period,
              scheduleSendTime,
              actualSendTime,
              envoyAuth,
              displayConfig,
            } = item;
            // const reminderErrors = getErrors(findObj(errorInfo, id));
            const sendDayConfig = lodash.get(displayConfig, 'sendDay');
            const idxStr = `${idx}`;
            return (
              <div className={styles.ctn} key={`tab_${idx}`}>
                <div className={styles['ctn-t']}>
                  <Button
                    shape="circle"
                    size="small"
                    type={idxStr === viewTabKey ? 'primary' : 'default'}
                    onClick={() => setViewTabKey(idxStr)}
                  >
                    <Icon type="bell" theme="filled" />
                  </Button>
                </div>
                <div className="ctn-b">
                  <SendDay
                    sendDay={cron}
                    min={0}
                    max={period}
                    disabled={
                      !sendDayConfig?.editable ||
                      notAuthOrDraftOrWait({
                        globalAuth: lodash.get(authEnvoy, EGlobalAuthCode.EDIT),
                        selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
                        enableReminder,
                        reminderData: item,
                      })
                    }
                    sendDate={!lodash.isEmpty(actualSendTime) ? actualSendTime : scheduleSendTime}
                    handleChange={(val) => setScheduleSendTime(item, val)}
                  />
                </div>
              </div>
            );
          })
          .value()}
      </div>
      <div className={classNames(styles.btnOpt, styles.btnOptNext)}>
        {!isMaximum(mobileNum) && <Icon type="right" onClick={() => setTranslateX('next')} />}
      </div>
    </div>
  );
};

export default memo(TabBar);
