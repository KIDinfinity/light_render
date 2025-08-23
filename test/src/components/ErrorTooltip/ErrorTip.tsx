import { Icon, Tooltip } from 'antd';
import classnames from 'classnames';
import React, { PureComponent } from 'react';
import ErrorSvg from './ErrorSvg';
import { ReactComponent as ErrorSvg2 } from './error.svg';
import styles from './index.less';
class ErrorTip extends PureComponent {
  render() {
    const { form, formName, title, noForm, className, defaultVisible, getPopupContainer } =
      this.props;
    return (
      <div className={classnames(styles.ErrorTip, { [className]: className })}>
        {noForm ? (
          <Tooltip
            defaultVisible={defaultVisible}
            arrowPointAtCenter
            placement="topLeft"
            overlayClassName={styles.myErrorTooltip}
            title={title}
            getPopupContainer={getPopupContainer}
          >
            <Icon className={styles.errorIcon} component={ErrorSvg2} />
          </Tooltip>
        ) : (
          form.getFieldError(formName) && (
            <Tooltip
              defaultVisible={defaultVisible}
              arrowPointAtCenter
              placement="topLeft"
              overlayClassName={styles.myErrorTooltip}
              title={form.getFieldError(formName)?.join?.(', ')}
              getPopupContainer={getPopupContainer}
            >
              <Icon className={styles.icon} component={ErrorSvg} />
            </Tooltip>
          )
        )}
      </div>
    );
  }
}

export default ErrorTip;
