import React from 'react';
import styles from './index.less';
import CommonHeader from './CommonHeader';
import classNames from 'classnames';

export default function CommonBox({
  title,
  children,
  click = () => {},
  displayExpand = true,
  className,
}: {
  title: string;
  children: React.ReactNode;
  click: () => void;
  displayExpand?: boolean;
  className?: any;
}) {
  return (
    <>
      <CommonHeader title={title} click={click} displayExpand={displayExpand} />
      <div className={classNames(styles.commonBox, className)}>{children}</div>
    </>
  );
}
