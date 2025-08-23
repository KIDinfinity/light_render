import React, { useState } from 'react';
import styles from './index.less';
import { Icon, Card, Button } from 'antd';
import { ReactComponent as RetryIcon } from '@/assets/Retry.svg';
import { ReactComponent as connectionIcon } from '@/assets/connection.svg';
import { ReactComponent as disconnectedIcon } from '@/assets/disconnected.svg';
import moment from 'moment';
import { one } from '@/services/navigatorSystemIntergrationControllerService';
const { Meta } = Card;

export default function SystemIntegrationItem({ item, index, getOneHealthCheck }: any) {
  const [searchLoading, setSearchLoading] = useState(false);
  const handleChange = async () => {
    setSearchLoading(true);
    const params = {
      healthCheckConfig: {
        category: item?.category,
        deleted: item?.deleted,
        integrationCode: item?.integrationCode,
        interfaceCode: item?.interfaceCode,
        intervalTime: item?.intervalTime,
        regionCode: item?.regionCode,
      },
    };
    await one(params);
    await getOneHealthCheck(item, index);
    setSearchLoading(false);
  };
  const format = (val: any) => moment(val).format('YYYY/MM/DD hh:mm:ss');
  return (
    <div className={styles.integrationItem}>
      <Card bordered={false} style={{ background: item?.status === 'S' ? '' : '#f26657' }}>
        <div className={styles.top}>
          <Button loading={searchLoading} onClick={handleChange}>
            {!searchLoading && <Icon component={RetryIcon} className={styles.icon} />}
          </Button>
        </div>
        <Meta
          avatar={
            <div style={{ background: item?.status === 'S' ? '#00c853' : '#ffffff' }}>
              <Icon
                component={item?.status === 'S' ? connectionIcon : disconnectedIcon}
                className={styles.itemIcon}
              />
            </div>
          }
          title={item?.systemCode}
          className={styles.ellipsis}
          description={item?.status === 'S' ? 'Normal connection' : 'Disconnected'}
        />
        <div className={styles.content}>
          <div
            className={styles.lastTry}
            style={item?.status === 'S' ? { marginRight: '2em' } : void 0}
          >
            {item?.status === 'S'
              ? 'Last try ' + format(item?.requestTime)
              : '! Last try ' + format(item?.requestTime)}
          </div>
          <div
            className={styles.lastTry}
            style={item?.status === 'S' ? { marginRight: '2em' } : void 0}
          >
            {item?.status === 'S'
              ? 'Next try ' + format(item?.nextTime) + '  '
              : '! Next try ' + format(item?.nextTime)}
          </div>
        </div>
      </Card>
    </div>
  );
}
