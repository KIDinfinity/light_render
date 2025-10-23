import React from 'react';
import { Form, Icon } from 'antd';
import lodash from 'lodash';
import { formUtils, FormLayoutContext } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import { connect, useSelector, useDispatch } from 'dva';
import { ReactComponent as portraitTitleSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentTitlePortrait.svg';
import { ReactComponent as portraitSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentPortrait.svg';
import SearchInsuredModal from './Search/SearchInsuredModal';
import Section, { Fields } from './Section';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './Insured.less';

const getName = (user) =>
  lodash
    .compact([user?.firstName, user?.middleName, user?.surname].map(formUtils.queryValue))
    .join(' ');

const Insured = ({ form, insured }: any) => {
  const editable = !useSelector(
    (state: any) =>
      state.claimEditable.taskNotEditable ||
      state[NAMESPACE]?.claimProcessData?.submissionChannel === 'Omne'
  );

  const dispatch = useDispatch();

  const showModel = () => {
    dispatch({
      type: `${NAMESPACE}/updateShowSearchModal`,
      payload: {
        showSearchModel: true,
      },
    });
  };

  return (
    <div className={styles.insured}>
      <FormLayoutContext.ExpandProvider>
        <div className={styles.titleRow}>
          <Icon component={portraitTitleSvg} />
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.insured-information',
          })}
          {/* <Icon type="search" onClick={showModel} /> */}
          <div className={styles.gap} />
          <FormLayoutContext.ExpandIcon className={styles.icon} />
        </div>
        <div className={styles.innerCard}>
          <div className={styles.innerTitleRow}>
            {insured?.gender === 'F' ? 'Mrs. ' : 'Mr. '}
            {getName(insured)}
            <div className={styles.gap} />
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
          <Section form={form} editable={editable}>
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
            <Fields.SurName />
          </Section>
        </div>
      </FormLayoutContext.ExpandProvider>
      <SearchInsuredModal editable={editable} />
    </div>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamespace, processTask }: any) => ({
    validating: formCommonController.validating,
    insured: modelnamespace.claimProcessData?.insured,
    taskDetail: processTask.getTask,
    submissionDate: modelnamespace.claimProcessData?.submissionDate,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveInsured',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveInsured',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { insured }: any = props;

      return formUtils.mapObjectToFields(insured);
    },
  })(Insured)
);
