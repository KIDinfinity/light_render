import classNames from 'classnames';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { Col, Row } from 'opus/Components/Antd';
import Avatar from 'packages/Opus/Components/Avatar';
import { NAMESPACE } from 'packages/Opus/Pages/Home/activity.config';
import React, { useMemo } from 'react';
import styles from './TeamPipeline.less';
import { Region, tenant } from '@/components/Tenant';
import { List } from 'opus/Components/Antd';

const Main = ({ config }: any) => {
  const details =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.teamSummary?.details) ||
    [];

  const totals =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.teamSummary?.total) || 0;
  // 获取宽度
  const getWidth = (index: any, allData: any, sum: any) => {
    let currentSum = 0;

    for (let i = 0; i <= index; i++) {
      currentSum += allData[i];
    }

    return (currentSum / sum) * 100;
  };
  const getOffsetLeft = (index: any, allData: any, sum: any, barWidth: any) => {
    return barWidth - (allData[index] / sum) * 50;
  };

  const list = useMemo(() => {
    const maxTotal = Math.max(
      ...lodash.map(details, (item: any) => {
        const {
          todo = 0,
          pending = 0,
          complete = 0,
        } = lodash.reduce(
          lodash.pick(
            item,
            lodash.map(config, (configItem: any) => configItem.code)
          ),
          (result: any, value: any, key: any) => {
            const configKey = lodash.find(config, { code: key })?.key;
            return {
              ...result,
              [configKey]: value,
            };
          },
          {}
        );
        return (todo || 0) + (pending || 0) + (complete || 0);
      })
    );

    return lodash
      .chain(details)
      .map((item: any) => {
        const {
          todo = 0,
          pending = 0,
          complete = 0,
        } = lodash.reduce(
          lodash.pick(
            item,
            lodash.map(config, (configItem: any) => configItem.code)
          ),
          (result: any, value: any, key: any) => {
            const configKey = lodash.find(config, { code: key })?.key;
            return {
              ...result,
              [configKey]: value,
            };
          },
          {}
        );
        const total = (todo || 0) + (pending || 0) + (complete || 0);
        const allData = [todo || 0, pending || 0, complete || 0];
        const todoWidth = getWidth(0, allData, total);
        const pendingWidth = getWidth(1, allData, total);
        const completedWidth = getWidth(2, allData, total);

        return {
          total,
          todoWidth,
          pendingWidth,
          completedWidth,
          todoOffsetLeft: getOffsetLeft(0, allData, total, todoWidth),
          pendingOffsetLeft: getOffsetLeft(1, allData, total, pendingWidth),
          completedOffsetLeft: getOffsetLeft(2, allData, total, completedWidth),
          ...item,
          todo,
          pending,
          complete,
          totalWidth: (total / maxTotal) * 100,
        };
      })

      .value();
  }, [details, config]);

  const isSpecialRegion = [Region.TH, Region.HK].includes(tenant.region());

  return (
    <div className={styles.useTaskWrap}>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={list}
        renderItem={({
          userId,
          userName,
          todo,
          pending,
          complete,
          todoWidth,
          pendingWidth,
          completedWidth,
          todoOffsetLeft,
          pendingOffsetLeft,
          completedOffsetLeft,
          total,
          totalWidth,
        }: any) => (
          <List.Item key={userId}>
            <Row gutter={16} className={styles.item} key={userId}>
              <Col span={2} className={styles.avatarWrap}>
                <Avatar name={userName} />
              </Col>
              <Col span={22} className={styles.progressWrap}>
                <div className={styles.name}>{userName}</div>
                <div className={styles.progressBg}>
                  <div
                    className={styles.progress}
                    style={{
                      width: `${totalWidth}%`,
                    }}
                  >
                    {todo !== 0 && (
                      <>
                        <span
                          className={classNames(
                            styles.progressItem,
                            isSpecialRegion ? styles.todoTH : styles.todo
                          )}
                          style={{ width: `${todoWidth}%` }}
                        />
                        <span
                          className={styles.count}
                          style={{
                            left: `${todoOffsetLeft}%`,
                          }}
                        >
                          {todo}
                        </span>
                      </>
                    )}

                    {pending !== 0 && (
                      <>
                        <span
                          className={classNames(
                            styles.progressItem,
                            isSpecialRegion ? styles.pendingTH : styles.pending
                          )}
                          style={{
                            width: `${pendingWidth}%`,
                          }}
                        />
                        <span
                          className={styles.count}
                          style={{
                            left: `${pendingOffsetLeft}%`,
                          }}
                        >
                          {pending}
                        </span>
                      </>
                    )}

                    {complete !== 0 && (
                      <>
                        <span
                          className={classNames(
                            styles.progressItem,
                            isSpecialRegion ? styles.completedTH : styles.completed
                          )}
                          style={{
                            width: `${completedWidth}%`,
                          }}
                        />
                        <span
                          className={styles.count}
                          style={{
                            left: `${completedOffsetLeft}%`,
                          }}
                        >
                          {complete}
                        </span>
                      </>
                    )}

                    {todo == 0 && pending == 0 && complete == 0 && (
                      <span className={classNames(styles.progressItem, styles.empty)} />
                    )}
                  </div>

                  <span className={classNames(styles.total)}>{total}</span>
                </div>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Main;
