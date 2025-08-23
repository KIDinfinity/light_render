import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import styles from './index.less';

const PayableGroupLayout = ({
  errorMessage,
  showButton,
  handleClick,
  disabledClick = true,
  children,
  className = '',
}: any) => {
  let [Basic, Payable] = [null, null];

  React.Children.map(children, (child) => {
    if (child.type.displayName === 'Basic') {
      Basic = child.props.children;
    }
    if (child.type.displayName === 'Payable') {
      Payable = child.props.children;
    }
  });

  return (
    <div className={classNames(styles.PayableGroupLayout, className)}>
      <div>{errorMessage && <ErrorTooltipManual manualErrorMessage={errorMessage} />}</div>
      <div className={styles.buttonWrap}>
        {showButton && (
          <Button
            className={styles.deleteBtn}
            icon="close"
            size="small"
            type="primary"
            shape="circle"
            disabled={!disabledClick}
            onClick={handleClick}
          />
        )}
      </div>
      {Basic}
      {Payable}
    </div>
  );
};

PayableGroupLayout.displayName = 'PayableGroupLayout';

PayableGroupLayout.Basic = ({ children }: any) => <>{children}</>;
(PayableGroupLayout.Basic as any).displayName = 'Basic';

PayableGroupLayout.Payable = ({ children }: any) => <>{children}</>;
(PayableGroupLayout.Payable as any).displayName = 'Payable';

export default PayableGroupLayout;
