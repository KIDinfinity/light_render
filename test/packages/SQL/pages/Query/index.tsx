import React, { useState, useEffect } from 'react';
import { Form } from 'antd';

import { useDispatch, useSelector } from 'dva';
import Header from './Header';
import Content from './Content';
import Result from './Result';
import styles from './index.less';
import { LS, LSKey } from '@/utils/cache';
import { isEmpty } from 'lodash';
const Query = ({ form }: any) => {
  const [showSQL, setShowSQL] = useState(true);
  const dispatch = useDispatch();
  const execList = useSelector(({ sqlController }: any) => sqlController?.execList);
  const hasPermission = useSelector(({ user }: any) => user?.currentUser?.autoRefreshSession);
  const init = function () {
    if (hasPermission === 'Y') {
      const sqlData = LS.getItem(LSKey.VENUS_UI_SQLQUERYPARAMS);
      if (!isEmpty(sqlData)) {
        const sql = sqlData[0]?.sql || '';
        dispatch({
          type: 'sqlController/saveSQL',
          payload: {
            sql: sql,
          },
        });
      }
    }
  };

  useEffect(() => {
    init();
  }, []);
  const showSQLfn = () => {
    setShowSQL((e) => !e);
  };

  useEffect(() => {
    if (execList?.length) {
      setShowSQL(false);
    }
  }, [execList]);
  return (
    <div className={styles.query}>
      <Header form={form} />
      <Content showSQL={showSQL} showSQLfn={showSQLfn} />
      <Result showSQL={showSQL} />
    </div>
  );
};

export default Form.create()(Query);
