import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils, FormAntCard } from 'basic/components/Form';
import Section, { SectionTitle, Fields } from './Section/index';
import styles from './Claimant.less';

const Claimant = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  // 现PH要求放开编辑限制，为了最小化改动将isrelationshipWithInsuredSelf定为了false。
  // 后续可以考虑采用V2的通用Section
  const isrelationshipWithInsuredSelf = false;
  // form.getFieldValue('relationshipWithInsured') === relationshipWithInsuredForHK.self ||
  // form.getFieldValue('relationshipWithInsured') === relationshipWithInsuredForHK.policyOwner;
  return (
    <div className={styles.claimant}>
      <FormAntCard title={<SectionTitle />}>
        <Section form={form} editable={editable} section="Claimant">
          <Fields.CompanyName />
          <Fields.Address isrelationshipWithInsuredSelf={isrelationshipWithInsuredSelf} />
          <Fields.DateOfBirth isrelationshipWithInsuredSelf={isrelationshipWithInsuredSelf} />
          <Fields.Email isrelationshipWithInsuredSelf={isrelationshipWithInsuredSelf} />
          <Fields.FirstName isrelationshipWithInsuredSelf={isrelationshipWithInsuredSelf} />
          <Fields.Gender isrelationshipWithInsuredSelf={isrelationshipWithInsuredSelf} />
          <Fields.IdentityNo isrelationshipWithInsuredSelf={isrelationshipWithInsuredSelf} />
          <Fields.IdentityType isrelationshipWithInsuredSelf={isrelationshipWithInsuredSelf} />
          <Fields.Nationality isrelationshipWithInsuredSelf={isrelationshipWithInsuredSelf} />
          <Fields.Occupation isrelationshipWithInsuredSelf={isrelationshipWithInsuredSelf} />
          <Fields.PhoneNo isrelationshipWithInsuredSelf={isrelationshipWithInsuredSelf} />
          <Fields.RelationshipWithInsured />
          <Fields.Surname isrelationshipWithInsuredSelf={isrelationshipWithInsuredSelf} />
          <Fields.MiddleName isrelationshipWithInsuredSelf={isrelationshipWithInsuredSelf} />
          <Fields.ExtName isrelationshipWithInsuredSelf={isrelationshipWithInsuredSelf} />
        </Section>
      </FormAntCard>
    </div>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  claimant: lodash.get(modelnamepsace, 'claimProcessData.claimant'),
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['dateOfBirth']);
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveClaimant',
              payload: {
                changedFields: finalChangedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveClaimant',
            payload: {
              changedFields: finalChangedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { claimant } = props;

      return formUtils.mapObjectToFields(claimant);
    },
  })(Claimant)
);
