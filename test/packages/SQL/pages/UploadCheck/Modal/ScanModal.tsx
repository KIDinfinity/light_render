import React, { useState } from 'react';
import { Form, Button, Col, Table, notification, Row } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { OPERATION_TYPE } from 'sql/enum';
import styles from './OperationModal.less';
import ResizeModal from '@/components/ResizeModal';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormItemSelect, FormItemInput } from 'basic/components/Form/FormSection';

function OperationModal({ form }) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const type = useSelector((state: any) => state.sqlController?.checkModalType);
  const checkDbNameList = useSelector((state: any) => state.sqlController.checkDbNameList);
  const Region = useSelector(
    ({ dictionaryController }: any) => dictionaryController.DropDown_COM_Region
  );
  const scanLoading = useSelector(
    (state: any) => state.loading.effects['sqlController/checkScanConfigTableList']
  );
  const loading = useSelector(
    (state: any) => state.loading.effects['sqlController/checkOperationData']
  );
  const visible = OPERATION_TYPE.SCAN === type;

  const closeModal = () => {
    dispatch({
      type: 'sqlController/checkOpenModal',
      payload: {
        type: OPERATION_TYPE.NUll,
      },
    });
    form.resetFields();
    setData([]);
  };

  const handleScan = async () => {
    const formData = form.getFieldsValue();
    const result = await dispatch({
      type: 'sqlController/checkScanConfigTableList',
      payload: {
        formData,
      },
    });
    if (result && result?.success) {
      setData(result?.resultData);
    } else {
      notification.error({ message: 'error!' });
    }
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

  const CompareColumns = (list) => {
    return list?.map((listItem) => ({
      title: formatMessageApi({ ['Label_BIZ_Claim']: listItem }),
      dataIndex: listItem,
      key: listItem,
      render: (text: any) => text || '-',
      width: 120,
    }));
  };

  return (
    <ResizeModal
      height={(document.body?.getBoundingClientRect()?.height + 100) * 0.8}
      width={(document.body?.getBoundingClientRect()?.width + 100) * 0.8}
      moveTop={58}
      visible={visible}
      setVisible={closeModal}
      className={styles.modal}
    >
      <Row gutter={18}>
        <Col className="gutter-row" span={8}>
          <FormItemSelect
            form={form}
            formName="regionCode"
            labelId="RegionCode"
            dicts={Region}
            dictName="dictCode"
            name="regionCode"
          />
        </Col>
        <Col className="gutter-row" span={8}>
          {lodash.isEmpty(checkDbNameList) ? (
            <FormItemInput
              form={form}
              formName="dbName"
              labelId={formatMessageApi({ Label_COM_ReportCenter: 'dbName' })}
              name="dbName"
            />
          ) : (
            <FormItemSelect
              form={form}
              formName="dbName"
              labelId="dbName"
              dicts={checkDbNameList}
              name="dbName"
            />
          )}
        </Col>

        <Col className="gutter-row" span={8}>
          <div className={styles.searchBtn}>
            <Button
              className={styles.btn}
              onClick={handleScan}
              type="primary"
              loading={scanLoading || loading}
            >
              Scan
            </Button>
            <Button
              className={styles.btn}
              onClick={handleSubmit}
              type="primary"
              loading={scanLoading || loading}
            >
              add to online click
            </Button>
          </div>
        </Col>
      </Row>

      <Table
        className={styles.table}
        rowKey={(row) => row.id}
        columns={CompareColumns(Object.keys(data?.[0] || {}) || [])}
        dataSource={data}
        scroll={{
          x: '80vh',
          y: (document.body?.getBoundingClientRect()?.height + 100) * 0.8 - 280 + 'px',
          scrollToFirstRowOnChange: false,
        }}
        onRow={(record, rowKey) => ({
          index: rowKey,
          record,
          sourcetype: 3,
        })}
      />
    </ResizeModal>
  );
}
export default Form.create()(OperationModal);
