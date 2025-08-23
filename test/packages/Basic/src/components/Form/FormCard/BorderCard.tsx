import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import styles from './BorderCard.less';

interface IProps {
  children: any;
  borderColor?: string;
  className?: string;
  button?: {
    visiable?: boolean;
    callback?: any;
    extra?: any;
  };
  type?: string;
  marginBottom?: any;
  childClassName?: string;
  backgroundColorName?: string;
}

const BorderCard = ({
  children,
  borderColor,
  type,
  button,
  className,
  marginBottom,
  childClassName,
  backgroundColorName,
}: IProps) => {
  const { visiable: buttonVisiable, callback = () => { }, extra } = button || {};
  return (
    <div
      className={classNames(
        {
          borderCard: true,
          [styles.sectionCard]: true,
          [styles.weight]: type === 'weight',
          [styles.marginBottom]: marginBottom,
        },
        className,
        backgroundColorName,
      )}
      style={{ [borderColor ? 'borderColor' : '']: borderColor }}
    >
      <div className={classNames(styles.children, 'borderCardChildren', childClassName)}>
        {children}
      </div>
      {buttonVisiable &&
        ((extra && extra) || (
          <Button
            className={classNames(styles.borderCardBtn, styles.btn, 'venus-ui-expand-close-button')}
            icon="close"
            size="small"
            type="primary"
            shape="circle"
            onClick={callback}
          />
        ))}
    </div>
  );
};

export default BorderCard;
