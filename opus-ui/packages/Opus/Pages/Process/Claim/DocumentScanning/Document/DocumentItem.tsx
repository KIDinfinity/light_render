import React from 'react';
import { Form, Col, Row } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import Section, { Fields } from './Section';
import styles from './index.less';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';

const Item = ({ form, dispatch, id }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const removeUploadFileCallback = () => {
    if (!editable) return;

    dispatch({
      type: `${NAMESPACE}/removeUploadedFiles`,
      payload: {
        id,
      },
    });
  };

  return (
    <Row>
      <Col span={23}>
        <Section form={form} editable={editable} section="DocumentItem">
          <Fields.Document />
          <Fields.DocumentTypeName />
          <Fields.ExchangeDate />
        </Section>
      </Col>
      <Col span={1}>
        {editable && (
          <DeleteButton
            type="delete"
            className={styles.delete}
            handleDelete={removeUploadFileCallback}
          />
        )}
      </Col>
    </Row>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, id } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'updataClaimProcessDataUploadFiles',
          payload: {
            id,
            updateData: changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item = {} } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(Item)
);
