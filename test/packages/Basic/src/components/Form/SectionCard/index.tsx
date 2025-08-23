import React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import lodash from 'lodash';
import styles from './index.less';

const SectionCard = ({
  title = '',
  children,
  extra,
  deep,
  showButton,
  className,
  backgroundColorName,
  handleClick,
  hasPadding = true,
  hasContent = true,
}: any) => (
  <div
    className={classNames(styles.wrapper, className, {
      [styles.deep]: deep,
    })}
  >
    {(!lodash.isEmpty(title) || !lodash.isEmpty(extra)) && (
      <div className={styles.header}>
        <div className={styles.headerWrap}>
          <div className={classNames(styles.title, backgroundColorName)}>{title}</div>
          <div className={classNames(styles.extra)}>{extra}</div>
        </div>
      </div>
    )}
    {hasContent && (
      <div className={classNames(styles.content, backgroundColorName)}>
        {showButton && (
          <Button
            className={styles.deleteBtn}
            icon="close"
            size="small"
            shape="circle"
            onClick={handleClick}
          />
        )}
        <div
          className={classNames(styles.main, 'sectionContent', { [styles.hasPadding]: hasPadding })}
        >
          {children}
        </div>
      </div>
    )}
  </div>
);

export default SectionCard;
