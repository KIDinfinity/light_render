import React, { useState } from 'react';
import useGetCurrentProcessMemoDropdown from 'bpm/pages/Envoy/hooks/useGetCurrentProcessMemoDropdown';
import { Select, Form } from 'antd';
import lodash from 'lodash';
import EnvoyInput from '../EnvoyInput';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import useHandleChangePreselectMemoChangeCallback from 'bpm/pages/Envoy/hooks/useHandleChangePreselectMemoChangeCallback';
import { FormItemTextArea } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';

const PreSelectMemo = ({ reasonGroupId, form, groupIdx }: any) => {
  const dicts = useGetCurrentProcessMemoDropdown();

  const [memoDesc, setDesc] = useState('');
  const handleChange = useHandleChangePreselectMemoChangeCallback({
    reasonGroupId,
    groupIdx,
  });

  return (
    <div className={styles.pendingMemoWrapper}>
      <EnvoyInput title={formatMessageApi({ Label_Sider_Envoy: 'pendingCode' })}>
        <Select
          onChange={handleChange}
          showSearch
          dropdownMatchSelectWidth={false}
          dropdownStyle={{
            maxWidth: '35vw',
          }}
          optionLabelProp={'value'}
          filterOption={(input, option) => {
            return (
              String(option.props.title).toLowerCase().indexOf(String(input).toLowerCase()) >= 0
            );
          }}
        >
          {lodash.map(dicts, (item: any) => {
            return (
              <Select.Option key={item.memoCode} value={item?.memoCode} title={item.memoName}>
                {item.memoName}
              </Select.Option>
            );
          })}
        </Select>
      </EnvoyInput>
      <div>
        <EnvoyInput title={formatMessageApi({ Label_Sider_Envoy: 'pendingDesc' })}>
          <FormItemTextArea
            className={styles.textarea}
            form={form}
            placeholder={formatMessageApi({
              Label_Sider_Envoy: 'MemoDetailPromptText',
            })}
            formName={`pendingMemoList{${0}}_memoDesc`}
            maxLength={468}
            disabled={false}
            row={1}
            autoSize={true}
            onChange={(value: string) => {
              setDesc(value);
            }}
          />
        </EnvoyInput>
        <EnvoyInput
          title={formatMessageApi({
            Label_Sider_Envoy: tenant.isTH() ? 'memoReason' : 'pendingDesc',
          })}
          className={styles.subTypeCode}
        >
          <Select />
        </EnvoyInput>
      </div>
    </div>
  );
};

export default Form.create()(PreSelectMemo);
