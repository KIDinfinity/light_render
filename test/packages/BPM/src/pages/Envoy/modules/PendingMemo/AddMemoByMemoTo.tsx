import React from 'react';
import { Form, Select, Icon } from 'antd';
import lodash from 'lodash';

import styles from './pendingMemo.less';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getDrowDownList } from '@/utils/dictFormatMessage';

interface IProps {
  disabled?: boolean;
  addMemo: (arg: string) => void;
  isExpand?: boolean;
}

// memoCode 过滤掉同一个reason下已选择的，除了Free, 且未发送的
const AddMemoByMemoTo = ({ disabled, addMemo, isExpand = false }: IProps) => {
  const Dropdown_Evy_CustomerRole_FurtherReq = getDrowDownList(
    'Dropdown_Evy_CustomerRole_FurtherReq'
  );
  const selectObj = {
    list: Dropdown_Evy_CustomerRole_FurtherReq,
    key: 'dictCode',
    name: 'dictName',
  };
  return (
    <div
      key={'Add_memo'}
      id={`add_memo`}
      className={classnames({
        [styles.clientSection]: true,
        [styles.notExpandClientSection]: !isExpand,
        [styles.memoToHeader]: isExpand,
        [styles.addMemoToBg]: isExpand,
      })}
    >
      <Form>
        <div className={styles.expandMemoRow} style={{ alignItems: 'center' }}>
          {isExpand && <Icon type="user-add" style={{ fontSize: 20 }} />}
          <Form.Item label={!isExpand && formatMessageApi({ Label_Sider_Envoy: 'Memo To' })}>
            <Select
              name={`AddField`}
              disabled={disabled}
              value={void 0}
              onChange={addMemo}
              placeholder={isExpand && 'Memo To'}
              allowClear
              showSearch
              filterOption={(input, option) => {
                return (
                  String(option.props.title).toLowerCase().indexOf(String(input).toLowerCase()) >= 0
                );
              }}
              id={'memoTo'}
            >
              {lodash.map(selectObj?.list || [], (item) => (
                <Select.Option
                  value={item[selectObj.key]}
                  title={item[selectObj.name]}
                  key={item[selectObj.key]}
                >
                  {item[selectObj.name]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddMemoByMemoTo;
