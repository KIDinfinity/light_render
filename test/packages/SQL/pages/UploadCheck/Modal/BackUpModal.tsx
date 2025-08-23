import React, { useEffect, useState } from 'react';
import { Button, Table, notification, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { OPERATION_TYPE } from 'sql/enum';
import styles from './BackUpModal.less';
import { Columns } from '../Column';
import ResizeModal from '@/components/ResizeModal';
import lodash from 'lodash';

function BackUpModal() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const selectedRow = useSelector((state: any) => state.sqlController.checkSelectedRow);
  const type = useSelector((state: any) => state.sqlController?.checkModalType);
  const onlineCheckList = useSelector((state: any) => state.sqlController.onlineCheckList);
  const visible = OPERATION_TYPE.BACKUP === type;
  const loading = useSelector(
    (state: any) => state.loading.effects['sqlController/checkOperationData']
  );

  const closeModal = () => {
    dispatch({
      type: 'sqlController/checkOpenModal',
      payload: {
        type: OPERATION_TYPE.NUll,
      },
    });
  };
  const removeData = (index) => {
    setData((e) => e.filter((item, dataIndex) => index !== dataIndex));
  };
  const handleSubmit = async () => {
    const result = await dispatch({
      type: 'sqlController/checkOperationData',
      payload: {
        type,
        data: data.length === onlineCheckList.length ? [] : data,
      },
    });
    if (result) {
      notification.success({ message: 'success!' });
      closeModal();
    } else {
      notification.error({ message: 'error!' });
    }
  };

  useEffect(() => {
    if (visible) {
      setData(
        lodash.isEmpty(selectedRow)
          ? lodash.cloneDeep(onlineCheckList)
          : lodash.cloneDeep(onlineCheckList.filter((item) => selectedRow.includes(item?.id)))
      );
    }
  }, [visible, selectedRow]);

  return (
    <ResizeModal
      height={(document.body?.getBoundingClientRect()?.height + 100) * 0.8}
      width={(document.body?.getBoundingClientRect()?.width + 100) * 0.8}
      moveTop={56}
      visible={visible}
      setVisible={closeModal}
      className={styles.modal}
    >
      <h3 className={styles.title}>
        {lodash.isEmpty(data)
          ? '点击备份将备份所有配置数据！'
          : '即将备份以下数据，请确认后点击备份！'}
      </h3>
      <Table
        className={styles.table}
        rowKey={(row) => row.id}
        columns={Columns({}, () => {}, {
          fieldName: ' ',
          labelTypeCode: '',
          id: ' ',
          dataIndex: 'remove',
          key: 'remove',
          width: 40,
          render: (text: any, item: any, index) => (
            <Icon type="close-circle" onClick={removeData.bind(null, index)} />
          ),
        })}
        scroll={{
          x: '80vh',
          y: (document.body?.getBoundingClientRect()?.height + 100) * 0.8 - 280 + 'px',
          scrollToFirstRowOnChange: false,
        }}
        dataSource={data}
        onRow={(record, rowKey) => ({
          index: rowKey,
          record,
          sourcetype: 3,
        })}
      />
      <Button className={styles.btn} type="primary" onClick={handleSubmit} loading={loading}>
        备份
      </Button>
    </ResizeModal>
  );
}
export default BackUpModal;
