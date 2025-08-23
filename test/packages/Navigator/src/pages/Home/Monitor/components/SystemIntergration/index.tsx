import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Icon } from 'antd';
import styles from './index.less';
import lodash from 'lodash';
import SystemIntegrationItem from './SystemIntegrationItem';
import { Commonbox } from '../index';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import {
  findAllHealthCheck,
  findHealthCheckOne,
} from '@/services/navigatorSystemIntergrationControllerService';
import { ReactComponent as RetryIcon } from '@/assets/Retry.svg';
import { all } from '@/services/navigatorSystemIntergrationControllerService';

function SystemIntegration({ isExpand, setExpand }) {
  const [list, setList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const getAllHealthCheck = async () => {
    const response = await findAllHealthCheck();
    if (response && response.success) {
      // const parseData = safeParseUtil(response.responseData.resultData)?.resultData?.rows || {};
      const parseData = response?.resultData || {};
      setList(parseData);
    }
  };
  const getOneHealthCheck = async (item: any, index: any) => {
    const checkOneParams = {
      healthCheckConfig: {
        integrationCode: item?.integrationCode,
        interfaceCode: item?.interfaceCode,
        regionCode: item?.regionCode,
      },
    };
    const response = await findHealthCheckOne(checkOneParams);
    if (response && response.success) {
      const parseData = response?.resultData || {};
      const newList: any = list;
      newList[index] = parseData;
      setList([...newList]);
    }
  };
  useEffect(() => {
    getAllHealthCheck();
  }, []);
  const handleChange = async () => {
    setSearchLoading(true);
    await all();
    await getAllHealthCheck();
    setSearchLoading(false);
  };
  const slicedList = isExpand? list : list.slice(0, 6)
  return (
    <Commonbox
      title={formatMessageApi({ Label_COM_MonitorCenter: 'SystemConnectStatus' })}
      click={() => setExpand(!isExpand)}
    >
      <div className={styles.header}>
        <Button onClick={handleChange} loading={searchLoading}>
          {!searchLoading && <Icon component={RetryIcon} style={{ width: '15px' }} />}
          <span>{formatMessageApi({ Label_COM_MonitorCenter: 'RetryAll' })}</span>
        </Button>
      </div>
      <div style={{ height: 50 }} />
      <Row className={styles.systemIntegrationItem} gutter={[20, 20]}>
        {lodash.map(slicedList, (item, index) => {
          return (
            <Col span={8} key={item.id}>
              <SystemIntegrationItem
                item={item}
                index={index}
                getOneHealthCheck={getOneHealthCheck}
              />
            </Col>
          );
        })}
      </Row>
    </Commonbox>
  );
}
export default Form.create()(SystemIntegration);
