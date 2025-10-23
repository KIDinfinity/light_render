import findObj from 'bpm/pages/Envoy/_utils/findObj';
import React from 'react';
import { Select } from 'antd';
import lodash from 'lodash';
import EnvoyInput from './EnvoyInput';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import styles from './EnvoyInput.less';

interface IProps {
  idx: number;
  disabled: boolean;
  errorInfo: any;
  data: any;
  id?: string;
  onChangeReceived?: Function;
  memoItem?: any;
  fileKey?: any;
  title: string;
  selectObj: any;
  classId: any;
  required: boolean;
  optionLabelProp?: string | false;
  optionShowType: any;
  saveReasonMemoCode: any;
  displayConfig?: object;
  dropdownMatchSelectWidth?: boolean;
  dropdownStyle?: any;
}

const SelectFormItem = ({
  idx,
  data,
  disabled,
  errorInfo,
  fileKey,
  title = 'MemoCode',
  selectObj,
  classId,
  required = false,
  optionLabelProp = '',
  optionShowType = 'name',
  saveReasonMemoCode,
  displayConfig = {},
  dropdownMatchSelectWidth = true,
  dropdownStyle = {},
}: IProps) => {
  const errorMessage = lodash.get(
    findObj(errorInfo, data?.id),
    `pendingMemoList{${idx}}_${fileKey}`
  );

  const getShowValue = (value: string) => {
    const showValue = displayConfig?.paddingCode?.showValue;
    if (!showValue || !value) {
      return value;
    }

    const item = lodash.find(selectObj?.list, (item: any) => {
      return item?.memoCode === value;
    });
    if (!item) return value;
    if (selectObj?.list) if (showValue === 'value') return item?.[selectObj?.key];
    if (showValue === 'both') return `${item?.[selectObj?.key] || ''}-${item?.[selectObj?.name]}`;
    if (showValue === 'keyAndDesc') return `${item?.[selectObj?.key] || ''}-${item?.memoDesc}`;
    return item?.[selectObj?.name];
  };

  const pendingMemoList = lodash.get(data, 'pendingMemoList', []);

  return (
    <EnvoyInput title={title} className={styles.memoCodeInput}>
      <>
        {errorMessage?.length ? <LabelTip title={errorMessage} /> : null}
        <Select
          className={styles.memoCode}
          name={`pendingMemoList{${idx}}${fileKey}`}
          disabled={disabled}
          value={getShowValue(pendingMemoList[`${idx}`]?.[`${fileKey}`])}
          onChange={(value: string) => {
            const preMemoCode = pendingMemoList[`${idx}`]?.[`${fileKey}`];
            // memoCode没有变化， 但调用了onchange
            if (value !== preMemoCode) {
              saveReasonMemoCode([`pendingMemoList{${idx}}_${fileKey}`], value);
            }
          }}
          allowClear
          showSearch
          required={required}
          filterOption={(input, option) => {
            return (
              String(option.props.title).toLowerCase().indexOf(String(input).toLowerCase()) >= 0
            );
          }}
          id={classId}
          {...(optionLabelProp ? { optionLabelProp } : {})}
          dropdownMatchSelectWidth={dropdownMatchSelectWidth}
          dropdownStyle={dropdownStyle}
        >
          {selectObj &&
            lodash.map(selectObj?.list || [], (item, index) => (
              <Select.Option
                value={item[selectObj.key]}
                title={
                  optionShowType === 'keyAndDesc'
                    ? item[selectObj.key] + '-' + item.memoDesc
                    : item[selectObj.name]
                }
                key={item[selectObj.key]}
              >
                {/* 自定义SelectOption输出 */}
                {(() => {
                  if (optionShowType === 'value') return item[selectObj.key];
                  if (optionShowType === 'both')
                    return `${item[selectObj.key] || ''}-${item[selectObj.name]}`;
                  if (optionShowType === 'keyAndDesc')
                    return `${item[selectObj.key] || ''}-${item.memoDesc}`;
                  return item[selectObj.name];
                })()}
              </Select.Option>
            ))}
        </Select>
      </>
    </EnvoyInput>
  );
};

export default SelectFormItem;
