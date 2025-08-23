import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { Modal as AntModal, Form, Input, Icon, Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormItemCheckboxGroup, FormItemSelect, FormItemAutoComplete } from 'basic/components/Form';
import type { Dispatch } from 'redux';
import type { FormComponentProps, WrappedFormUtils } from 'antd/es/form/Form';
import { ExportLiquibaseType, LiquibasePage } from '../Utils/Constant';
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
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: any) => state.loading.effects['configurationExcel/exportLiquibase']
  );
  const showLiquibaseModal = useSelector(
    (state: any) => state.configurationExcel.showLiquibaseModal
  );
  const DropDown_COM_Region = useSelector(
    (state: any) => state.dictionaryController?.DropDown_COM_Region
  );
  const onCancel = () => {
    dispatch({
      type: 'configurationExcel/hideLiquibaseModal',
    });
  };

  const onOk = async () => {
    form.validateFields(async (err: any, fieldsValue: any) => {
      if (err) {
        return;
      }
      const { context, lineNumber, type } = fieldsValue;
      await dispatch({
        type: `configurationExcel/exportLiquibase`,
        payload: {
          context,
          lineNumber,
          type
        },
      });
      form.resetFields();
    });
  };
  return (
    <AntModal
      title={formatMessageApi({
        Label_BPM_Button: 'configurationcenter.button.exportLiquibase',
      })}
      visible={showLiquibaseModal}
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
        <Row gutter={16} >
          <Col span={8}>
            <FormItemSelect
              form={form}
              formName="type"
              labelId="Type"
              required
              dicts={ExportLiquibaseType}
            />
          </Col>
          <Col span={8}>
            <FormItemAutoComplete
              allowClear
              className={styles.chequeRemark}
              dataSource={LiquibasePage}
              onSearch={() => LiquibasePage}
              form={form}
              formName="lineNumber"
              labelId="Page Number"
              initialValue='1000'
              rules={[{
                pattern: /^\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g,
                message: 'Out of range!',
              }]}
            >
              <Input suffix={<Icon className={styles.chequeRemarkListIcon} type="down" />} />
            </FormItemAutoComplete>
          </Col>
        </Row>
        <FormItemCheckboxGroup
          form={form}
          dicts={DropDown_COM_Region}
          formName="context"
          labelId="Context"
        />
      </Form>
    </AntModal>
  );
});
