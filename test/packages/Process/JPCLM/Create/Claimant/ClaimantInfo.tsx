import React, { PureComponent } from 'react';
import { Card, Form } from 'antd';
import type { FormComponentProps } from 'antd/es/form';

import { connect } from 'dva';
import type { Dispatch } from 'redux';

import lodash from 'lodash';
import moment from 'moment';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import { relationshipWithInsuredForHK } from 'claim/enum';

import type { IDictionary, INationality } from '@/dtos/dicts';
import { claimantLayout } from '../FormLayout.json';
import styles from './ClaimantInfo.less';

const FORMID = 'claimant';

interface IProps extends FormComponentProps {
  registeForm: Function;
  unRegisterForm: Function;
  dispatch: Dispatch<any>;
  claimant: any;
  dictsOfGender: IDictionary[];
  occupationDropdown: IDictionary[];
  dictsOfIdentityType: IDictionary[];
  nationalityDropdown: INationality[];
  dictsOfRelationship: IDictionary[];
}
@connect(
  ({ dictionaryController, JPCLMProcessCreate, formCommonController, claimEditable }: any) => ({
    dictsOfGender: dictionaryController.Gender,
    dictsOfOccupation: dictionaryController.findDictionaryByTypeCode_Occupation,
    dictsOfIdentityType: dictionaryController.IdentityType,
    dictsOfRelationship: dictionaryController.Dropdown_POL_RelationshipWithInsured,
    occupationDropdown: lodash.get(dictionaryController, 'occupationDropdown.list'),
    nationalityDropdown: lodash.get(dictionaryController, 'nationalityDropdown.list'),
    claimant: lodash.get(JPCLMProcessCreate, 'claimProcessData.claimant'),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;
    const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['dateOfBirth']);
    if (!formUtils.shouldUpdateState(changedFields)) return;
    dispatch({
      type: 'JPCLMProcessCreate/saveClaimant',
      payload: {
        changedFields: finalChangedFields,
      },
    });
  },
  mapPropsToFields(props) {
    const { claimant } = props;

    return formUtils.mapObjectToFields(claimant, {
      relationshipWithInsured: (value: string | object) => value,
      firstName: (value: string | object) => value,
      surname: (value: string | object) => value,
      gender: (value: string | object) => value,
      identityType: (value: string | object) => value,
      identityNo: (value: string | object) => value,
      dateOfBirth: (value: string | object) => (value ? moment(value) : null),
      nationality: (value: string | object) => value,
      occupation: (value: string | object) => value,
      email: (value: string | object) => value,
      phoneNo: (value: string | object) => value,
      address: (value: string | object) => value,
    });
  },
})
class ClaimantInfo extends PureComponent<IProps> {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  render() {
    const {
      form,
      dictsOfGender,
      dictsOfIdentityType,
      nationalityDropdown,
      occupationDropdown,
      dictsOfRelationship,
    } = this.props;
    const isrelationshipWithInsuredSelf = form.getFieldValue('relationshipWithInsured') === relationshipWithInsuredForHK.self;

    return (
      <div className={styles.claimant}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.claimant-information',
          })}
        >
          <Form layout="vertical">
            <FormLayout json={claimantLayout}>
              <FormItemSelect
                form={form}
                required
                formName="relationshipWithInsured"
                labelId="app.navigator.task-detail-of-data-capture.label.relationship-width-insured"
                dicts={dictsOfRelationship}
                name="relationshipWithInsured"
              />
              <FormItemInput
                form={form}
                disabled={isrelationshipWithInsuredSelf}
                required
                formName="firstName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.first-name"
              />
              <FormItemInput
                form={form}
                disabled={isrelationshipWithInsuredSelf}
                required
                formName="surname"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.surname"
              />
              <FormItemSelect
                form={form}
                disabled={isrelationshipWithInsuredSelf}
                required
                formName="gender"
                labelId="app.usermanagement.basicInfo.label.gender"
                dicts={dictsOfGender}
              />
              <FormItemSelect
                form={form}
                disabled={isrelationshipWithInsuredSelf}
                required
                formName="identityType"
                labelId="app.usermanagement.basicInfo.label.id-entity-type"
                dicts={dictsOfIdentityType}
              />
              <FormItemInput
                form={form}
                disabled={isrelationshipWithInsuredSelf}
                required
                formName="identityNo"
                maxLength={20}
                labelId="app.navigator.task-detail-of-data-capture.label.identity-no"
              />
              <FormItemDatePicker
                form={form}
                disabled={isrelationshipWithInsuredSelf}
                required
                formName="dateOfBirth"
                labelId="app.navigator.task-detail-of-data-capture.label.date-of-birth"
                format="L"
              />
              <FormItemSelect
                form={form}
                disabled={isrelationshipWithInsuredSelf}
                formName="nationality"
                labelId="app.navigator.task-detail-of-data-capture.label.nationality"
                dicts={nationalityDropdown}
                dictCode="nationalityCode"
                dictName="nationalityName"
              />
              <FormItemSelect
                form={form}
                formName="occupation"
                disabled={isrelationshipWithInsuredSelf}
                labelId="app.usermanagement.basicInfo.label.occupation"
                dicts={occupationDropdown}
                dictCode="occupationCode"
                dictName="occupationName"
              />
              <FormItemInput
                form={form}
                disabled={isrelationshipWithInsuredSelf}
                formName="phoneNo"
                maxLength={20}
                labelId="app.usermanagement.basicInfo.label.phone-no"
              />
              <FormItemInput
                form={form}
                disabled={isrelationshipWithInsuredSelf}
                formName="email"
                maxLength={60}
                rules={[
                  {
                    type: 'email',
                    message: 'The email address you supplied is invalid.',
                  },
                ]}
                labelId="app.navigator.task-detail-of-data-capture.label.email"
              />
              <FormItemInput
                form={form}
                disabled={isrelationshipWithInsuredSelf}
                formName="address"
                maxLength={240}
                labelId="app.navigator.task-detail-of-data-capture.label.address"
                name="address"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default ClaimantInfo;
