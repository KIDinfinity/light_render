import React from 'react';
import { Form, Icon } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as portraitTitleSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentTitlePortrait.svg';
import { ReactComponent as portraitSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentPortrait.svg';
import { NAMESPACE } from '../activity.config';
import Section, { Fields } from './Section';
import styles from './Claimant.less';
import lodash from 'lodash';

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
          <div className={styles.gap} />
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
        <Section form={form} editable={editable}>
          <Fields.RelationshipWithInsured />
          <Fields.Address />
          <Fields.DateOfBirth />
          <Fields.Email />
          <Fields.FirstName />
          <Fields.Gender />
          <Fields.PhoneNo />
          <Fields.PostCode />
          <Fields.Surname />
          <Fields.Age />
          <Fields.SMS />
          <Fields.AgencyDisclosureFlag />
        </Section>
      </div>
    </div>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamespace, processTask }: any) => ({
    validating: formCommonController.validating,
    claimant: modelnamespace.claimProcessData?.claimant,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, taskDetail } = props;
      // @ts-ignore
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['dateOfBirth']);

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'claimantUpdate',
              payload: {
                changedFields: finalChangedFields,
                taskDetail,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'claimantUpdate',
            payload: {
              changedFields: finalChangedFields,
              taskDetail,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { claimant } = props;

      return formUtils.mapObjectToFields(claimant);
    },
  })(Claimant)
);
