import React from 'react';
import { Label } from '@/components/ErrorTooltip';
import CheckBox from './CheckBox';
import type { FormItemCheckboxProps } from '../typing';
import classnames from 'classnames';
import styles from './index.less';

const CheckBoxItem = React.forwardRef<any, FormItemCheckboxProps>((props: any, ref: any) => {
  const {
    form,
    formName,
    disabled,
    onChange,
    setVisible,
    isInline,
    valueType,
    labelId,
    labelTypeCode,
    checked,
    value,
    view = 'N',
    isInlineWrap,
    required,
  } = props;
  return (
    <CheckBox
      form={form}
      formName={formName}
      id={formName}
      valueType={valueType}
      disabled={disabled}
      onChange={(e: any) => onChange && onChange(e)}
      style={{ height: 24 }}
      ref={ref}
      value={value}
      onBlur={() => {
        setVisible(false);
      }}
      onFocus={() => {
        setVisible(true);
      }}
      checked={checked}
      className={classnames({
        [styles.viewLH]: view === 'Y',
        [styles.inlineWrapCheckBox]: isInlineWrap === true,
      })}
      required={required}
    >
      {isInline && (
        <Label
          labelId={labelId}
          labelTypeCode={labelTypeCode}
          className={classnames({
            [styles.checkbox]: true,
            [styles.view]: view === 'Y',
            [styles.inlineWrapLabel]: isInlineWrap === true,
          })}
        />
      )}
    </CheckBox>
  );
});

export default CheckBoxItem;
