import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { Modal as AntModal, Radio } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const DownLodaLiquibaseFileModal = () => {
  const dispatch = useDispatch();
  const liquibaseFiles: boolean = useSelector((state: any) => state.configurationCenter.liquibaseFiles);
  const selectedLiquibaseFileName: boolean = useSelector((state: any) => state.configurationCenter.selectedLiquibaseFileName);
  const showLiquibaseFileModal: boolean = useSelector((state: any) => state.configurationCenter.showLiquibaseFileModal);
  const submitLoading=useSelector((state: any)=>state.loading.effects['configurationCenter/uploadSelectedLiquibaseFile'])
  const onCancel = () => {
    dispatch({
      type: 'configurationCenter/hideLiquibaseFileModal',
    });
  }

  const onOk = () => {
    dispatch({
      type: 'configurationCenter/uploadSelectedLiquibaseFile',
      payload: {
        selectedLiquibaseFileName,
      },
    });
  }

  const handleChange = (e: any) => {
    dispatch({
      type: 'configurationCenter/saveSelectedLiquibaseFile',
      payload: {
        selectedLiquibaseFileName: e.target.value,
      },
    });
  };

  const afterClose=()=>{
    dispatch({
      type: 'configurationCenter/save',
      payload: {
        selectedLiquibaseFileName: []
      },
    });
  }

  return (
    <AntModal
      title='DownLoad File'
      visible={showLiquibaseFileModal}
      width={700}
      afterClose={afterClose}
      cancelText={formatMessageApi({
        Label_BIZ_Claim: 'form.cancel',
      })}
      okText='DownLoad'
      onCancel={onCancel}
      onOk={onOk}
      maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
      confirmLoading={submitLoading}
    >
      <div className={styles.content}>
        <div className={styles.list}>
          <Radio.Group options={liquibaseFiles} onChange={handleChange} value={selectedLiquibaseFileName} />
        </div>
      </div>
    </AntModal>
  );
}

export default DownLodaLiquibaseFileModal;
