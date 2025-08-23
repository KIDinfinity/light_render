import React from 'react';
import lodash from 'lodash';
import { Button } from 'antd';
import type { Dispatch } from 'redux';
import { useDispatch } from 'dva';
import styles from './index.less';

interface ComponentProps {
  functionData: FunctionDataProps;
  rows: any;
}
function UploadSQL(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const {
    functionData: { operationList },
    rows,
  } = props;
  const handleUploadSQL = () => {
    dispatch({
      type: 'configurationCenter/showSQLModal',
      payload: {
        SQLDatasourceName: rows[0].bs_datasource_name,
      },
    });
  };

  return (
    <>
      {lodash.includes(operationList, 'uploadsql') ? (
        <Button disabled={rows.length !== 1} className={styles.btnBlue} onClick={handleUploadSQL}>
          UploadSQL
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
export default UploadSQL;
