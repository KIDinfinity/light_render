import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

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
          <Fields.Nationality />
          <Fields.Occupation />
          <Fields.PhoneNo />
          <Fields.PolicyId />
          <Fields.Surname />
        </Section>
      </FormAntCard>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  insured: lodash.get(modelnamepsace, 'claimProcessData.insured'),
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch }: any = props;

      let finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['dateOfBirth']);
      finalChangedFields = formUtils.onFieldsChangeOfDateOrgin(finalChangedFields, [
        'dateTimeOfDeath',
      ]);

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveInsured',
          payload: {
            changedFields: finalChangedFields,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { insured } = props;
      return formUtils.mapObjectToFields(insured);
    },
  })(Insured)
);
