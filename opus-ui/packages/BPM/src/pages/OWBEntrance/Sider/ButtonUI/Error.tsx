import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TestFlag from 'basic/components/TestFlag';
import { useErrorRefs, scrollToError } from 'basic/components/Form';
import Icon from './Icon';

const Error = ({
  key,
  errorsCount,
  styles,
  globalDispatch,
  disabled,
  buttonCode,
  ...others
}: any) => {
  const errorRefs = useErrorRefs();
  return (
    <button
      onClick={() => {
        scrollToError(errorRefs);
      }}
      type="button"
      key={key}
      className={styles.box}
      disabled={disabled}
      {...others}
    >
      <Icon icon="error" />
      <span>
        {`${errorsCount}${formatMessageApi({
          Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button.error',
        })}`}
      </span>
    </button>
  );
};

export default TestFlag(({ props }: any) => {
  return {
    type: 'sider-button',
    tag: props.buttonCode,
  };
})(Error);
