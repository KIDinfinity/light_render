import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

import { calcAge } from '@/utils/utils';
import { formUtils, FormAntCard } from 'basic/components/Form';
import Section, { SectionTitle, Fields } from './Section';
import styles from './Insured.less';

const Insured = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <div className={styles.insured}>
      <FormAntCard title={<SectionTitle />}>
        <Section form={form} editable={editable} section="Insured">
          <Fields.Address />
          <Fields.DateOfBirth />
          <Fields.DateTimeOfDeath />
          <Fields.Email />
          <Fields.FirstName />
          <Fields.Gender />
          <Fields.IdentityNo />
          <Fields.IdentityType />
          <Fields.InsuredId />
          <Fields.MiddleName />
          <Fields.Surname />
          <Fields.Age />
          <Fields.Nationality />
          <Fields.Occupation />
          <Fields.PhoneNo />
          <Fields.PolicyId />
        </Section>
      </FormAntCard>
    </div>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace, processTask }: any) => ({
    insured: lodash.get(modelnamepsace, 'claimProcessData.insured'),
    validating: formCommonController.validating,
    submissionDate: processTask.getTask?.submissionDate,
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating }: any = props;

      let finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['dateOfBirth']);
      finalChangedFields = formUtils.onFieldsChangeOfDateOrgin(finalChangedFields, [
        'dateTimeOfDeath',
      ]);

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveInsured',
              payload: {
                changedFields: finalChangedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveInsured',
            payload: {
              changedFields: finalChangedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { insured, submissionDate } = props;
      const { dateOfBirth } = insured || {};
      if (lodash.isPlainObject(insured) && !insured?.age) {
        insured.age = calcAge(dateOfBirth, submissionDate);
      }
      return formUtils.mapObjectToFields(insured);
    },
  })(Insured)
);
