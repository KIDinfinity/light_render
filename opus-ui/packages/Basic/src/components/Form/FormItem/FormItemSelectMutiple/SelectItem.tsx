import React, { useMemo, useRef, useImperativeHandle, useEffect, useState } from 'react';
import { Select, Tag } from 'antd';
import classnames from 'classnames';
import checkHighLight from './checkHighLight';
import Suffix from './Suffix';
import StringSelect from './StringSelect';
import Options, { getDisplayName } from './Options';
import type { FormItemSelectProps } from '../typing';
import lodash from 'lodash';
import styles from './index.less';
import Apply from 'opus/Components/Buttons/Apply';
import { createPortal } from 'react-dom';

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
    optionLabelProp = '',
    dropdownMatchSelectWidth = false,
    showArrow = true,
    tagsContainer,
    optionShowType,
    dictCode,
  } = props;
  const formValue = form?.getFieldValue(formName) || value;

  const [open, setOpen] = useState(false);
  const [disableBlur, setDisableBlur] = useState(false);
  const preValRef = useRef<string[]>(formValue || []);
  const nodeRef = useRef<HTMLInputElement>();

  const ItemSelect = useMemo(() => {
    if (multipleString) {
      return StringSelect;
    }
    return Select;
  }, [multipleString]);

  const hightLight = checkHighLight({ props, formValue, recoverValue });

  const onChangeFn = () => {
    // @ts-ignore
    if (nodeRef && nodeRef?.current?.blur) nodeRef.current.blur();
  };

  const handleApply = (e) => {
    e.stopPropagation();
    setOpen(false);
    setDisableBlur(false);
    preValRef.current = formValue;
    if (nodeRef && nodeRef?.current?.blur) {
      nodeRef.current.blur();
    }
  };

  const setField = (values) => {
    if (form) {
      form?.setFieldsValue({ [formName]: values });
    }

    if (onChange) {
      onChange(values);
    }
  };

  const handleClear = () => {
    setField([]);
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

  const tagsContent = (
    <div className={styles.selectTags}>
      {lodash.map(formValue || [], (code: any) => (
        <Tag
          closable
          key={code}
          onClose={(e) => {
            e.stopPropagation();
            const choiceList = formValue;
            const newFilterChoice = lodash.includes(choiceList, code)
              ? lodash.filter(choiceList, (el) => el !== code)
              : [...choiceList, code];
            preValRef.current = newFilterChoice;
            setField(newFilterChoice);
          }}
        >
          {getDisplayName({
            optionShowType,
            dictCode,
            item: {
              [dictCode]: code,
              dictName: lodash.find(dicts, (i) => i[dictCode] === code)?.dictName,
            },
          })}
        </Tag>
      ))}
    </div>
  );
  return (
    <div className={classnames(styles.selectWrap)}>
      <ItemSelect
        id={formName}
        showSearch
        showArrow={showArrow}
        className={classnames({
          hightLight,
          [styles.suffixVisible]: hightLight,
          [styles.view]: view === 'Y',
        })}
        dropdownClassName={styles.multipleDropdown}
        mode="multiple"
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
        value={formValue}
        getPopupContainer={getPopupContainer}
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
        onChange={(e: React.MouseEvent, o: any) => {
          onChangeFn();
          return onChange && onChange(e, o);
        }}
        onSelect={onSelect}
        suffixIcon={Suffix({
          form,
          onChangeFn,
          suffix,
          formName,
          recoverValue,
          OnRecover,
          disabled,
          value,
        })}
        allowClear={false}
        menuItemSelectedIcon={<></>}
        open={open}
        onDropdownVisibleChange={(dropdownOpen: boolean) => {
          if (!disableBlur) {
            if (String(preValRef.current) !== String(formValue)) {
              setField(preValRef.current);
            }
            setOpen(dropdownOpen);
          }
          setVisible(false);
        }}
        dropdownRender={(menu) => (
          <div onMouseEnter={() => setDisableBlur(true)} onMouseLeave={() => setDisableBlur(false)}>
            {menu}
            <div className={styles.btns} onMouseDown={(e) => e.preventDefault()}>
              <span onClick={handleClear} className={styles.clearBtn}>
                Clear
              </span>
              <div className={styles.confirmrBtn}>
                <Apply handleApply={handleApply} />
              </div>
            </div>
          </div>
        )}
        {...(optionLabelProp ? { optionLabelProp } : {})}
      >
        {Options(props as any)}
      </ItemSelect>
      {view === 'Y' && dicts && dicts.find((item: any) => item.dictCode === value)?.dictName}
      {/* 全眼线label 需要传 tagsContainer */}
      {tagsContainer ? createPortal(tagsContent, tagsContainer) : tagsContent}
    </div>
  );
});

export default SelectItem;
