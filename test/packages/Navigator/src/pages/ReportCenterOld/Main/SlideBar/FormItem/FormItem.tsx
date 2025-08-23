import React, { Component } from 'react';
import styles from './formItem.less';

class FormItem extends Component {
  render() {
    const { label, children } = this.props;
    return (
      <div className={styles.formItem}>
        <div className="label">{label}</div>
        <div className="ctn">
          { children }
        </div>
      </div>
    );
  }
}

export default FormItem;
