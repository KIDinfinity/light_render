import React, { useMemo, useRef, useImperativeHandle, useEffect, useState } from 'react';
import { Select, Input, Button } from 'antd';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import checkHighLight from './checkHighLight';
import Suffix from './Suffix';
import StringSelect from './StringSelect';
import Options from './Options';
import type { FormItemSelectProps } from '../typing';
import lodash, { compact, isString } from 'lodash';
import styles from './index.less';
import Apply from 'opus/Components/Buttons/Apply';
import { createPortal } from 'react-dom';
import SelectMode from './SelectMode';

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
    onApply,
    setVisible = () => {},
    mode,
    multipleString: multipleStringProp,
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
    dropdownMatchSelectWidth = false,
    showArrow = true,
    tagsContainer,
    memoSelect = true,
    dropdownStyle,
    onAddCustomItem,
    customItemPlaceholder,
  } = props;
  const isMultiple = mode === SelectMode.multiple;
  const multipleString = isMultiple && multipleStringProp;

  const finalValue = useMemo(() => {
    const fieldValue = form?.getFieldValue(formName) || value;

    if (multipleString) {
      if (isString(fieldValue)) {
        return compact(fieldValue?.split(','));
      }
      if (Array.isArray(fieldValue)) {
        return compact(fieldValue);
      }
    }
    return fieldValue;
  }, [form, formName, multipleString, value]);

  const [open, setOpen] = useState(false);
  const [disableBlur, setDisableBlur] = useState(false);
  const [customItem, setCustomItem] = useState('');
  const preValRef = useRef<string[]>(finalValue || []);
  const nodeRef = useRef<HTMLInputElement>();
  const customInputRef = useRef<HTMLInputElement>(null);

  const ItemSelect = useMemo(() => {
    if (multipleString) {
      return StringSelect;
    }
    return Select;
  }, [multipleString]);

  const hightLight = checkHighLight({ props, formValue: finalValue, recoverValue });

  const onChangeFn = () => {
    // @ts-ignore
    if (nodeRef && nodeRef?.current?.blur) nodeRef.current.blur();
  };

  const setField = (values) => {
    if (onChange) {
      onChange(values);
    }
  };

  const handleApply = (e) => {
    e.stopPropagation();
    setOpen(false);
    setDisableBlur(false);
    preValRef.current = finalValue;
    if (onApply) {
      onApply(finalValue);
    }
    if (nodeRef && nodeRef?.current?.blur) {
      nodeRef.current.blur();
    }
  };

  const handleClear = () => {
    if (multipleString) {
      setField('');
    } else {
      setField([]);
    }
  };

  const handleAdd = (e: any) => {
    e.preventDefault();

    if (onAddCustomItem && customItem) {
      const result = onAddCustomItem(customItem);

      if (result === false) {
        return;
      }
    }

    setCustomItem('');
    setTimeout(() => {
      customInputRef.current?.focus();
    }, 0);
  };

  const onCustomItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomItem(event.target.value);
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

  const multipleProps = {
    allowClear: false,
    menuItemSelectedIcon: <></>,
    open: open,
    onDropdownVisibleChange: (dropdownOpen: boolean) => {
      if (!disableBlur) {
        if (
          !Array.isArray(preValRef.current) &&
          String(preValRef.current) !== String(finalValue) &&
          memoSelect
        ) {
          setField(preValRef.current);
        }
        setOpen(dropdownOpen);
      }
      setVisible(false);
    },
    dropdownRender: (menu) => (
      <div onMouseEnter={() => setDisableBlur(true)} onMouseLeave={() => setDisableBlur(false)}>
        {menu}
        {onAddCustomItem && (
          <div className={styles.customOption}>
            <Input
              placeholder={customItemPlaceholder || ''}
              ref={customInputRef}
              value={customItem}
              onChange={onCustomItemChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="link" onClick={handleAdd}>
              Add
            </Button>
          </div>
        )}
        <div className={styles.btns} onMouseDown={(e) => e.preventDefault()}>
          <span onClick={handleClear} className={styles.clearBtn}>
            {formatMessageApi({ Label_COM_General: 'Clear' })}
          </span>
          <div className={styles.confirmrBtn}>
            <Apply handleApply={handleApply} />
          </div>
        </div>
      </div>
    ),
  };

  const onClose = (e, code) => {
    e.stopPropagation();
    const choiceList = finalValue;

    const newFilterChoice = lodash.includes(choiceList, code)
      ? lodash.filter(choiceList, (el) => el !== code)
      : [...choiceList, code];
    preValRef.current = newFilterChoice;

    if (multipleString) {
      const val =
        newFilterChoice && Array.isArray(newFilterChoice) ? newFilterChoice : [newFilterChoice];
      const multipleStringValue = lodash.compact(val)?.join?.(',');
      setField(multipleStringValue);
    } else {
      setField(newFilterChoice);
    }
  };

  const { options, tagsContent } = Options({ ...props, onClose });

  return (
    <div
      className={classnames(styles.selectWrap, {
        [styles.selectMultipleWrap]: isMultiple,
        [styles.onlyDisplayTags]: isMultiple && disabled && tagsContent,
      })}
    >
      <ItemSelect
        id={formName}
        showSearch
        showArrow={showArrow}
        className={classnames({
          hightLight,
          [styles.suffixVisible]: hightLight,
          [styles.view]: view === 'Y',
        })}
        dropdownClassName={classnames({ [styles.multipleDropdown]: isMultiple })}
        mode={mode}
        filterOption={(input: any, option: any) =>
          String(option.props.children).toLowerCase().indexOf(String(input).toLowerCase()) >= 0
        }
        placeholder={placeholder}
        style={{ width: '100%' }}
        loading={loading}
        disabled={disabled}
        dropdownMatchSelectWidth={!!dropdownMatchSelectWidth}
        dropdownStyle={{ zIndex: 1200, ...dropdownStyle }}
        editable={editable}
        allowClear={allowClear}
        value={finalValue}
        onBlur={(e: any) => {
          setVisible(false);
          return onBlur && onBlur(e);
        }}
        onFocus={
          onFocus
            ? onFocus
            : () => {
                // 显示错误
                if (setVisible) setVisible(true);
              }
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
          value: finalValue,
        })}
        {...(optionLabelProp ? { optionLabelProp } : {})}
        {...(isMultiple ? multipleProps : {})}
      >
        {options}
      </ItemSelect>
      {view === 'Y' && dicts && dicts.find((item: any) => item.dictCode === value)?.dictName}
      {/* 全眼线label 需要传 tagsContainer */}
      {tagsContainer ? createPortal(tagsContent, tagsContainer) : tagsContent}
    </div>
  );
});

export default SelectItem;
