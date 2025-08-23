import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import { FormItemInput, FormItemTextArea } from 'basic/components/Form';
import styles from './index.less';

interface IProps {
  commonProps: any;
  checked?: boolean | undefined;
  onMouseEnter?: any;
  onMouseLeave?: any;
  unCheckedChildren?: React.ReactElement;
  unCheckedChildrenProps?: any;
  checkedChildren?: React.ReactElement;
  checkedChildrenProps?: any;
  className?: any;
}

let switchTime: any = null;

function SwitchComponent(props: IProps) {
  const [checked, setChecked] = useState(props?.checked || false);
  const locked: any = useRef(false);
  const checkedChildrenRef: any = useRef();

  useEffect(() => {
    setChecked(props?.checked);
    return () => {
      clearTimeout(switchTime);
    };
  }, [props?.checked]);

  const handleMouseEnterFn = useCallback(() => {
    if (!locked.current) {
      switchTime = setTimeout(() => {
        setChecked(true);
      }, 500);
    }
  }, [locked?.current]);
  const handleMouseLeaveFn = useCallback(() => {
    if (!locked.current) {
      clearTimeout(switchTime);
      setChecked(false);
    }
  }, [locked?.current]);

  const unCheckedChildrenFocusFn = () => {
    clearTimeout(switchTime);
    setChecked(true);
    checkedChildrenRef?.current?.querySelector('textarea')?.focus();
  };
  const handleFocusFn = useCallback(() => {
    clearTimeout(switchTime);
    locked.current = true;
    setChecked(true);
  }, []);
  const handleBlurFn = useCallback(() => {
    clearTimeout(switchTime);
    locked.current = false;
    setChecked(false);
  }, []);

  const {
    onMouseEnter = handleMouseEnterFn,
    onMouseLeave = handleMouseLeaveFn,
    commonProps,
    unCheckedChildren = <FormItemInput />,
    unCheckedChildrenProps,
    checkedChildren = <FormItemTextArea />,
    checkedChildrenProps,
    className,
  } = props;

  return (
    <div
      className={classnames({
        [styles.swtichComponent]: true,
        [styles.checked]: checked,
        [className]: className,
      })}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.unCheckedChildren}>
        {React.cloneElement(unCheckedChildren, {
          onFocus: unCheckedChildrenFocusFn,
          ...commonProps,
          ...unCheckedChildrenProps,
        })}
      </div>
      <div className={styles.checkedChildren} ref={checkedChildrenRef}>
        {React.cloneElement(checkedChildren, {
          onFocus: handleFocusFn,
          onBlur: handleBlurFn,
          ...commonProps,
          ...checkedChildrenProps,
        })}
      </div>
    </div>
  );
}

export default memo(SwitchComponent);
