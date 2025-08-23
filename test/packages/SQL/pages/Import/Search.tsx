import React from 'react';
import { Form, Input } from 'antd';
import styles from './index.less';

const Search = ({ form, submit }: any) => {
  return (
    <div className={styles.search}>
      <Form style={{ display: 'flex' }}>
        {form.getFieldDecorator('name')(
          <Input.Search placeholder="filter" style={{ width: 240 }} onSearch={submit} />
        )}
      </Form>
    </div>
  );
};

export default Search;
