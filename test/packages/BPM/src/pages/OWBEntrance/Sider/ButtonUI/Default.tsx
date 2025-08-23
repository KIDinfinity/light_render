import React from 'react';
import classnames from 'classnames';
import lodash from 'lodash';
import TestFlag from 'basic/components/TestFlag';
import Icon from './Icon';

const Default = ({
  key,
  title,
  styles,
  className,
  status,
  icon,
  action,
  buttonCode,
  compress,
  disabled,
}: any) => {
  const actionThrottled = lodash.throttle(() => {
    status !== 'disabled' && action();
  }, 300);
  return (
    <button
      type="button"
      key={key}
      className={classnames(styles.box, styles[icon], styles[className], {
        [styles.active]: status === 'active',
        [styles.disabled]: status === 'disabled',
        [styles.warning]: status === 'warning',
        [styles.default]: status === 'default',
      })}
      data-role={`bpmButton-${buttonCode}`}
      data-trigger={buttonCode}
      onClick={actionThrottled}
      disabled={status === 'disabled' || disabled}
    >
      <Icon icon={icon} status={status} compress={compress} />
      <span>{title}</span>
    </button>
  );
};

export default TestFlag(({ props }: any) => {
  return {
    type: 'sider-button',
    tag: props.buttonCode,
  };
})(Default);
