import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

const Container = ({ location, id, hasTitle, children }: any) => {
  return (
    <div
      className={classnames(styles.dialog, {
        [styles.hasTitle]: hasTitle,
      })}
      onMouseUp={(e) => {
        location.handleMouseUp(e);
      }}
      id={id}
      onMouseDown={location.handleStartMove}
    >
      {children}
    </div>
  );
};

export default Container;
