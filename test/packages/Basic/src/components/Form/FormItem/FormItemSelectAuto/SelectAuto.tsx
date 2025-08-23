import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';

function SelectAuto(
  {
    formName,
    disabled,
    mode,
    allowClear,
    typeCode,
    onFocus,
    optionShowType,
    dictCode,
    dictName,
    getPopupContainer,
    value,
    onChange,
    setOptions,
    required,
  }: any,
  ref: any
) {
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const dispatch = useDispatch();
  const handleGetOptionDictionary = async () => {
    setLoading(true);
    await dispatch({
      type: 'selectOptionsDictionary/get',
      payload: {
        typeCode,
      },
    });
    setLoading(false);
  };
  const handleFocus = async () => {
    if (!focused) {
      await handleGetOptionDictionary();
    }
    if (lodash.isFunction(onFocus)) {
      onFocus();
    }
  };
  useEffect(() => {
    if (value && !focused) {
      handleGetOptionDictionary();
      setFocused(true);
    }
  }, [typeCode, value, focused]);
  const dicts =
    useSelector((state: any) => state.selectOptionsDictionary.dictionary[typeCode]) || [];

  if (lodash.isFunction(setOptions)) {
    setOptions(
      dicts?.map?.((item: any) => ({
        value: item.dictCode,
        name: item.dictName,
      }))
    );
  }

  return (
    <Select
      id={formName}
      value={value}
      showSearch
      mode={mode}
      filterOption={(input, option) =>
        String(option.props.children).toLowerCase().indexOf(String(input).toLowerCase()) >= 0
      }
      loading={loading}
      disabled={disabled}
      dropdownMatchSelectWidth={false}
      allowClear={allowClear}
      onFocus={handleFocus}
      style={{ width: '100%' }}
      getPopupContainer={getPopupContainer}
      onChange={onChange}
      ref={ref}
      required={required}
    >
      {dicts?.map?.((item: any) => (
        <Select.Option
          key={item[dictCode]}
          value={item[dictCode]}
          title={(() => {
            if (optionShowType === 'both') return `${item[dictCode]} - ${item[dictName]}`;
            if (optionShowType === 'value') return item[dictCode];
            if (optionShowType === 'name') return item[dictName];
            return item[dictName];
          })()}
        >
          {(() => {
            if (optionShowType === 'both') return `${item[dictCode]} - ${item[dictName]}`;
            if (optionShowType === 'value') return item[dictCode];
            if (optionShowType === 'name') return item[dictName];
            return item[dictName];
          })()}
        </Select.Option>
      ))}
    </Select>
  );
}

export default React.forwardRef(SelectAuto);
