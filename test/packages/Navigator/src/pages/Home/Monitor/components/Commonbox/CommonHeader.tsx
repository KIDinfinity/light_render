import React from 'react';
import styles from './index.less';

import classnames from 'classnames';

import { ReactComponent } from 'navigator/assets/expand.svg';
import isSupportCenter from '@/utils/isSupportCenter';

export default function CommonHeader({
  title,
  click,
  displayExpand,
  extraClassName,
}: {
  title: string;
  click: () => void;
  displayExpand: boolean;
  extraClassName?: string;
}) {
  return (
    <div
      className={classnames(styles.header, extraClassName, {
        [styles.supportCenter]: isSupportCenter(),
      })}
    >
      {title}
      {displayExpand && !extraClassName && <ReactComponent onClick={click} />}
    </div>
  );
}
