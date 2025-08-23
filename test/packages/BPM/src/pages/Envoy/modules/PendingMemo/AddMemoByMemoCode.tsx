import React from 'react';
import { Form, Select, Tooltip } from 'antd';
import lodash from 'lodash';

import styles from './pendingMemo.less';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';

import useGetFilterMemoCodeList from 'bpm/pages/Envoy/_utils/getFilterMemoCodeList';
import getComponentChildrenWithString from '../../_utils/getComponentChildrenWithString.ts';

interface IProps {
  disabled?: boolean;
  addMemo: (arg: string) => void;
  isExpand?: boolean;
  listMemos: any;
  pendingMemoList: any;
}
const SelectFormItemOption = (item, optionShowType) => {
  const optionContent = (() => {
    if (optionShowType === 'value') return item.memoCode;
    if (optionShowType === 'both') return `${item.memoCode}-${item.memoName}`;
    if (optionShowType === 'keyAndDesc') return `${item.memoCode}-${item.memoDesc}`;
    return item.memoName;
  })();
  return (
    <Select.Option
      value={item?.memoCode}
      key={item?.memoCode}
      className={styles.memoCodeMultipleLineDisplayOption}
    >
      <Tooltip title={optionContent}>
        <div title="">{optionContent}</div>
      </Tooltip>
    </Select.Option>
  );
};
// memoCode 过滤掉同一个reason下已选择的，除了Free, 且未发送的
const AddMemoByMemoCode = ({
  disabled,
  addMemo,
  isExpand = false,
  listMemos,
  pendingMemoList,
}: IProps) => {
  const optionShowType = tenant.region({
    [Region.HK]: 'name',
    [Region.VN]: 'name',
    [Region.TH]: 'keyAndDesc',
    [Region.MY]: 'name',
    [Region.ID]: 'name',
    [Region.KH]: 'name',
    [Region.PH]: 'name',
    notMatch: 'both',
  });

  const filterMemoCodeList = useGetFilterMemoCodeList({
    pendingMemoList,
    thisItem: {},
    listMemos,
  });

  return (
    <div
      key={'Add_memo'}
      id={`add_memo`}
      className={classnames({
        [styles.clientSection]: !isExpand,
        [styles.notExpandClientSectionMemoCode]: !isExpand,
        [styles.memoToHeader]: isExpand,
      })}
    >
      {isExpand && <div className={styles.sectionLeftIndicator} />}
      <Form>
        <div className={styles.expandMemoRow}>
          <Form.Item
            label={
              !isExpand && (
                <div className={styles.label}>
                  {formatMessageApi({ Label_Sider_Envoy: 'MemoCode' })}
                </div>
              )
            }
          >
            <Select
              name={`memoCodeAdd`}
              disabled={disabled}
              value={void 0}
              onChange={addMemo}
              placeholder={
                isExpand ? '+ Memo Code' : formatMessageApi({ Label_Sider_Envoy: 'MemoCode' })
              }
              allowClear
              showSearch
              filterOption={(input, option) =>
                String(getComponentChildrenWithString(option, 'children'))
                  .toLowerCase()
                  .indexOf(String(input).toLowerCase()) >= 0
              }
              id="memoCode"
              dropdownMatchSelectWidth={false}
            >
              {lodash.map(filterMemoCodeList, (item) => SelectFormItemOption(item, optionShowType))}
            </Select>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddMemoByMemoCode;
