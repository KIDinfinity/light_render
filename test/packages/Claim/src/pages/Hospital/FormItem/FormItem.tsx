import React, { PureComponent } from 'react';
import styles from './index.less';

interface IProps {
  labelText: any;
  ctnText: any;
}

class FormItem extends PureComponent<IProps> {
  render() {
    const { labelText, ctnText, ...props } = this.props;
    return (
      <div className={styles.formItem} {...props}>
        <div className="itemLabel">{labelText}</div>
        <div className="itemCtn">{ctnText}</div>
      </div>
    );
  }
}

export default FormItem;
