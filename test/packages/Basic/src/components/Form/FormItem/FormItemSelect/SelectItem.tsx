import React, { useMemo, useRef, useImperativeHandle, useEffect } from 'react';
import { Select } from 'antd';
import classnames from 'classnames';
import checkHighLight from './checkHighLight';
import Suffix from './Suffix';
import StringSelect from './StringSelect';
import Options from './Options';
import SelectMode from './SelectMode';
import type { FormItemSelectProps } from '../typing';
import lodash from 'lodash';
import styles from './index.less';

const SelectItem = React.forwardRef<any, FormItemSelectProps>((props, ref) => {
  const {
    form,
    formName,
    suffix,
    OnRecover,
    recoverValue,
    disabled,
    placeholder,
    onChange,
    onBlur,
    setVisible = () => {},
    mode,
    multipleString,
    editable,
    allowClear,
    loading,
    onSelect,
    value,
    getPopupContainer,
    onFocus,
    view = 'N',
    dicts,
    defaultSelectFirst = false,
    showOnlyOneItem = false,
    dictCode = '',
    optionLabelProp = '',
    dropdownMatchSelectWidth,
    autoClearSearchValue = true,
    required,
  } = props;

  const nodeRef = useRef();

  const ItemSelect = useMemo(() => {
    if (mode === SelectMode.multiple && multipleString) {
      return StringSelect;
    }
    return Select;
  }, [mode, multipleString]);

  const formValue = form.getFieldValue(formName);
  const hightLight = checkHighLight({ props, formValue, recoverValue });

  const onChangeFn = () => {
    // @ts-ignore
    if (nodeRef && nodeRef?.current?.blur && autoClearSearchValue) nodeRef.current.blur();
  };

  useImperativeHandle(ref, () => nodeRef?.current);

  useEffect(() => {
    if (showOnlyOneItem) {
      let selectValue;
      if (lodash.isArray(dicts) && dicts.length === 1) {
        selectValue = dicts[0].dictCode;
        onChange(selectValue);
      }
      if ((lodash.isArray(dicts) && dicts.length === 0) || !dicts) {
        selectValue = '';
        onChange(selectValue);
      }
    }
  }, [dicts, showOnlyOneItem]);

  useEffect(() => {
    if (lodash.isArray(dicts) && defaultSelectFirst && lodash.isEmpty(value)) {
      const dictCodeValue = dictCode ? lodash.get(dicts?.[0], dictCode) : dicts?.[0]?.dictCode;
      if (dictCodeValue) {
        onChange(dictCodeValue);
      }
    }
  }, [dictCode, dicts?.[0]?.[dictCode], dicts?.[0]?.dictCode, defaultSelectFirst]);

  return (
    <>
      <ItemSelect
        id={formName}
        showSearch
        className={classnames({
          hightLight,
          [styles.suffixVisible]: hightLight,
          [styles.view]: view === 'Y',
        })}
        mode={mode}
        filterOption={(input: any, option: any) =>
          String(option.props.children).toLowerCase().indexOf(String(input).toLowerCase()) >= 0
        }
        placeholder={placeholder}
        style={{ width: '100%' }}
        loading={loading}
        disabled={disabled}
        dropdownMatchSelectWidth={!!dropdownMatchSelectWidth}
        dropdownStyle={{ zIndex: 1200 }}
        editable={editable}
        allowClear={allowClear}
        value={value}
        onBlur={(e: any) => {
          setVisible(false);
          return onBlur && onBlur(e);
        }}
        onFocus={
          onFocus ||
          (() => {
            if (setVisible) setVisible(true);
          })
        }
        ref={nodeRef}
        onDropdownVisibleChange={() => {
          setVisible(false);
        }}
        onChange={(e: React.MouseEvent, o: any) => {
          onChangeFn();
          return onChange && onChange(e, o);
        }}
        onSelect={onSelect}
        getPopupContainer={getPopupContainer}
        suffixIcon={Suffix({
          form,
          onChangeFn,
          suffix,
          formName,
          recoverValue,
          OnRecover,
          disabled,
        })}
        autoClearSearchValue={autoClearSearchValue}
        required={required}
        {...(optionLabelProp ? { optionLabelProp } : {})}
      >
        {Options(props as any)}
      </ItemSelect>
      {view === 'Y' && dicts && dicts.find((item: any) => item.dictCode === value)?.dictName}
    </>
  );
});

export default SelectItem;
