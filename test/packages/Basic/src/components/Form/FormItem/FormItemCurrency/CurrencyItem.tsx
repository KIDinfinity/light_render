import React, { useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import { isNumber } from 'lodash';
import { AccuracyConfigTool, FormateTools } from '@/utils/accuracy';
import type { FormItemCurrencyProps } from '../typing';

const CurrencyItem = React.forwardRef<any, FormItemCurrencyProps>((props, ref) => {
  const {
    form,
    formName,
    disabled,
    placeholder,
    setVisible = () => {},
    objectName,
    formatter,
    parser,
    objectFieldName,
    objectFieldValueType,
    precision,
    min,
    max,
    onChange,
    value,
    defaultParser,
    onBlur,
    onFocus,
    required,
  } = props;

  const [NewFormateTools, setNewFormateTools]: any = useState(null);

  useEffect(() => {
    const accuracyItem = objectName
      ? AccuracyConfigTool.getAccuaryItem({
          objectFieldName: objectFieldName
            ? `${objectName}.${objectFieldName}`
            : `${objectName}.${formName}`,
          objectFieldValueType,
        })
      : {};
    setNewFormateTools(
      new FormateTools({
        formatter,
        parser,
        precision: isNumber(precision) ? precision : 2,
        accuracyItem,
        defaultParser,
      })
    );
  }, [formatter, parser, defaultParser]);

  const handleFocus = (_value) => {
    if (onFocus) onFocus(_value);
    setVisible(true);
  };

  const handleBlur = (_value) => {
    if (onBlur) onBlur(_value);
    setVisible(false);
  };

  return (
    <InputNumber
      id={formName}
      style={{ width: '100%' }}
      disabled={disabled}
      formatter={(val: any) => NewFormateTools?.getFormatter(val) || val}
      parser={(val: any) => NewFormateTools?.getParser(val) || val}
      precision={NewFormateTools ? NewFormateTools?.getDecimalDigits() : 2}
      onBlur={handleBlur}
      onFocus={handleFocus}
      ref={ref}
      min={min}
      max={max}
      onChange={onChange}
      value={value}
      title={NewFormateTools?.getComplementValue(form.getFieldValue(formName)) || ''}
      placeholder={placeholder}
      required={required}
    />
  );
});

export default CurrencyItem;
