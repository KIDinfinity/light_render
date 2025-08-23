import React, { useEffect, useState } from 'react';
import { Form, Button, Col, Table, notification, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { OPERATION_TYPE } from 'sql/enum';
import SearchField from '../SearchField';
import styles from './OperationModal.less';
import { Columns } from '../Column';
import ResizeModal from '@/components/ResizeModal';
import lodash from 'lodash';
import classNames from 'classnames';

function OperationModal({ form }) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [selectData, setSelectData] = useState({});
  const [updateListId, setUpdateListId] = useState([]);
  const type = useSelector((state: any) => state.sqlController?.checkModalType);
  const selectedRow = useSelector((state: any) => state.sqlController.checkSelectedRow);
  const onlineCheckList = useSelector((state: any) => state.sqlController.onlineCheckList);
  const visible = [OPERATION_TYPE.ADD, OPERATION_TYPE.UPDATE, OPERATION_TYPE.DELETE].includes(type);
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
    form.resetFields();
    setData([]);
    setSelectData({});
    setUpdateListId([]);
  };
  const handleAdd = () => {
    const formData = form.getFieldsValue();
    setData((e) => [...e, formData]);
  };
  const handleUpdate = () => {
    const formData = form.getFieldsValue();
    setData((e) =>
      e.map((item) => (item.id === selectData.id ? { ...formData, id: item.id } : item))
    );
    setUpdateListId((e) => [...e, selectData.id]);
    setSelectData({});
  };
  const removeData = (index) => {
    setData((e) => e.filter((item, dataIndex) => index !== dataIndex));
  };
  const handleSubmit = async () => {
    if (lodash.isEmpty(data)) {
      return notification.error({ message: '数据不得为空!' });
    }
    const result = await dispatch({
      type: 'sqlController/checkOperationData',
      payload: {
        type,
        data,
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
    if (visible && type !== OPERATION_TYPE.ADD) {
      setData(lodash.cloneDeep(onlineCheckList.filter((item) => selectedRow.includes(item?.id))));
    }
  }, [visible, selectedRow, type]);

  return (
    <ResizeModal
      height={(document.body?.getBoundingClientRect()?.height + 100) * 0.8}
      width={(document.body?.getBoundingClientRect()?.width + 100) * 0.8}
      moveTop={56}
      visible={visible}
      setVisible={closeModal}
      className={styles.modal}
    >
      <SearchField
        form={form}
        fieldButton={() => (
          <Col className="gutter-row" span={6}>
            <div className={styles.searchBtn}>
              {type === OPERATION_TYPE.ADD && (
                <Button className={styles.btn} onClick={handleAdd} type="primary" loading={loading}>
                  Add
                </Button>
              )}
              {type === OPERATION_TYPE.UPDATE && (
                <Button
                  className={styles.btn}
                  onClick={handleUpdate}
                  type="primary"
                  loading={loading}
                >
                  Update
                </Button>
              )}
              <Button
                className={styles.btn}
                onClick={handleSubmit}
                type="primary"
                loading={loading}
              >
                Submit
              </Button>
            </div>
          </Col>
        )}
      />

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
        dataSource={data}
        rowClassName={(record) => {
          const selected = selectData?.id && selectData?.id === record?.id;
          const update = updateListId.includes(record?.id);
          return classNames({ [styles.selected]: selected, [styles.update]: !selected && update });
        }}
        scroll={{
          x: '80vh',
          y: (document.body?.getBoundingClientRect()?.height + 100) * 0.8 - 280 + 'px',
          scrollToFirstRowOnChange: false,
        }}
        onRow={(record, rowKey) => ({
          index: rowKey,
          record,
          sourcetype: 3,
          onClick: () => {
            if (type === OPERATION_TYPE.UPDATE) {
              form.setFieldsValue(record);
              setSelectData(record);
            }
          },
        })}
      />
    </ResizeModal>
  );
}
export default Form.create()(OperationModal);
