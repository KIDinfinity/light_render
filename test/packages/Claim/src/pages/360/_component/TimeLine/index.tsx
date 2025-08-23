import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './Timeline360.less';

export default class Timeline360 extends Component {
  render() {
    const { activeKey, index, callback, children, timeLine = true }: any = this.props;

    return (
      <div
        className={styles.tiemline360}
        onClick={() => {
          callback(index);
        }}
      >
        {timeLine && (
          <div className={classnames(styles.timeline, activeKey === index && styles.actionbg)} />
        )}
        <div className={styles.bg}>{children}</div>
      </div>
    );
  }
}
