import React from 'react';
import { Button } from 'antd';
import lodash from 'lodash';
import { useDispatch, useSelector} from 'dva';
import type { Dispatch } from 'redux';

function DownloadData({ functionData }: any) {
  const { operationList } = functionData;
  const dispatch: Dispatch = useDispatch();
  const loading=useSelector((state: any)=>state.loading.effects['configurationCenter/downloadForConfigTable'])
  const handleDownloadData = () => {
    dispatch({
      type: 'configurationCenter/downloadForConfigTable',
    });
  };
  return (
    <>
      {lodash.includes(operationList, 'downloadforconfigtable') ? (
        <Button loading={loading} type='primary'  onClick={handleDownloadData}>
          downloadForConfigTable
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
export default DownloadData

