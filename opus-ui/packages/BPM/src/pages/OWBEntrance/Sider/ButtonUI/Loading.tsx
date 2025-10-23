import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import TestFlag from 'basic/components/TestFlag';

const Loading = ({ title, styles, buttonCode, ...others }: any) => {
  return (
    <button
      data-trigger={buttonCode}
      type="button"
      disabled
      className={classnames(styles.box, styles.loading)}
      {...others}
    >
      <Icon type="loading" />
      <span>{title}</span>
    </button>
  );
};

export default TestFlag(({ props }: any) => {
  return {
    type: 'sider-button',
    tag: props.buttonCode,
  };
})(Loading);
