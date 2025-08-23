import React, { useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Modal as AntModal, Form, Row, Col, Button, Upload } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormItemNumber, FormItemSelect, FormItemInput } from 'basic/components/Form';
import type { Dispatch } from 'redux';
import type { FormComponentProps, WrappedFormUtils } from 'antd/es/form/Form';
import { SQLCategory } from '../Utils/Constant';
import styles from './index.less';

interface ComponentProps extends FormComponentProps {
  form: WrappedFormUtils;
  dispatch: Dispatch;
  submitLoading: boolean;
  showSubmitModal: boolean;
  submitRow: any[];
  TableSearch: any;
}

export default Form.create()(({ form }: ComponentProps) => {
  const [savefile, setSaveFile] = useState();
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: any) => state.loading.effects['configurationCenter/uploadSQL']
  );
  const SQLDatasourceName = useSelector(
    (state: any) => state.configurationCenter.SQLDatasourceName
  );

  const showSQLModal = useSelector((state: any) => state.configurationCenter.showSQLModal);

  const handleUploadSQL = async ({ file }: any) => {
    form.setFieldsValue({ fileName: file.name });
    setSaveFile(file);
  };
  const onCancel = () => {
    dispatch({
      type: 'configurationCenter/hideSQLModal',
    });
  };

  const onOk = async () => {
    form.validateFields(async (err: any, fieldsValue: any) => {
      if (err) {
        return;
      }

      await dispatch({
        type: 'configurationCenter/uploadSQL',
        payload: {
          ...fieldsValue,
          sqlFile: savefile,
        },
      });
      onCancel();
      form.resetFields();
      setSaveFile(undefined);
    });
  };
  return (
    <AntModal
      title="UploadSQL"
      visible={showSQLModal}
      width={600}
      cancelText={formatMessageApi({
        Label_BIZ_Claim: 'form.cancel',
      })}
      okText={formatMessageApi({
        Label_BIZ_Claim: 'form.confirm',
      })}
      onCancel={onCancel}
      onOk={onOk}
      maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
      confirmLoading={loading}
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={8}>
            <Upload
              showUploadList={false}
              onChange={handleUploadSQL}
              beforeUpload={() => false}
              accept=".sql"
            >
              <Button className={styles.btnBlue}>UploadSQL</Button>
            </Upload>
          </Col>
          <Col span={8}>
            <FormItemInput form={form} formName="fileName" labelId="fileName" disabled required />
          </Col>
        </Row>
        <FormItemInput
          form={form}
          formName="datasourceName"
          labelId="datasourceName"
          initialValue={SQLDatasourceName}
          disabled
          required
        />
        <FormItemSelect
          form={form}
          formName="sqlCategory"
          labelId="sqlCategory"
          required
          dicts={SQLCategory}
        />
        <FormItemNumber
          form={form}
          formName="batchNumber"
          labelId="batchNumber"
          min={0}
          precision={0}
          required
        />
      </Form>
    </AntModal>
  );
});
