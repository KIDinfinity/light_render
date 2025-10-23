import React from 'react';
import classNames from 'classnames';

import { Button } from 'opus/Components/Antd';

import styles from './index.less';

const Main = ({ title, handleClick, disabled = false }: any) => {
  return (
    <div className={classNames(styles.button, styles.default)}>
      <Button
        disabled={disabled}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        {title}
      </Button>
    </div>
  );
};

export default Main;
