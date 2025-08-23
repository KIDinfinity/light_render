import React, { useRef } from 'react';
import { Form, Row, Col } from 'antd';
import { connect } from 'dva';
import ModalWarnMessage from '@/components/ModalWarnMessage';
import { FormItemInput, formUtils, FormItemSelect } from 'basic/components/Form';

function DeletePatchModal({ form, visible, setVisible, dispatch, loading }: any) {
  const ref: any = useRef();

  const onOk = () => {
    form.validateFields({ force: true }, async (error: any, values: any) => {
      if (error) {
        ref?.current?.hideLoading?.();
        return;
      }

      const result = await dispatch({
        type: 'sqlController/deletePatch',
        payload: {
          values,
        },
      });

      setVisible(false);

      if (!result) {
        return;
      }
      await dispatch({
        type: 'sqlController/getPatchList',
      });
    });
  };

  return (
    <>
      <ModalWarnMessage
        ref={ref}
        visible={visible}
        width={1200}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={onOk}
        okText="Delete"
        closable={false}
        cancelText="Cancel"
        hiddenExtraText
        confirmLoading={loading}
        cancelButtonProps={{ disabled: loading }}
        maskClosable={false}
        maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
      >
        <Form>
          <Row type="flex" gutter={16}>
            <Col span={12}>
              <FormItemInput form={form} formName="jiraNum" labelId="Jira Num " required />
            </Col>
            <Col span={12}>
              <FormItemSelect
                form={form}
                mode="multiple"
                formName="deletables"
                labelId="Data Patch"
                disabled
                required
                dicts={[]}
              />
            </Col>
          </Row>
          <Row type="flex" gutter={16}>
            <Col span={24}>
              <FormItemInput form={form} formName="message" labelId="Message" required />
            </Col>
          </Row>
        </Form>
      </ModalWarnMessage>
    </>
  );
}

export default connect(({ sqlController, loading }: any) => ({
  tempDataPatch: sqlController?.tempDataPatch,
  gitAccount: sqlController?.gitAccount,
  loading: loading.effects['sqlController/updateChildPatch'],
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { deletables } = props;
      return formUtils.mapObjectToFields({
        deletables: deletables.map((item: any) => item.patchName),
      });
    },
  })(DeletePatchModal)
);
