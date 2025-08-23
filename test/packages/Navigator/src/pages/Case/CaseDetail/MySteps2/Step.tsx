import React, { PureComponent } from 'react';
import ProcessStatus from 'navigator/enum/ProcessStatus';
import styles from './MySteps2.less';

export default class Step extends PureComponent {
  render() {
    const { title, description, processActivityStatus } = this.props;
    return (
      <div
        className={`
          ${styles.Step}
          ${processActivityStatus === ProcessStatus.error && styles.error}
        `}
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        {processActivityStatus === ProcessStatus.error ? (
          <div className={styles.message}>Investigating by System support team</div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
