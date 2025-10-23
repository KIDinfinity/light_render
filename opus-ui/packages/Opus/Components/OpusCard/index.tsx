import React, { ReactNode, useState, useRef } from 'react';
import { Icon } from 'antd';
import { ReactComponent as fileSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentTitleFile.svg';
import classnames from 'classnames';
import styles from './index.less';

const OpusCard = ({
  children,
  icon = fileSvg,
  title = 'default title',
  innerCardClassName,
}: {
  children: ReactNode;
  icon?: any;
  title: string;
  innerCardClassName?: string;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const cRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.card}>
      <div
        className={styles.titleRow}
        onClick={() => {
          if (collapsed) {
            // setHidden(false)
            requestAnimationFrame(() => setCollapsed(false));
          } else {
            setCollapsed(true);
          }
        }}
      >
        <Icon component={icon} className={styles.icon} />
        {title}
        <div className={styles.flexGap} />
        <Icon
          type={'down'}
          className={classnames(styles.icon, collapsed ? styles.downArrow : styles.rightArrow)}
        />
      </div>
      <div
        className={classnames(
          styles.innerCard,
          innerCardClassName,
          collapsed ? styles.collapseAnimate : styles.expandAnimate
        )}
        //   classnames(styles.innerCard, {
        //   [styles.hidden]: hidden
        // })}
        ref={cRef}
      >
        {children}
      </div>
    </div>
  );
};

export default OpusCard;
