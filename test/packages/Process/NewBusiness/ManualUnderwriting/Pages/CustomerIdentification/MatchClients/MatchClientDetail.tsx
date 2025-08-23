import React, { useState, useRef, useEffect } from 'react';
import { Table, Spin } from 'antd';
import { useSelector } from 'dva';
import classnames from 'classnames';
import { v5 as uuidv5 } from 'uuid';
import useGetFieldsCustomerTypeConfig from 'basic/hooks/useGetFieldsCustomerTypeConfig';
import { useGetColumnsByConfig, useGetMatchClientDetailData } from '../_hooks';
import { NAMESPACE } from '../activity.config';
import getColumns from './getColumns';
import styles from './index.less';

const MatchClientDetail = ({ item, columnList }: any) => {
  const functionLoading: boolean = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/getPageAtomConfig`]
  );
  const taskNotEditable: boolean = useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable
  );
  const couterRef = useRef();
  const data = useGetMatchClientDetailData({
    item,
  });
  const [tableWidth, setTableWidth] = useState(0);
  const atomConfig = useGetFieldsCustomerTypeConfig({
    atomGroupCode: 'BP_NB_CTG001_BP_NB_ACT002',
  });
  const clientColumnsList = useGetColumnsByConfig({ columnList, item, atomConfig });

  useEffect(() => {
    window.addEventListener('resize', () => {
      setTableWidth(couterRef?.current?.clientWidth);
    });
    setTableWidth(couterRef?.current?.clientWidth);
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <div className={styles.detail} ref={couterRef}>
      {!functionLoading ? (
        <Table
          //  scroll={{ x: 'max-content' }}
          className={classnames({
            [styles.increaseTable]: getColumns(clientColumnsList, tableWidth)?.length > 10,
            [styles.cursor]: taskNotEditable,
          })}
          rowKey={(r: any) => uuidv5(JSON.stringify(r), uuidv5.URL)}
          dataSource={data}
          columns={getColumns(clientColumnsList, tableWidth)}
          pagination={false}
        />
      ) : (
        <div className={styles.emptyBox}>
          <Spin tip="Loading..." size="small" />
        </div>
      )}
    </div>
  );
};

export default MatchClientDetail;
