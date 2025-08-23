import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleBlurTransferAddItemPolicy from 'process/NB/ManualUnderwriting/_hooks/useHandleBlurTransferAddItemPolicy';

const Transferpaymenttable = ({ form, transferAddItem }: any) => {
  const handleBlur = useHandleBlurTransferAddItemPolicy({ form });
  return (
    <Row>
      <Col span={6}>
        <Form>
          {form.getFieldDecorator('targetPolicyId', {
            value: transferAddItem?.value,
          })(<Input onBlur={handleBlur} />)}
        </Form>
      </Col>
    </Row>
  );
};

export default connect()(
  Form.create<any>({
    onValuesChange(props: any, changedFields: any) {
      const { dispatch } = props;
      dispatch({
        type: `${NAMESPACE}/saveTransferAddItem`,
        payload: {
          transferAddItem: {
            ...changedFields,
          },
        },
      });
    },
    mapPropsToFields(props: any) {
      const { transferAddItem } = props;
      return formUtils.mapObjectToFields(transferAddItem);
    },
  })(Transferpaymenttable)
);
