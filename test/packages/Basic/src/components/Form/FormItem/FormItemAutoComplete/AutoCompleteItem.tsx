import React, { useState, useEffect } from 'react';
import { AutoComplete } from 'antd';
import classNames from 'classnames';
import { isArray } from 'lodash';
import { useSelector } from 'dva';
import { hasError, hasInformation } from '../utils';
import type { FormItemAutoCompleteProps } from '../typing';

const AutoCompleteItem = React.forwardRef<any, FormItemAutoCompleteProps>(
  (props: any, ref: any) => {
    const {
      formName,
      disabled,
      placeholder,
      warningMessage,
      className,
      onChange,
      onBlur,
      setVisible,
      onSelect,
      allowClear,
      children,
      onSearch,
      propsDefaultValue,
      dataSource: propsDataSource,
      value,
      isDecorator,
      required = false,
    } = props;
    const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
    const [dataSource, setDataSource]: any = useState([]);
    const handleSearch = async (searchText: string) => {
      const result: any = await onSearch(searchText);
      setDataSource(isArray(result) ? result : []);
    };

    useEffect(() => {
      if (propsDefaultValue) {
        handleSearch(propsDefaultValue);
      }
    }, []);

    useEffect(() => {
      if (propsDataSource) {
        setDataSource(propsDataSource);
      }
    }, [propsDataSource]);

    return (
      <AutoComplete
        id={formName}
        className={classNames(className, {
          hasInformation: hasInformation(warningMessage, taskNotEditable),
          hasError: hasError(warningMessage),
        })}
        style={{ width: '100%' }}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        value={value}
        onSelect={onSelect}
        onSearch={handleSearch}
        dropdownStyle={{ zIndex: 1200 }}
        onBlur={(e) => {
          setVisible(false);
          return onBlur && onBlur(e);
        }}
        onFocus={() => setVisible(true)}
        ref={ref}
        allowClear={allowClear}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
        filterOption={(inputValue: any, option: any) =>
          option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        required={required}
        {...(isDecorator ? { dataSource } : { options: dataSource })}
      >
        {children}
      </AutoComplete>
    );
  }
);

export default AutoCompleteItem;
