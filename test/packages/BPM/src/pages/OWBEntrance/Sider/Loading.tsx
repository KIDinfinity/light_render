import lodash from 'lodash';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Spin } from 'antd';
import styles from './Loading.less';

export default (action: any) => {
  const body = document.querySelector('body');

  if (!body || !lodash.isFunction(action)) {
    return;
  }

  const container = document.createElement('div');
  body.appendChild(container);
  const loadingRoot = createRoot(container);
  loadingRoot.render(
    <div className={styles.spin}>
      <Spin />
    </div>
  );

  setTimeout(async () => {
    await action({});
    body.removeChild(container);
  });
};
