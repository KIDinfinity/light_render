import React from 'react';
import { Button } from 'antd';
import lodash from 'lodash';
import { useDispatch, useSelector} from 'dva';
import type { Dispatch } from 'redux';
import styles from './index.less';

function DownloadData({ functionData }: any) {
  const { operationList } = functionData;
  const dispatch: Dispatch = useDispatch();
  const loading=useSelector((state: any)=>state.loading.effects['configurationCenter/downloadAllFileList'])
  const handleDownloadData = () => {
    dispatch({
      type: 'configurationCenter/downloadAllFileList',
    });
  };
  return (
    <>
      {lodash.includes(operationList, 'downloadallfilelist') ? (
        <Button loading={loading} className={styles.btnPink}  onClick={handleDownloadData}>
          downloadAllFileList
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
export default DownloadData

