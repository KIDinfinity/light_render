import React, { useState } from 'react';
import { Button, notification, Upload, Form, Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { OPERATION_TYPE } from 'sql/enum';
import styles from './UploadModal.less';
import ResizeModal from '@/components/ResizeModal';
import lodash from 'lodash';
import { FormItemSelect } from 'basic/components/Form/FormSection';
import { formatMessageApi } from '@/utils/dictFormatMessage';

function UploadModal({ form }) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const type = useSelector((state: any) => state.sqlController?.checkModalType);
  const visible = OPERATION_TYPE.UPLOAD === type;
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
    setData([]);
    setUploadError(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    let errors = [];

    try {
      await form.validateFields();
    } catch (error) {
      errors = error.errors;
    }
    if (lodash.isEmpty(data)) {
      setUploadError('请上传文件！');
    }
    if (lodash.isEmpty(errors) && !lodash.isEmpty(data)) {
      console.log({ ...form.getFieldsValue(), file: data[0] });
      const result = await dispatch({
        type: 'sqlController/checkOperationData',
        payload: {
          type,
          data: { ...form.getFieldsValue(), file: data[0] },
        },
      });
      if (result) {
        notification.success({ message: 'success!' });
        closeModal();
      } else {
        notification.error({ message: 'error!' });
      }
    }
    console.log(errors);
  };

  return (
    <ResizeModal
      height={(document.body?.getBoundingClientRect()?.height + 100) * 0.8}
      width={(document.body?.getBoundingClientRect()?.width + 100) * 0.8}
      moveTop={56}
      visible={visible}
      setVisible={closeModal}
      className={styles.modal}
    >
      <Col className="gutter-row" span={24}>
        <FormItemSelect
          required={true}
          form={form}
          formName="operation"
          labelId={formatMessageApi({ Label_COM_ReportCenter: 'operation' })}
          dicts={[
            { dictCode: 'add', dictName: 'add' },
            { dictCode: 'fullBackup', dictName: 'fullBackup' },
          ]}
        />
      </Col>
      <Col className="gutter-row" span={24}>
        <div className={styles.error}>{uploadError}</div>
        <Upload
          fileList={data}
          beforeUpload={() => false}
          onChange={(e) => {
            setData(e.fileList.length === 0 ? [] : [e.file]);
            setUploadError(null);
          }}
        >
          <Button type="primary">上传文件</Button>
        </Upload>
      </Col>
      <Col className="gutter-row" span={24}>
        <Button className={styles.btn} type="primary" onClick={handleSubmit} loading={loading}>
          备份
        </Button>
      </Col>
    </ResizeModal>
  );
}
export default Form.create()(UploadModal);
