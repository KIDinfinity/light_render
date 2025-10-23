import React, { useState, useRef, useMemo, useEffect, useImperativeHandle } from 'react';
import lodash from 'lodash';
import { Select, Tag } from 'antd';
import classNames from 'classnames';
import useAbortController from '@/components/AbortController/useAbortController';
import { Mode, ShowOptionType } from './enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Apply from 'opus/Components/Buttons/Apply';
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
  isPassCodeName?: boolean; //submit 入参类型，true code-name fasle默认
  allowEmptySearch?: boolean; // 是否允许空搜索
  showArrow?: boolean;
  dicts: any;
  setDicts: any;
  searchIcon: any;
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
      isPassCodeName,
      showArrow = true,
      allowEmptySearch = true,
      dicts = [],
      setDicts = () => {},
      localDicts = [],
      searchIcon,
      ...others
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref
  ) => {
    const isMultiple = mode === 'multiple';
    const finalValue = form?.getFieldValue(formName) || propsValue;
    const [searchContent, setSearchContent] = useState('');
    const nodeRef: any = useRef();
    const [focused, setFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resetList, updateResetList] = useState(finalValue || []);
    const [dataList, setDataList] = useState<any[]>([]);
    const [currentCodes, setCodes] = useState([]);
    const [paginationData, setPaginationData] = useState({
      current: 1,
      pageSize: 10,
    } as IPaginationData);

    const setField = (values) => {
      if (onChange) {
        onChange(values);
      }
    };

    useEffect(() => {
      if (!focused && isMultiple) updateResetList(finalValue);
    }, [finalValue, focused, isMultiple]);

    useEffect(() => {
      if (dataList.length || currentCodes.length) {
        const nextDicts = lodash.uniqBy([...dicts, ...dataList, ...currentCodes], 'dictCode');
        setDicts(nextDicts);
      }
    }, [dataList, currentCodes]);
    const onDropdownVisibleChangeFn = (e: any) => {
      if (!!searchContent || allowEmptySearch) {
        setVisible(e);
        setFocused(e);
        if (e === false && isMultiple) {
          setField(resetList);
        }
      }
    };
    const signal = useAbortController([
      searchContent,
      paginationData?.pageSize,
      paginationData?.current,
      extraData,
    ]);

    const handleGetOptions = useGetOptions({
      finalValue,
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
      allowEmptySearch,
    });

    useEffect(() => {
      handleGetOptions({
        searchContent,
        ...lodash.pick(paginationData, ['pageSize', 'current']),
        signal,
        localDicts,
        extraData,
      });
      if (!allowEmptySearch) {
        if (!searchContent) {
          setDataList([]);
          setPaginationData({} as IPaginationData);
        }
        onDropdownVisibleChangeFn(true);
      }
    }, [signal, localDicts.length]);

    // useEffect(() => {
    //   const diffDatas = lodash.difference(
    //     propsValue,
    //     lodash.map(dataList, (el: any) => el.dictCode)
    //   );

    //   if (!lodash.isEmpty(diffDatas)) {
    //     handleGetOptions({
    //       searchContent,
    //       ...lodash.pick(paginationData, ['pageSize', 'current']),
    //       signal,
    //       extraData,
    //     });
    //   }
    // }, [propsValue, dataList]);
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
      // 整个handleChange都是有问题的，value实际上是整个list，但逻辑都是按照单个item来写的
      !isMultiple && handleBlur();

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
      return (
        recoverValue !== undefined &&
        !lodash.isEqual(transferData(recoverValue), transferData(finalValue))
      );
    }, [finalValue]);

    const suffixVisible = useMemo(() => {
      return !!hightLight;
    }, [hightLight]);

    useEffect(() => {
      if (finalValue) {
        handleGetCodeName(finalValue);
      }
    }, [finalValue]);

    const debounce = lodash.debounce((value: any) => {
      setPaginationData({
        ...paginationData,
        current: 1,
      });
      setSearchContent(value);
    }, 500);

    const { total, current } = paginationData;

    useImperativeHandle(ref, () => nodeRef?.current);

    const multipleProps = {
      dropdownRender: (menu) => (
        <div onMouseDown={(e) => e.preventDefault()}>
          {menu}
          <div className={styles.btns}>
            <span onClick={() => setField([])} className={styles.clearBtn}>
              {formatMessageApi({ Label_COM_General: 'Clear' })}
            </span>
            <div className={styles.confirmrBtn}>
              <Apply
                handleApply={() => {
                  updateResetList(finalValue);
                  setFocused(false);
                }}
              />
            </div>
          </div>
        </div>
      ),
    };

    let showKeys;
    switch (optionShowType) {
      case ShowOptionType.name:
        showKeys = ['dictName'];
        break;
      case ShowOptionType.value:
        showKeys = ['dictCode'];
        break;
      case ShowOptionType.both:
        showKeys = ['dictCode', 'dictName'];
        break;
      default:
        showKeys = ['dictName'];
        break;
    }

    return (
      <div
        className={isMultiple ? styles.selectMultipleWrap : void 0}
        onMouseDown={(e) => isMultiple && e.preventDefault()}
      >
        <Select
          {...others}
          value={finalValue}
          className={classNames(
            [styles.suffixVisible],
            { [styles.procedureSearch]: searchIcon !== null },
            {
              hightLight: suffixVisible,
            }
          )}
          ref={nodeRef}
          dropdownMatchSelectWidth={false}
          loading={loading}
          // @ts-ignore
          mode={mode}
          showSearch
          allowClear
          open={focused}
          showArrow={showArrow}
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
            <>
              {searchIcon ? searchIcon : null}
              <SuffixIcon
                formName={formName}
                recoverValue={recoverValue}
                OnRecover={OnRecover}
                hightLight={hightLight}
                disabled={disabled}
              />
            </>
          }
          {...(isMultiple ? multipleProps : {})}
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
            isMultiple,
            propsValue: finalValue,
          })}
        </Select>
        {isMultiple && (
          <div className={styles.selectTags}>
            {lodash.map(finalValue || [], (code: any) => {
              const translateObj = dicts.find((item) => item.dictCode === code);
              const optionLabel = translateObj
                ? lodash
                    .chain(showKeys)
                    .map((key) => translateObj && translateObj[key])
                    .filter((value) => value)
                    .join('-')
                    .value()
                : code;
              return (
                <Tag
                  closable={!disabled}
                  key={code}
                  title={optionLabel}
                  onClose={() => setField(finalValue.filter((item) => item !== code))}
                >
                  {optionLabel}
                </Tag>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

export default SelectPlus;
