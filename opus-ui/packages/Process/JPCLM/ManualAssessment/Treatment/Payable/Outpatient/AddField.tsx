import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import Section, { AddFields as Fields } from '../../Section';
import styles from './Item.less';

const AddField = ({ form, treatmentId, treatmentPayableId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <CardOfClaim
      className={styles.OutpatientItem}
      style={{ paddingTop: 16 }}
      cardStyle={{ width: '6px' }}
    >
      <Section form={form} editable={editable} section="Treatment.Payable.AddField">
        <Fields.OutpatientDateAdd
          treatmentId={treatmentId}
          treatmentPayableId={treatmentPayableId}
        />
      </Section>
    </CardOfClaim>
  );
};

export default connect()(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, treatmentPayableId, incidentId, treatmentId }: any = props;
      dispatch({
        type: 'JPCLMOfClaimAssessment/addOPTreatmentPayableItemAdd',
        payload: {
          treatmentPayableId,
          incidentId,
          treatmentId,
          changedValues,
        },
      });
    },

    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(AddField)
);
