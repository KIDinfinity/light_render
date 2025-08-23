import React from 'react';
import { useSelector } from 'dva';
import HeaderUser from '@/layouts/WorkspaceLayout/HeaderUser';
import Search from '@/layouts/WorkspaceLayout/Search';
import Logo from '@/components/Logo/logo';
import classNames from 'classnames';
import List from './List';
import ModePanel from '../ModePanel';
import styles from './index.less';

interface IProps {
  forHotkey?: string;
  authMonitorEntry?: boolean;
}

export default ({ forHotkey, authMonitorEntry }: IProps) => {
  const messageType = useSelector(
    ({ serviceSystemController }: any) => serviceSystemController?.messageType
  );
  const { setTime } = useSelector(
    ({ serviceSystemController }: any) => serviceSystemController?.downInfo
  );

  return (
    <div
      className={classNames(
        styles.wrapper,
        messageType === 501 && setTime > 1000 && styles.messageWrap
      )}
    >
      <div className={styles.box}>
        <div className={styles.box1}>
          <Logo type="1" />
        </div>
        <div className={styles.box2}>
          <List forHotkey={forHotkey} authMonitorEntry={authMonitorEntry} />
        </div>
        <div className={classNames(styles.box3, 'guidance-theme-one')}>
          <Search />
          {/* <Hotkey id={HotkeyHomeIds.ModeButton}> */}
          <ModePanel />
          {/* </Hotkey> */}
          <HeaderUser />
        </div>
      </div>
    </div>
  );
};
