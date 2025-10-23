import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

import { Form, Icon } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as portraitTitleSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentTitlePortrait.svg';
import { ReactComponent as portraitSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentPortrait.svg';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import styles from './Claimant.less';

const getName = (user) =>
  lodash
    .compact([user?.firstName, user?.middleName, user?.surname].map(formUtils.queryValue))
    .join(' ');

const Claimant = ({ form, claimant }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <div className={styles.claimant}>
      <div className={styles.titleRow}>
        <Icon component={portraitTitleSvg} />
        {formatMessageApi({
          Label_BIZ_Claim:
            'app.navigator.task-detail-of-claim-assessment.title.claimant-information',
        })}
        {/* <div className={styles.gap} /> */}
      </div>
      <div className={styles.innerCard}>
        <div className={styles.innerTitleRow}>
          {claimant?.gender === 'F' ? 'Mrs. ' : 'Mr. '}
          {getName(claimant)}
          {claimant?.customerRole?.split(',').map(
            (role) =>
              role && (
                <div className={styles.role} key={role}>
                  {formatMessageApi({ Dropdown_CLM_CustomerRole: role })}
                </div>
              )
          )}
        </div>
        <div className={styles.divideTitleRow}>
          <Icon component={portraitSvg} />
          <div className={styles.divideLine} />
        </div>
        <Section form={form} editable={editable} section="Claimant">
          <Fields.Address />
          <Fields.DateOfBirth />
          <Fields.Email />
          <Fields.FirstName />
          <Fields.Gender />
          <Fields.PhoneNo />
          <Fields.RelationshipWithInsured />
          <Fields.Surname />
          <Fields.PostCode />
          <Fields.Age />
          <Fields.SMS />
          <Fields.AgencyDisclosureFlag />
        </Section>
      </div>
    </div>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace, processTask }: any) => ({
    claimant: lodash.get(modelnamepsace, 'claimProcessData.claimant'),
    validating: formCommonController.validating,
    submissionDate: lodash.get(modelnamepsace, 'claimProcessData.submissionDate'),
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveClaimant',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { claimant } = props;

      return formUtils.mapObjectToFields(claimant);
    },
  })(Claimant)
);
