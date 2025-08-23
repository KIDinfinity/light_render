import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const FormCard = React.forwardRef(
  (
    {
      handleClick,
      className,
      cardStyle,
      style,
      showButton,
      extraButton,
      disabledClick = true,
      children,
    }: any,
    ref
  ) => (
    <div className={styles.wrap} ref={ref}>
      <div className={styles.siderWrap} style={cardStyle} />
      <div
        className={classNames(styles.cardWrap, 'cardWrap', { [`${className}`]: !!className })}
        style={style}
      >
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
          {extraButton}
        </div>
        {children}
      </div>
    </div>
  )
);

export default FormCard;
