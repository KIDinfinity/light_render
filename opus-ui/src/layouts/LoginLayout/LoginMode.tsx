import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

// eslint-disable-next-line no-shadow
export enum Mode {
  'ACCOUNT' = 'ACCOUNT',
  'SSO' = 'SSO'
}

const ModeType = ({ mode, toggleMode }: { mode: string, toggleMode: React.MouseEventHandler }) => (
  <div className={classnames({
    [styles.account]: mode === Mode.ACCOUNT,
    [styles.sso]: mode === Mode.SSO,
  })}
  >
    <div className={styles.content} onClick={toggleMode}>
      <div className={styles.line} />
      <div className={styles.message}>SWITCH TO</div>
      <div className={styles.loginType}>
        {Mode[mode]}
        <Icon type={`${mode === Mode.SSO ? "caret-left" : "caret-right"}`} className={styles.icon} />
      </div>
    </div>
  </div>
)

export default ({ toggleMode }: { toggleMode: React.MouseEventHandler }) => (
  <div className={styles.loginBox}>
    <ModeType mode={Mode.ACCOUNT} toggleMode={toggleMode} />
    <ModeType mode={Mode.SSO} toggleMode={toggleMode} />
  </div>
)

