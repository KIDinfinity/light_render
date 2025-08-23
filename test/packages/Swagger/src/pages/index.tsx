import React, { useState } from 'react';
import { Row, Col, Input, Select } from 'antd';
import ReactJson from 'react-json-view';
import { serialize as objectToFormData } from 'object-to-formdata';
import lodash from 'lodash';

import { handleMessageModal } from '@/utils/commonMessage';
import { safeParseUtil } from '@/utils/utils';
import request from '@/utils/request';
import Filter from 'navigator/pages/Home/Watching/View/Filter';
import styles from './index.less';

import { tenant } from '@/components/Tenant';
import { LS, LSKey } from '@/utils/cache';

const { Search, TextArea } = Input;
const { Option } = Select;

const method = {
  J: 'POST',
  F: 'POST',
  G: 'GET',
};

export default () => {
  const [params, setParams] = useState('');
  const [response, setResponse] = useState({});
  const [paramsType, setParamsType] = useState('J');

  const onSelect = (value: string) => {
    setParamsType(value);
  };

  const selectBefore = (
    <Select defaultValue="J" onSelect={onSelect}>
      <Option value="J">POST:Json</Option>
      <Option value="F">POST:FormData</Option>
      <Option value="G">GET:Json</Option>
    </Select>
  );

  const getUrl = (url: string) => {
    if (!url) {
      handleMessageModal([{ content: 'url require', code: '' }]);
      return '';
    }
    if (paramsType === 'G') {
      const temp = safeParseUtil(params);
      const tempParams = lodash.reduce(
        temp,
        (result, value, key) => {
          return `${result}${result ? '&' : ''}${key}=${value}`;
        },
        ''
      );
      return `${url}${tempParams ? '?' : ''}${tempParams}`;
    }
    return url;
  };

  const getParams = () => {
    const body = safeParseUtil(params);
    const map = {
      J: () => (params ? body : params),
      F: () => objectToFormData(body),
      G: () => (params ? body : params),
    };

    const tempParams: any = {
      method: method?.[paramsType],
    };

    if (paramsType !== 'G') {
      tempParams.body = map?.[paramsType]();
    }

    return tempParams;
  };

  const onSearch = async (value: string) => {
    const currentUser = LS.getItem(LSKey.CURRENTUSER);
    const userId = lodash.get(currentUser, 'userId', '');
    const url = getUrl(value);

    const paramsBody = getParams();

    if (!url || !paramsBody) {
      return;
    }
    const result = await request(url, {
      headers: {
        'x-region': tenant.region(),
        'x-tenant': lodash.lowerCase(tenant.region()),
        'x-user-id': userId,
      },
      ...paramsBody,
    });
    if (!result?.success) {
      handleMessageModal(result?.promptMessages);
      return;
    }
    setResponse(result);
  };

  const onChange = ({ target: { value } }: any) => {
    setParams(value);
  };

  return (
    <div className={styles.swagger}>
      <Filter />
      <div className={styles.content}>
        <Row>
          <Col span={12} className={styles.item}>
            <Search
              placeholder="/api/navigator/docInfo/checkBeforeSubmit"
              allowClear
              enterButton="Search"
              onSearch={onSearch}
              addonBefore={selectBefore}
            />
            <TextArea
              placeholder={'{"activityCode": "string","caseCategory": "string","caseNo": "string"}'}
              className={styles.params}
              value={params}
              onChange={onChange}
              allowClear
              autoSize={{ minRows: 34 }}
            />
          </Col>
          <Col span={12} className={styles.item}>
            <ReactJson src={response} theme="google" />
          </Col>
        </Row>
      </div>
    </div>
  );
};
