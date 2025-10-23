import React from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';

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
        className={classNames(styles.cardWrap, 'cardWrap', 'TreamentPayableItem', {
          [`${className}`]: !!className,
        })}
        style={style}
      >
        <div className={styles.buttonWrap}>
          {showButton && <DeleteButton className={styles.icon} handleDelete={handleClick} />}
          {extraButton}
        </div>
        {children}
      </div>
    </div>
  )
);

export default FormCard;
