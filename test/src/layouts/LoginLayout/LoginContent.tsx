import React from 'react';
import classnames from 'classnames';
import { Mode } from './LoginMode';
import styles from './index.less';

const LoginContent = ({
  mode,
  ready,
  isAccount,
  children,
}: {
  ready: boolean;
  isAccount: boolean;
  mode: Mode;
  children: any;
}) => (
  <div
    className={classnames({
      [styles.content]: true,
      [styles.ready]: ready,
      [styles.showIn]: mode === Mode.ACCOUNT ? isAccount : !isAccount,
      [styles.showOut]: mode === Mode.ACCOUNT ? !isAccount : isAccount,
    })}
  >
    {children}
  </div>
);

export default LoginContent;
