import React, { PureComponent } from 'react';
import { Tooltip, Icon } from 'antd';
import styles from './index.less';
import ErrorSvg from './ErrorSvg';

class ErrorTip extends PureComponent {
  render() {
    const { form, formName } = this.props;
    return (
      <div className={styles.ErrorTip}>
        {form.getFieldError(formName) && (
          <Tooltip
            arrowPointAtCenter
            placement="topLeft"
            overlayClassName={styles.myErrorTooltip}
            title={form.getFieldError(formName)?.join?.(', ')}
          >
            <Icon className={styles.icon} component={ErrorSvg} />
          </Tooltip>
        )}
      </div>
    );
  }
}

export default ErrorTip;
