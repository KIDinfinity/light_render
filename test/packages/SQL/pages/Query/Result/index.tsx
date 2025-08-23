import React from 'react';
import { Tabs, Spin, Tooltip } from 'antd';
import { useSelector } from 'dva';
import classnames from 'classnames';
import TableResult from './Table';
import Info from './Info';
import styles from './index.less';

const { TabPane } = Tabs;

const Result = ({ showSQL }) => {
  const execList = useSelector(({ sqlController }: any) => sqlController?.execList);
  const execLoading = useSelector(
    ({ loading }: any) => loading.effects['sqlController/statementExec']
  );

  return (
    <div
      className={classnames(styles.result, {
        [styles.showResult]: showSQL,
        [styles.showResultMore]: !showSQL,
      })}
    >
      {!execLoading ? (
        <>
          {!!execList?.length && (
            <Tabs type="card">
              {execList
                ?.filter((el: any) => el?.success && !!el?.resultSet?.length)
                ?.map((item: any, idx: number) => (
                  <TabPane
                    tab={
                      <Tooltip title={item?.sql}>
                        <span>{`Result ${idx + 1}`}</span>
                      </Tooltip>
                    }
                    key={`result_${idx + 1}`}
                  >
                    <TableResult item={item} index={idx} showSQL={showSQL} />
                  </TabPane>
                ))}
              <TabPane tab="Info" key="info">
                <Info execList={execList} />
              </TabPane>
            </Tabs>
          )}
        </>
      ) : (
        <Spin className={styles.spin} />
      )}
    </div>
  );
};

export default Result;
