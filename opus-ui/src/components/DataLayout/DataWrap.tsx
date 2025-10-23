import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';
import classNames from 'classnames';
import type { ColSpanType, ColProps } from './typings';

import styles from './styles.less';

interface IProps {
  className?: string;
  children?: ReactNode | string;
  span?: ColSpanType;
  colProps?: ColProps;
  style?: React.CSSProperties;
}

/**
 * 给Col组件传递属性
 * @param param
 */
const DataWrap: FunctionComponent<IProps> = ({
  className,
  children,
  colProps = {},
  style,
  ...res
}) => (
  <div className={classNames(styles.dataWrap, className)} {...res} {...colProps} style={style}>
    {children}
  </div>
);

export default DataWrap;
