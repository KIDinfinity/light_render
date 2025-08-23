import React from 'react';
import { HealthCheckModuleName } from '../config';
import FollowUp from './FollowUp';
import SysConnect from './SysConnect';
import { upperCase } from 'lodash';
import classnames from 'classnames';
import FollowModal from './FollowModal';
import { FormateEP } from '@/utils/accuracy/Tools';
import styles from '../index.less';
import 'antd/dist/antd.css';

const HealthCheck = ({ chartDatas }: any) => {
  const modalRef = React.useRef(null);
  const followUpDatas = chartDatas?.filter((item: any) => !!item?.chartDatas) || [];
  const sysConnectDatas = chartDatas?.find(
    (item: any) => item?.category === HealthCheckModuleName.SysConnect
  );
  const integrationExecutionTimeDatas = chartDatas?.find(
    (item: any) => item?.category === HealthCheckModuleName.IntegrationExecutionTime
  );

  return (
    <div className={styles.healthCheckContainer}>
      <div className={classnames(styles.overall, 'animate-overall')}>
        <div className={styles.title}>SYSTEM HEALTH CHECK</div>
        <div className={styles.overallContent}>
          {Object.values(HealthCheckModuleName).map((module: string) => {
            const target = chartDatas?.find((item: any) => item?.category === module);
            return (
              <div className={styles.overallItem} key={module} data-module={module}>
                <div className={styles.overallIcon} />
                <div className={styles.overallDesc}>
                  <div className={styles.module}>{upperCase(module)}</div>
                  <div className={styles.count}>
                    {!!target?.total || target?.total === 0
                      ? FormateEP?.getThousandsFormat({
                          value: target?.total || 0,
                          precision: 2,
                        })
                      : '--'}
                  </div>
                  <div className={styles.status} data-status={target?.status}>
                    {target?.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.healthContent}>
        {followUpDatas?.length > 0 && (
          <FollowUp followUpDatas={followUpDatas} modalRef={modalRef} />
        )}
        <SysConnect
          sysConnectDatas={sysConnectDatas}
          integrationExecutionTimeDatas={integrationExecutionTimeDatas}
        />
      </div>
      <FollowModal ref={modalRef} />
    </div>
  );
};
export default HealthCheck;
