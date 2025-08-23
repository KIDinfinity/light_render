import React from 'react';
import styles from './index.less';

function AppealCaseButton(props) {
  const { action, buttonDisabled = false } = props;
  return (
    <button
      type="button"
      onClick={action}
      disabled={buttonDisabled}
      className={`${styles.box} ${styles['appeal-case']}`}
    >
      <span>appeal case</span>
    </button>
  );
}

export default AppealCaseButton;
