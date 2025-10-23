import React, { useRef } from 'react';
import classnames from 'classnames';
import TestFlag from 'basic/components/TestFlag';
import useExpanderController from 'navigator/hooks/useExpanderController';
import Icon from './Icon';
import commonStyles from './CommonButton.less';
import compressStyles from './CompressButton.less';

const Upload = ({
  key,
  title,
  className,
  status,
  icon,
  action,
  buttonCode,
  onChange,
  globalDispatch,
  disabled,
  ...others
}: any) => {
  const { isSiderToggleOn: compress } = useExpanderController();
  const styles = compress ? compressStyles : commonStyles;

  const fileRef = useRef(null);
  const tirggerSelectFile = () => (fileRef?.current as any)?.click();

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
      onClick={tirggerSelectFile}
      {...others}
      disabled={disabled}
    >
      <Icon icon={icon} status={status} compress={compress} />
      <span>{title}</span>
      <input
        type="file"
        ref={fileRef}
        onChange={() => {
          onChange({ files: (fileRef.current as any).files, dispatch: globalDispatch });
        }}
        className={styles.hidden}
        {...others}
      />
    </button>
  );
};

export default TestFlag(({ props }: any) => {
  return {
    type: 'sider-button',
    tag: props.buttonCode,
  };
})(Upload);
