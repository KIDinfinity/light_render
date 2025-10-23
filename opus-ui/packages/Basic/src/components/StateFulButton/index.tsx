import React from 'react';
import { Button, Tooltip } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

interface IProps extends Button {
  warning?: boolean;
  message?: string;
  children: React.ReactElement;
}

export default ({ warning, message, children, ...others }: IProps) => {
  return (
    <>
      {warning ? (
        <div className={styles.flag}>
          <Tooltip overlayClassName={styles.flagTooltip} title={message}>
            <Button
              {...others}
              icon={warning ? 'exclamation-circle' : null}
              className={classnames({
                warning,
              })}
            >
              {children}
            </Button>
          </Tooltip>
        </div>
      ) : (
        <Button
          {...others}
          icon={warning ? 'exclamation-circle' : null}
          className={classnames({
            warning,
          })}
        >
          {children}
        </Button>
      )}
    </>
  );
};
