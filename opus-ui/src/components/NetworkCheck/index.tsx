import React, { useEffect, useRef, useState } from 'react';
import styles from './index.less';
import { Icon } from 'antd';
import { testAPI } from '@/services/navigatorNbClientService';
import lodash from 'lodash';

export default () => {
  const [networkStatus, setNetworkStatus] = useState({ ping: '', shake: '' });
  const [loading, setLoading] = useState(false);
  const pingList = useRef<number[]>([]);
  const poRef = useRef<PerformanceObserver | null>(null);

  const updateNetworkStatus = (values: number[]) => {
    setLoading(false);
    const pingsValue = values.filter((n) => n > 0);
    if (pingsValue.length < 3) {
      setNetworkStatus({ shake: 'N/A', ping: 'N/A' });
      return;
    }
    const max = Math.max(...pingsValue);
    const min = Math.min(...pingsValue);
    const shake = (max - min).toFixed(0);
    const sum = lodash.sum(pingsValue);
    const ping = (sum / pingsValue.length).toFixed(0);
    setNetworkStatus({ shake, ping });
  };

  useEffect(() => {
    poRef.current = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (entry.name.includes('api/navigator/test/testAPI')) {
          const delta = entry.requestStart > 0 ? entry.responseEnd - entry.requestStart : 0;
          pingList.current = [...pingList.current, delta];
          if (pingList.current.length === 5) {
            updateNetworkStatus(pingList.current);
          }
        }
      });
    });
    poRef.current.observe({ type: 'resource', buffered: false });
    return () => {
      poRef.current = null;
    };
  }, []);

  const checkNetwork = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    pingList.current = [];
    let count = 5;
    const timer = setInterval(() => {
      if (!count) {
        clearInterval(timer);
        return;
      }
      count--;
      testAPI();
    }, 1000);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.wifi} onClick={checkNetwork}>
        <Icon type="wifi" />
      </div>
      <div className={styles.msg}>
        {loading && <Icon type="loading" />}
        {!loading && networkStatus.ping && (
          <div>
            ping: {networkStatus.ping}ms shake: {networkStatus.shake}ms
          </div>
        )}
      </div>
    </div>
  );
};
