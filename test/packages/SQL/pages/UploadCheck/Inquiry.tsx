import React from 'react';
import { Form, Button, Col } from 'antd';
import { formUtils } from 'basic/components/Form';
import styles from './Inquiry.less';
import { connect } from 'dva';
import { OPERATION_TYPE } from 'sql/enum';
import SearchField from './SearchField';
import { formatMessageApi } from '@/utils/dictFormatMessage';

function Inquiry({ form, dispatch }) {
  const handleReset = () => {
    dispatch({ type: 'sqlController/checkReset' });
  };
  const handleSubmit = () => {
    dispatch({ type: 'sqlController/checkSearch' });
  };

  const handleOpenModal = (type) => {
    dispatch({
      type: 'sqlController/checkOpenModal',
      payload: {
        type,
      },
    });
  };

  const commonOperationList = [
    {
      label: 'Add',
      click: handleOpenModal.bind(null, OPERATION_TYPE.ADD),
      disable: false,
    },
    {
      label: 'Update',
      click: handleOpenModal.bind(null, OPERATION_TYPE.UPDATE),
      disable: false,
    },
    {
      label: 'Delete',
      click: handleOpenModal.bind(null, OPERATION_TYPE.DELETE),
      disable: false,
    },
  ];
  const backupOperationList = [
    {
      label: '备份线上当前配置',
      click: handleOpenModal.bind(null, OPERATION_TYPE.BACKUP),
      disable: false,
    },
    {
      label: '备份excel配置',
      click: handleOpenModal.bind(null, OPERATION_TYPE.UPLOAD),
      disable: false,
    },
    {
      label: '比较版本数据',
      click: handleOpenModal.bind(null, OPERATION_TYPE.COMPARE),
      disable: false,
    },
    {
      label: 'scan table config',
      click: handleOpenModal.bind(null, OPERATION_TYPE.SCAN),
      disable: false,
    },
  ];
  return (
    <div className={styles.inquiry}>
      <SearchField
        form={form}
        fieldButton={() => (
          <Col className="gutter-row" span={6}>
            <div className={styles.searchBtn}>
              <Button type="primary" className={styles.btn} onClick={handleReset}>
                Reset
              </Button>
              <Button type="primary" className={styles.btn} onClick={handleSubmit}>
                Search
              </Button>
            </div>
          </Col>
        )}
      />

      <div className={styles.groupBtn}>
        {commonOperationList.map((item) => (
          <Button
            type="primary"
            key={item.label}
            className={styles.buttonSave}
            onClick={item.click}
            disabled={item.disable}
          >
            {formatMessageApi({
              Label_BPM_Button: item.label,
            })}
          </Button>
        ))}
        {backupOperationList.map((item) => (
          <Button
            type="primary"
            className={styles.buttonSave}
            onClick={item.click}
            disabled={item.disable}
            key={item.label}
          >
            {formatMessageApi({
              Label_BPM_Button: item.label,
            })}
          </Button>
        ))}
      </div>
    </div>
  );
}
export default connect(({ sqlController }: any) => ({
  checkForm: sqlController.checkForm,
}))(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch } = props;
      setTimeout(() => {
        dispatch({
          type: 'sqlController/saveCheckForm',
          payload: {
            changedFields,
          },
        });
      }, 0);
    },
    mapPropsToFields(props) {
      const { checkForm } = props;
      return formUtils.mapObjectToFields(checkForm);
    },
  })(Inquiry)
);
