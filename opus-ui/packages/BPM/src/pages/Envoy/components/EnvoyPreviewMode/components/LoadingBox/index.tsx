import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import classNames from 'classnames';
export default function Loading({ loading, children, className, type }) {
  return (
    <>
      {type === 'inline' ? (
        <>
          {loading && (
            <div
              className={classNames({
                [styles.loading]: !className,
                [className]: true,
              })}
            >
              <Spin size="large" />
            </div>
          )}
          {children}
        </>
      ) : (
        <>
          {loading ? (
            <div
              className={classNames({
                [styles.loading]: !className,
                [className]: true,
              })}
            >
              <Spin size="large" />
            </div>
          ) : (
            children
          )}
        </>
      )}
    </>
  );
}
