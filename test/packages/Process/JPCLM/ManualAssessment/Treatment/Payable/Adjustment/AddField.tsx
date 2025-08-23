import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import Section, { AddFields as Fields } from '../../Section';
import styles from './index.less';

const AddField = ({ form, treatmentId, treatmentPayableId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <div className={styles.dateAdd}>
      <CardOfClaim style={{ paddingTop: 16 }} cardStyle={{ width: '6px' }}>
        <Section form={form} editable={editable} section="Treatment.Payable.AddField">
          <Fields.OutpatientDateAdd
            treatmentId={treatmentId}
            treatmentPayableId={treatmentPayableId}
          />
        </Section>
      </CardOfClaim>
    </div>
  );
};

export default connect()(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, treatmentPayableId, incidentId, treatmentId }: any = props;
      dispatch({
        type: 'JPCLMOfClaimAssessment/addAdjOpTreatmentPayableItem',
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
