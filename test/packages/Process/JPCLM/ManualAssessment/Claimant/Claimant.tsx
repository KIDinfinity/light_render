import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { FormAntCard, formUtils } from 'basic/components/Form';
import { calcAge } from '@/utils/utils';
import Section, { SectionTitle, Fields } from './Section';
import styles from './Claimant.less';

const Claimant = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.claimant}>
      <FormAntCard title={<SectionTitle />}>
        <Section form={form} editable={editable} section="Claimant">
          <Fields.Address />
          <Fields.DateOfBirth />
          <Fields.Email />
          <Fields.FirstName />
          <Fields.Gender />
          <Fields.PhoneNo />
          <Fields.PostCode />
          <Fields.RelationshipWithInsured />
          <Fields.Surname />
          <Fields.Age />
          <Fields.SMS />
        </Section>
      </FormAntCard>
    </div>
  );
};

export default connect(({ formCommonController, JPCLMOfClaimAssessment, processTask }: any) => ({
  validating: formCommonController.validating,
  claimant: JPCLMOfClaimAssessment.claimProcessData?.claimant,
  taskDetail: processTask.getTask,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveClaimant',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveClaimant',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { claimant, taskDetail = {} } = props;
      const { submissionDate } = taskDetail;
      const { dateOfBirth } = claimant || {};

      return formUtils.mapObjectToFields({
        ...claimant,
        age: calcAge(dateOfBirth, submissionDate),
      });
    },
  })(Claimant)
);
