import React, { useMemo } from 'react';
import { Checkbox } from 'antd';
import CheckBoxType from './CheckBoxType';

const CheckBox = React.forwardRef((props: any, ref: any) => {
  const { valueType, onChange, checked } = props;

  const getValue = (checkValue: any) => {
    if (valueType === CheckBoxType.boolean) {
      return !!checkValue;
    }
    if (valueType === CheckBoxType.string) {
      return checkValue ? '1' : '0';
    }
    if (valueType === CheckBoxType.letter) {
      return checkValue ? 'Y' : 'N';
    }
    return checkValue ? 1 : 0;
  };

  const handleChange = (event: any): void => {
    if (onChange) {
      const {
        // @ts-ignore
        target: { checked: targetChecked },
      } = event;

      onChange({
        ...event,
        target: {
          ...event.target,
          checked: getValue(targetChecked),
        },
      });
    }
  };

  // 这里打开submit会变成一个对象
  // useEffect(() => {
  //   const value = form.getFieldValue(formName);
  //   if (valueType === CheckBoxType.letter && lodash.isEmpty(value)) {
  //     form.setFieldsValue({
  //       [formName]: getValue(value),
  //     })
  //   }
  // }, [])

  const newValue = useMemo(() => {
    if (valueType === 'letter') {
      return checked === 'Y';
    }
    if (typeof checked === 'string') {
      return checked === '1';
    }
    if (typeof checked === 'number') {
      return checked === 1;
    }
    return checked;
  }, [checked]);

  return <Checkbox {...props} onChange={handleChange} checked={newValue} ref={ref} />;
});

export default CheckBox;
