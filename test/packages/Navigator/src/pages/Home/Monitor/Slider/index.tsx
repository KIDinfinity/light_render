import React from 'react';
import { Card } from 'antd';
import SwitchDrawerModeHoc from 'navigator/HOC/SwitchDrawerModeHoc';
import ExceptionalCase from 'navigator/pages/Home/Monitor/components/ExceptionalCase';
import ClearSnapshot from 'navigator/pages/Home/Monitor/components/ClearSnapshot';
import AuthorizedUser from 'navigator/pages/Home/Monitor/components/AuthorizedUser';
import Title from 'navigator/pages/Home/Monitor/Title';
import Menus from './Menus';
import BackButton from './BackButton';
import styles from './index.less';
import { useSelector } from 'dva';

const Slider = ({ monitorSliderDisplayType }: any) => {
  const taskDetail = useSelector((state: any) => state.authController.taskDetail);

  return (
    <div className={styles.slider}>
      <Title />
      {monitorSliderDisplayType === 'menu' && <Menus />}
      {monitorSliderDisplayType !== 'menu' && <BackButton />}
      {monitorSliderDisplayType === 'content' && (
        <div className={styles.exception}>
          <Card bordered={false}>
            <ExceptionalCase
              extraHeaderClassName={styles.extraClass}
              caseNo={taskDetail?.processInstanceId || ''}
            />
          </Card>
        </div>
      )}
      {monitorSliderDisplayType === 'clearSnapshotContent' && (
        <div className={styles.exception}>
          <Card bordered={false}>
            <ClearSnapshot
              extraHeaderClassName={styles.extraClass}
              flag={true}
              caseNo={taskDetail?.processInstanceId || null}
            />
          </Card>
        </div>
      )}
      {monitorSliderDisplayType === 'authorizedUser' && (
        <div className={styles.exception}>
          <Card bordered={false}>
            <AuthorizedUser
              extraHeaderClassName={styles.extraClass}
              caseNo={taskDetail?.processInstanceId || null}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default SwitchDrawerModeHoc(Slider);
