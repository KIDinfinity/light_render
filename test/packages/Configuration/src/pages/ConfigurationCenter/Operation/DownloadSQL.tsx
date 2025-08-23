import React from 'react';
import lodash from 'lodash';
import { Button } from 'antd';
import type { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'dva';
import type { FunctionDataProps } from '../Utils/Typings';

interface ComponentProps {
  functionData: FunctionDataProps;
  rows: any;
}
function DownloadSQL(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const {
    functionData: { operationList },
    rows,
  } = props;
  const loading = useSelector(
    (state: any) => state.loading.effects['configurationCenter/downloadSQL']
  );
  const handleDownloadSQL = async () => {
    await dispatch({
      type: 'configurationCenter/downloadSQL',
      payload: {},
    });
  };

  return (
    <>
      {lodash.includes(operationList, 'downloadsql') ? (
        <Button
          loading={loading}
          type="primary"
          onClick={handleDownloadSQL}
          disabled={rows.length !== 1}
        >
          DownloadSQL
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
export default DownloadSQL;
