import lodash from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import styles from './Loading.less';

export default (action: any) => {
  const body = document.querySelector('body');

  if (!body || !lodash.isFunction(action)) {
    return;
  }

  const container = document.createElement('div');
  body.appendChild(container);

  ReactDOM.render(
    <div className={styles.spin}>
      <Spin />
    </div>,
    container
  );

  setTimeout(async () => {
    await action({});
    body.removeChild(container);
  });
};
