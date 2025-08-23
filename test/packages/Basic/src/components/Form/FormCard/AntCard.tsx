import React from 'react';
import { Card as AntCard } from 'antd';
import classnames from 'classnames';
import styles from './AntCard.less';

interface CardProps {
  bordered?: boolean;
  children?: any;
  extra?: React.ReactNode;
  loading?: boolean;
  title?: React.ReactNode;
  style?: any;
  bodyStyle?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  className?: any;
}

const Card = ({
  bordered,
  extra,
  className,
  title,
  bodyStyle,
  headStyle,
  loading,
  children,
  style,
}: CardProps) => (
  <div className={classnames(styles.card, className)}>
    <AntCard {...{ bordered, extra, title, loading, bodyStyle, headStyle, style }}>
      {children}
    </AntCard>
  </div>
);

export default Card;
