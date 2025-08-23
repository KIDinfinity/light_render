import findObj from 'bpm/pages/Envoy/_utils/findObj';
import React, { useCallback } from 'react';
import { Form, Select, Tooltip } from 'antd';
import lodash from 'lodash';

import { useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import useLoadClientInfoListByRole from 'bpm/pages/Envoy/hooks/useLoadClientInfoListByRole';
import styles from './pendingMemo.less';
import RequiredIcon from './RequiredIcon';
import getComponentChildrenWithString from '../../_utils/getComponentChildrenWithString.ts';

interface IProps {
  idx: number;
  disabled: boolean;
  receivedDisable: boolean;
  onDelete: Function;
  errorInfo: any;
  data: any;
  id?: string;
  onChangeReceived: Function;
  memoItem?: any;
  fileKey?: any;
  title: string;
  selectObj: any;
  classId: any;
  required: boolean;
  optionLabelProp?: string;
  optionShowType: any;
}
const SelectFormItemOption = (item, fileKey, selectObj, optionShowType) => {
  const optionContent = (() => {
    if (optionShowType === 'value') return item[selectObj.key];
    if (optionShowType === 'both') return `${item[selectObj.key]}-${item[selectObj.name]}`;
    if (optionShowType === 'keyAndDesc') return `${item[selectObj.key]}-${item.memoDesc}`;
    return item[selectObj.name];
  })();

  return (
    <Select.Option
      value={item[selectObj.key]}
      title={fileKey === 'memoCode' ? '' : item[selectObj.name]}
      key={item[selectObj.key]}
      className={fileKey === 'memoCode' ? styles.memoCodeMultipleLineDisplayOption : ''}
    >
      {fileKey === 'memoCode' ? (
        <Tooltip title={optionContent}>
          <div title="">{optionContent}</div>
        </Tooltip>
      ) : (
        optionContent
      )}
    </Select.Option>
  );
};
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
}: IProps) => {
  const errorMessage = lodash.get(
    findObj(errorInfo, data?.id),
    `pendingMemoList{${idx}}_${fileKey}`
  );
  const dispatch = useDispatch();
  const handleSearchClient = useLoadClientInfoListByRole();
  const saveReasonMemoCode = useCallback(
    async (names: string[], value: any) => {
      dispatch({
        type: 'envoyController/saveReasonMemoCode',
        payload: {
          groupId: data?.groupId,
          dataId: data?.id,
          names,
          value,
        },
      });
      dispatch({
        type: 'envoyController/validateFields',
        payload: {
          dataId: data?.groupId,
        },
      });
      if (/requestedClientRole/.test(names)) {
        const list = await handleSearchClient({
          requestedClientRole: value,
        });
        const requestedClientIdValue =
          lodash.isArray(list) && list.length === 1 ? list[0]?.requestedClientId : '';
        saveReasonMemoCode([`pendingMemoList[${idx}]_requestedClientId`], requestedClientIdValue);
      }
    },
    [data, idx, dispatch]
  );

  const pendingMemoList = lodash.get(data, 'pendingMemoList', []);
  return (
    <Form.Item
      label={
        <div className={styles.label}>
          {errorMessage?.length ? <LabelTip title={errorMessage} /> : null}
          {!!title && formatMessageApi({ Label_Sider_Envoy: title })}
          <RequiredIcon visible={required} />
        </div>
      }
    >
      <Select
        name={`pendingMemoList{${idx}}${fileKey}`}
        disabled={disabled}
        value={pendingMemoList[`${idx}`]?.[`${fileKey}`]}
        onChange={(value: string[]) => {
          saveReasonMemoCode([`pendingMemoList{${idx}}_${fileKey}`], value);
        }}
        allowClear
        showSearch
        required
        filterOption={(input, option) =>
          String(getComponentChildrenWithString(option, 'title'))
            .toLowerCase()
            .indexOf(String(input).toLowerCase()) >= 0
        }
        id={classId}
        {...(optionLabelProp ? { optionLabelProp } : {})}
      >
        {selectObj &&
          lodash.map(selectObj?.list || [], (item) =>
            SelectFormItemOption(item, fileKey, selectObj, optionShowType)
          )}
      </Select>
    </Form.Item>
  );
};

export default SelectFormItem;
