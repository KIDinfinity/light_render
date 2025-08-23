import React from 'react';
import { Input } from 'antd';
import { FormSection, FormItemAutoComplete } from 'basic/components/Form';

const dataSource = ['1', '111', '222', '2322', '1234'];

export default ({ form }: any) => {
  return (
    <>
      <FormSection title="FormItemAutoComplete" layConf={6} isMargin={false}>
        <FormItemAutoComplete
          allowClear
          dataSource={dataSource}
          onSearch={() => dataSource}
          form={form}
          required
          formName="FormItemAutoComplete"
          labelId="FormItemAutoComplete"
        >
          <Input />
        </FormItemAutoComplete>
      </FormSection>
    </>
  );
};
