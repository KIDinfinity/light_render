import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './index.less';

export default ({ password }: { password: string }) => {
  const [status, setStatus] = useState<string>('null'); // 'low', 'medium', 'strong'
  const strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'
  );
  const mediumRegex = new RegExp(
    '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
  );

  useEffect(() => {
    if (!password) {
      setStatus('null');
    } else if (strongRegex.test(password)) {
      setStatus('strong');
    } else if (mediumRegex.test(password)) {
      setStatus('medium');
    } else {
      setStatus('low');
    }
  }, [password]);
  return (
    <div className={styles['password-strength']}>
      <div
        className={classnames({
          [styles.item]: true,
          [styles.low]: ['low', 'medium', 'strong'].includes(status),
        })}
      />
      <div
        className={classnames({
          [styles.item]: true,
          [styles.medium]: ['medium', 'strong'].includes(status),
        })}
      />
      <div
        className={classnames({
          [styles.item]: true,
          [styles.strong]: ['strong'].includes(status),
        })}
      />
    </div>
  );
};
