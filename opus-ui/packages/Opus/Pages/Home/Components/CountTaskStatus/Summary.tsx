import { formatMessageApi } from '@/utils/dictFormatMessage';
import classNames from 'classnames';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { Icon, Progress } from 'opus/Components/Antd';
import { NAMESPACE } from 'opus/Pages/Home/activity.config';
import { tenant, Region } from '@/components/Tenant';
import { ReactComponent as addAccount } from 'packages/Opus/Assets/icon-addAccount.svg';
import { ReactComponent as document } from 'packages/Opus/Assets/icon-document.svg';
import { ReactComponent as pendingDocument } from 'packages/Opus/Assets/icon-pending-document.svg';
import { ReactComponent as tickCircle } from 'packages/Opus/Assets/icon-tick-circle.svg';
import { ReactComponent as tick } from 'packages/Opus/Assets/icon-tick.svg';
import React, { useMemo } from 'react';
import styles from './Summary.less';

const defaultConfig = [
  {
    count: 0,
    name: formatMessageApi({
      Dropdown_COM_TaskStatus: 'todo',
    }),
    status: 'todo',
    pieColor: tenant.region() === Region.TH ? '#F9A061' : '#F68635',
    icon: document,
    order: 1,
  },
  {
    count: 0,
    name: formatMessageApi({
      Dropdown_COM_TaskStatus: 'unassigned',
    }),
    status: 'unassign',
    pieColor: '#FEE8A0',
    icon: addAccount,
    order: 2,
  },
  {
    count: 0,
    name: formatMessageApi({
      Dropdown_COM_TaskStatus: 'pending',
    }),
    status: 'pending',
    pieColor: [Region.TH, Region.HK].includes(tenant.region()) ? '#0097A9' : '#FEE8A0',
    icon: pendingDocument,
    order: 3,
  },
  {
    count: 0,
    name: formatMessageApi({
      Dropdown_COM_TaskStatus: 'complete',
    }),
    status: 'complete',
    pieColor: '#6ECEB2',
    icon: tick,
    order: 4,
  },
];

const defaultSubConfig = [
  {
    key: 'JP_CLM_ACT001',
    pieColor: '#F3BB90',
    icon: document,
  },
  {
    key: 'JP_CLM_ACT003',
    pieColor: '#F3BB90',
    icon: document,
  },
  {
    key: 'JP_CLM_ACT004',
    pieColor: '#F3BB90',
    icon: tickCircle,
  },
  {
    key: 'JP_CLM_ACT005',
    pieColor: '#F3BB90',
    icon: document,
  },
];

const Main = ({ className, config, data, isMyTask }: any) => {
  const { activitySummary, total } = data;
  const slaPercentage =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.slaPercentage) || '-%';
  const resources =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.resources) || [];

  const list = useMemo(() => {
    return lodash
      .chain(config)
      .filter((item) => !item.region || lodash.includes(item.region, tenant.region()))
      .map((item: any) => {
        const temp = lodash.find(defaultConfig, { status: item.status }) || {};
        if (lodash.isEmpty(temp)) return null;
        return {
          ...temp,
          ...item,
          count: data?.[item.status] || 0,
        };
      })
      .compact()
      .sortBy('order')
      .value();
  }, [config, data]);

  const subList = useMemo(() => {
    return lodash
      .chain(activitySummary)
      .map((item: any) => {
        const temp = lodash.find(defaultSubConfig, ({ key }: any) => item.key === key) || {};
        return {
          ...temp,
          ...item,
        };
      })
      .compact()
      .value();
  }, [activitySummary]);
  const subListTotal = useMemo(() => {
    let sum = 0;

    subList.forEach((item) => {
      sum += item.value;
    });

    return sum;
  }, [subList]);

  return (
    <>
      {tenant.region() === Region.TH && (
        <div className={classNames(styles.thWrap, className)}>
          <div className={styles.status}>
            <div className={classNames(styles.item, styles.totalWrap)}>
              <p className={styles.totalTitle}>
                {formatMessageApi({ Label_COM_Opus: 'OverviewTotal' })}
              </p>
              <p className={styles.totalNum}>{total || '-'}</p>
            </div>
            {lodash.map(list, ({ count, name, status, icon, pieColor }: any) => (
              <>
                <div key={status} className={styles.item}>
                  <Progress
                    type="dashboard"
                    percent={(count / total) * 100}
                    strokeColor={pieColor}
                    strokeWidth={7}
                    format={() => {
                      return (
                        <div className={styles.despWrap}>
                          <Icon component={icon} className={styles.icon} />
                          <span>{count}</span>
                        </div>
                      );
                    }}
                  />
                  <p className={styles.name}>{name}</p>
                </div>
              </>
            ))}
          </div>
        </div>
      )}

      {tenant.region() !== Region.TH && (
        <div className={classNames(styles.defaultWrap, className)}>
          <div className={styles.status}>
            {tenant.region() === Region.TH && (
              <div className={classNames(styles.item, styles.totalWrap)}>
                <p className={styles.totalTitle}>
                  {formatMessageApi({ Label_COM_Opus: 'OverviewTotal' })}
                </p>
                <p className={styles.totalNum}>{total || '-'}</p>
              </div>
            )}
            {lodash.map(list, ({ count, name, status, icon, pieColor }: any) => (
              <>
                <div key={status} className={styles.item}>
                  <Progress
                    type="dashboard"
                    percent={(count / total) * 100}
                    strokeColor={pieColor}
                    strokeWidth={7}
                    format={() => {
                      return (
                        <div className={styles.despWrap}>
                          <Icon component={icon} className={styles.icon} />
                          <span>{count}</span>
                        </div>
                      );
                    }}
                  />
                  <p className={styles.name}>{name}</p>
                </div>
                {status === 'todo' && tenant.region() !== Region.HK && (
                  <>
                    {lodash.map(subList, ({ value, key, name, icon, pieColor }: any) => (
                      <div key={key} className={classNames(styles.item, styles.subItem)}>
                        <Progress
                          type="dashboard"
                          percent={(value / subListTotal) * 100}
                          strokeColor="#F3BB90"
                          strokeWidth={8}
                          format={() => {
                            return (
                              <div className={styles.despWrap}>
                                <Icon component={icon} className={styles.icon} />
                                <span>{value}</span>
                              </div>
                            );
                          }}
                        />
                        <p className={styles.name}>{name}</p>
                      </div>
                    ))}
                  </>
                )}
              </>
            ))}
          </div>
          {tenant.region() !== Region.HK && (
            <div className={styles.statistic}>
              <div className={styles.circles}>
                <div className={styles.sla}>
                  <div className={styles.title}>SLA</div>
                  <div className={styles.info}>{slaPercentage}</div>
                </div>
                {!isMyTask && (
                  <div className={styles.resource}>
                    <div className={styles.title}>
                      {formatMessageApi({ Label_COM_Opus: 'Resource' })}
                    </div>
                    <div className={styles.info}>{`${resources[0] || 0}/${resources[1] || 0}`}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Main;
