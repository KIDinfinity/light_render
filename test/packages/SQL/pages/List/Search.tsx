import React from 'react';
import { Form, Input, Select } from 'antd';
import styles from './index.less';

const Search = ({ form, submit }: any) => {
  return (
    <div className={styles.search}>
      <Form style={{ display: 'flex' }}>
        {form.getFieldDecorator('name')(
          <Input.Search placeholder="filter name" style={{ width: 240 }} onSearch={submit} />
        )}
        {form.getFieldDecorator('execStatus')(
          <Select style={{ width: 120, marginLeft: 16 }} onChange={submit} placeholder="execStatus">
            <Select.Option value="">ALL</Select.Option>
            <Select.Option value="SUCCESS">SUCCESS</Select.Option>
            <Select.Option value="FAIL">FAIL</Select.Option>
          </Select>
        )}
      </Form>
    </div>
  );
};

export default Search;
