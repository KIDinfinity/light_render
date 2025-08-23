import React from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { Table, Button } from 'antd';
import { Print } from 'navigator/pages/ReportCenter/_utils/utils';
import classNames from 'classnames';
import { NAMESPACE } from './activity.config';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();
  const activeId =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.activeId) || '';
  const datas = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.datas) || [];
  const loading = useSelector(
    (state: any) => state.loading.effects[`${NAMESPACE}/getExportReport`]
  );

  const activeDatas =
    lodash
      .chain(datas)
      .find((el: any) => el.id === activeId)
      .value() || [];

  const printUtils = new Print();

  return (
    <div className={styles.Content}>
      <div className={styles.buttonWrapper}>
        <Button
          type="primary"
          loading={loading}
          onClick={() => {
            dispatch({
              type: `${NAMESPACE}/getExportReport`,
              payload: {
                reportData: activeDatas?.reportData || {},
              },
            });
          }}
        >
          EXPORT
        </Button>
      </div>
      <div className={styles.tableWrap}>
        {lodash.map(activeDatas.list, (item: any) => (
          <>
            {!lodash.isEmpty(item.childrenList) ? (
              <div
                className={classNames(
                  styles.item,
                  item.key === 'reportBasicInformation' && styles.basic
                )}
                key={item.key}
              >
                <p className={styles.title}>{item.title}</p>
                {item.subTitle && <p className={styles.subTitle}>{item.subTitle}</p>}

                <Table
                  dataSource={item.childrenList}
                  className={styles.table}
                  rowKey={item.id}
                  columns={item.headers}
                  pagination={false}
                  bordered
                />
              </div>
            ) : null}
          </>
        ))}
      </div>
    </div>
  );
};
