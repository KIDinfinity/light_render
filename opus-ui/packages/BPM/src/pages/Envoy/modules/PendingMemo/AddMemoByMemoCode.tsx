import React from 'react';
import { Form, Select } from 'antd';
import lodash from 'lodash';
import styles from './pendingMemo.less';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';

interface IProps {
  disabled?: boolean;
  addMemo: (arg: string) => void;
  isExpand?: boolean;
  listMemos: any;
}

// memoCode 过滤掉同一个reason下已选择的，除了Free, 且未发送的
const AddMemoByMemoCode = ({ disabled, addMemo, isExpand = false, listMemos }: IProps) => {
  const optionShowType = tenant.region({
    [Region.HK]: 'name',
    [Region.VN]: 'name',
    [Region.TH]: 'keyAndDesc',
    [Region.MY]: 'name',
    [Region.ID]: 'name',
    [Region.KH]: 'name',
    [Region.PH]: 'name',
    notMatch: 'both',
  })

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
              placeholder={isExpand ? '+ Memo Code' : formatMessageApi({ Label_Sider_Envoy: 'MemoCode' })}
              allowClear
              showSearch
              filterOption={(input, option) =>
                String(option.props.children).toLowerCase().indexOf(String(input).toLowerCase()) >=
                0
              }
              id="memoCode"
              dropdownMatchSelectWidth={false}
            >
              {lodash.map(listMemos, (item) => (
                <Select.Option
                  title={`${item?.memoCode} ${item?.memoDesc}`}
                  value={item?.memoCode}
                  key={item?.memoCode}
                >
                  {(() => {
                    if (optionShowType === 'value') return item.memoCode;
                    if (optionShowType === 'both')
                      return `${item.memoCode}-${item.memoName}`;
                    if (optionShowType === 'keyAndDesc')
                      return `${item.memoCode}-${item.memoDesc}`;
                    return item.memoName;
                  })()}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddMemoByMemoCode;
