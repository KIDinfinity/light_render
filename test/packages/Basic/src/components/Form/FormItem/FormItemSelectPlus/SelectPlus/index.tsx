import React, { useState, useRef, useMemo, useEffect, useImperativeHandle } from 'react';
import lodash from 'lodash';
import { Select } from 'antd';
import classNames from 'classnames';
import useAbortController from '@/components/AbortController/useAbortController';
import type { ShowOptionType } from './enum';
import { Mode } from './enum';
import { useGetOptions, useGetCodeName, useHandleChangeCallback } from './_hooks';
import SuffixIcon from './SuffixIcon';
import Options from './Options';
import styles from './index.less';

interface IOnChange {
  (value: string | string[]): any;
}
interface SelectPlusProps {
  dropdownCode: string;
  otherParams: any;
  searchName: Function;
  searchCustom: Function;
  saveName?: boolean;
  onChange: IOnChange;
  mode: Mode;
  disabled: undefined | boolean;
  errors?: any;
  optionShowType?: ShowOptionType;
  disabledDictCodes?: [string | number];
  bankCodeLength: number;
  selectCallbackExProp: string | [any];
  internationalizationType?: string;
  formName: string;
  recoverValue: any;
  OnRecover: Function;
  parent: {
    onDropdownVisibleChangeFn: Function;
  };
  setOptions: Function;
  onSelectCallback: Function;
  selectCallbackItem: boolean;
  value: any;
  form: any;
  extraData: any;
  customUrl?: Function;
  setVisible: Function;
  callBackSetDataList?: Function;
  callBackCurrentItem?: any;
  isFreeText: boolean; //是否可以自由输入
  freeTextHiddenName?: boolean; //只有输入的时候是否展示name
  isPassCodeName?: boolean; //submit 入参类型，true code-name fasle默认
  allowEmptySearch?: boolean; // 是否允许空搜索
}
interface IPaginationData {
  total: number;
  pageSize: number;
  current: number;
  totalPage: number;
}

const transferData = (data: any) => (lodash.isNil(data) || data === '' ? false : data);

const SelectPlus = React.forwardRef<any, SelectPlusProps>(
  (
    {
      mode,
      disabled,
      recoverValue,
      formName,
      onChange,
      OnRecover,
      searchName,
      searchCustom,
      dropdownCode,
      internationalizationType,
      bankCodeLength,
      disabledDictCodes,
      optionShowType,
      saveName,
      otherParams,
      parent,
      value: propsValue,
      onSelectCallback,
      selectCallbackItem,
      selectCallbackExProp,
      form,
      extraData,
      customUrl,
      setVisible,
      callBackSetDataList,
      callBackCurrentItem,
      isFreeText,
      freeTextHiddenName,
      isPassCodeName,
      allowEmptySearch = true,
      required = true,
      ...others
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref
  ) => {
    const [searchContent, setSearchContent] = useState('');
    const nodeRef: any = useRef();
    const [focused, setFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataList, setDataList] = useState<any[]>([]);
    const [currentCodes, setCodes] = useState([]);
    const [paginationData, setPaginationData] = useState({
      current: 1,
      pageSize: 10,
    } as IPaginationData);
    const onDropdownVisibleChangeFn = (e: any) => {
      if (!!searchContent || allowEmptySearch) {
        setVisible(e);
        setFocused(e);
      }
    };
    const signal = useAbortController([
      searchContent,
      paginationData?.pageSize,
      paginationData?.current,
      extraData,
    ]);

    const handleGetOptions = useGetOptions({
      setLoading,
      setDataList,
      searchCustom,
      bankCodeLength,
      internationalizationType,
      dropdownCode,
      otherParams,
      customUrl,
      saveName,
      callBackSetDataList,
      setPaginationData,
      paginationData,
      isFreeText,
      freeTextHiddenName,
      allowEmptySearch,
    });
    useEffect(() => {
      handleGetOptions({
        searchContent,
        ...lodash.pick(paginationData, ['pageSize', 'current']),
        signal,
        extraData,
      });
      if (!allowEmptySearch) {
        if (!searchContent) {
          setDataList([]);
          setPaginationData({} as IPaginationData);
        }
        onDropdownVisibleChangeFn(true);
      }
    }, [signal]);

    useEffect(() => {
      const diffDatas = lodash.difference(
        propsValue,
        lodash.map(dataList, (el: any) => el.dictCode)
      );

      if (!lodash.isEmpty(diffDatas)) {
        handleGetOptions({
          searchContent,
          ...lodash.pick(paginationData, ['pageSize', 'current']),
          signal,
          extraData,
        });
      }
    }, [propsValue, dataList]);
    const handleResetOptions = () => {
      setSearchContent('');
    };
    const handleGetCodeName = useGetCodeName({
      setCodes,
      searchName,
      currentCodes,
      dataList,
      extraData,
      setPaginationData,
      paginationData,
      callBackCurrentItem,
    });
    const handleBlur = () => {
      if (!allowEmptySearch) {
        handleResetOptions();
      }
      setFocused(false);
      if (nodeRef && nodeRef.current) {
        // @ts-ignore
        nodeRef.current.blur();
      }
    };
    const handleChangeCallback = useHandleChangeCallback({
      selectCallbackExProp,
      onSelectCallback,
      dataSources: dataList,
      selectCallbackItem,
    });
    const handleChange = (value: string | string[]) => {
      handleBlur();

      if (lodash.isFunction(onChange)) {
        const dictItem: any =
          lodash
            .chain(dataList)
            .find(({ dictCode }: any) => dictCode === value)
            .value() || {};

        const newValut =
          !!isPassCodeName && !!value && !!dictItem?.dictName
            ? `${dictItem?.dictCode}-${dictItem?.dictName}`
            : value;
        onChange(newValut);
      }
      handleChangeCallback(value);
    };
    const handleSelect = () => {
      if ((mode !== Mode.tag && mode !== Mode.multiple) || !allowEmptySearch) {
        handleResetOptions();
      }
    };
    const handleFocus = async () => {
      if (!!searchContent || allowEmptySearch) {
        setFocused(true);
        onDropdownVisibleChangeFn(true);
        handleResetOptions();
        if (customUrl && otherParams) {
          handleGetOptions({
            searchContent,
            ...lodash.pick(paginationData, ['pageSize', 'current']),
            signal,
            extraData,
          });
        }
      }
    };
    const handlePageChange = (current: number, pageSize: number) => {
      setPaginationData({
        ...paginationData,
        current,
        pageSize,
      });
    };
    const hightLight = useMemo(() => {
      const formValue = form?.getFieldValue(formName) || propsValue;
      return (
        recoverValue !== undefined &&
        !lodash.isEqual(transferData(recoverValue), transferData(formValue))
      );
    }, [propsValue]);
    const suffixVisible = useMemo(() => {
      return !!hightLight;
    }, [hightLight]);

    useEffect(() => {
      handleGetCodeName(propsValue);
    }, [propsValue]);

    const debounce = lodash.debounce((value: any) => {
      setPaginationData({
        ...paginationData,
        current: 1,
      });
      setSearchContent(value);
    }, 500);

    const { total, current } = paginationData;

    useImperativeHandle(ref, () => nodeRef?.current);

    return (
      <Select
        {...others}
        value={propsValue}
        className={classNames([styles.suffixVisible], {
          hightLight: suffixVisible,
        })}
        ref={nodeRef}
        dropdownMatchSelectWidth={false}
        loading={loading}
        // @ts-ignore
        mode={mode}
        showSearch
        allowClear
        open={focused}
        onDropdownVisibleChange={onDropdownVisibleChangeFn}
        onBlur={handleBlur}
        onChange={handleChange}
        onSearch={debounce}
        onSelect={handleSelect}
        onFocus={handleFocus}
        filterOption={() => true}
        dropdownClassName={styles.dropDown}
        disabled={disabled}
        suffixIcon={
          <SuffixIcon
            formName={formName}
            recoverValue={recoverValue}
            OnRecover={OnRecover}
            hightLight={hightLight}
            disabled={disabled}
          />
        }
        required={required}
      >
        {Options({
          optionShowType,
          dataSources: dataList,
          saveName,
          disabledDictCodes,
          total,
          current,
          handlePageChange,
          currentCodes,
        })}
      </Select>
    );
  }
);

export default SelectPlus;
