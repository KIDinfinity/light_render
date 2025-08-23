import React from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';

import styles from './index.less';

function InsertSpin() {
  const body: any = document.querySelector('body');
  const container = document.createElement('div');
  body.appendChild(container);
   ReactDOM.render(
      <div className={styles.spin}>
        <Spin />
      </div>,
      container
    );
  return container;
}

export const removeLoading = (container: HTMLElement) => {
  const body = document.querySelector('body');
  if (body && container) {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(container);
      body.removeChild(container);
    }, 0)
  }
};

export default InsertSpin;
