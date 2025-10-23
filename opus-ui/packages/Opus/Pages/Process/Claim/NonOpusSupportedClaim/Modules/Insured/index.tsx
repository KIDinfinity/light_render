import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';

import { Form, Icon } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as portraitTitleSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentTitlePortrait.svg';
import { ReactComponent as portraitSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentPortrait.svg';
import { formUtils, FormLayoutContext } from 'basic/components/Form';
import Section, { Fields } from './Section';
import TaskDefKey from 'basic/enum/TaskDefKey';
import styles from './Insured.less';

const getName = (user) =>
  lodash
    .compact([user?.firstName, user?.middleName, user?.surname].map(formUtils.queryValue))
    .join(' ');

const Insured = ({ form, insured, taskDetail }: any) => {
  const editable = useSelector(
    ({ claimEditable }: any) =>
      !claimEditable.taskNotEditable && taskDetail?.taskDefKey !== TaskDefKey.JP_CLM_ACT003
  );

  return (
    <div className={styles.insured}>
      <FormLayoutContext.ExpandProvider>
        <div className={styles.titleRow}>
          <Icon component={portraitTitleSvg} />
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.insured-information',
          })}
          <div className={styles.gap} />
          <FormLayoutContext.ExpandIcon className={styles.icon} />
        </div>
        <div className={styles.innerCard}>
          <div className={styles.innerTitleRow}>
            {insured?.gender === 'F' ? 'Mrs. ' : 'Mr. '}
            {getName(insured)}
            {insured?.customerRole?.split(',').map(
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
          <Section form={form} editable={editable} section="Insured">
            <Fields.Address />
            <Fields.DateOfBirth />
            <Fields.DateTimeOfDeath />
            <Fields.Email />
            <Fields.Age />
            <Fields.FirstName />
            <Fields.Gender />
            <Fields.InsuredId />
            <Fields.Occupation />
            <Fields.PhoneNo />
            <Fields.PolicyId />
            <Fields.PostCode />
            <Fields.Surname />
          </Section>
        </div>
      </FormLayoutContext.ExpandProvider>
      {/* <SearchInsuredModal editable={editable} /> */}
    </div>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  insured: lodash.get(modelnamepsace, 'businessData.insured'),
  submissionDate: lodash.get(modelnamepsace, 'businessData.submissionDate'),
  taskDetail: lodash.get(modelnamepsace, 'taskDetail'),
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveInsured',
          payload: {
            changedFields,
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
