import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { calcAge } from '@/utils/utils';
import { FormAntCard, formUtils } from 'basic/components/Form';
import Section, { SectionTitle, Fields } from './Section';
import styles from './Insured.less';

const Insured = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.insured}>
      <FormAntCard title={<SectionTitle />}>
        <Section form={form} editable={editable} section="Insured">
          <Fields.Address />
          <Fields.Age />
          <Fields.DateOfBirth />
          <Fields.DateTimeOfDeath />
          <Fields.Email />
          <Fields.FirstName />
          <Fields.Gender />
          <Fields.InsuredId />
          <Fields.Occupation />
          <Fields.PhoneNo />
          <Fields.PolicyId />
          <Fields.PostCode />
          <Fields.Surname />
        </Section>
      </FormAntCard>
    </div>
  );
};

export default connect(({ formCommonController, JPCLMOfClaimAssessment, processTask }: any) => ({
  validating: formCommonController.validating,
  insured: JPCLMOfClaimAssessment.claimProcessData?.insured,
  taskDetail: processTask.getTask,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveInsured',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveInsured',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { insured, taskDetail = {} }: any = props;
      const { submissionDate } = taskDetail;

      const { dateOfBirth } = insured || {};

      return formUtils.mapObjectToFields({
        ...insured,
        age: calcAge(dateOfBirth, submissionDate),
      });
    },
  })(Insured)
);
