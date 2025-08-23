import React, { PureComponent } from 'react';
import { Card, Form } from 'antd';
import type { FormComponentProps } from 'antd/es/form';

import { connect } from 'dva';
import type { Dispatch } from 'redux';

import lodash from 'lodash';
import moment from 'moment';

import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';

import type { IDictionary, INationality } from '@/dtos/dicts';
import type { IInsured } from '@/dtos/claim';
import { insuredLayout } from '../FormLayout.json';
import styles from './InsuredInfo.less';

const FORMID = 'insured';

interface IProps {
  dispatch?: Dispatch<any>;
  insured?: IInsured;
  form?: any;
  dictsOfGender?: IDictionary[];
  occupationDropdown?: IDictionary[];
  dictsOfIdentityType?: IDictionary[];
  nationalityDropdown?: INationality[];
  dictsOfCurrentState?: IDictionary[];
}

interface IFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  insured?: IInsured;
}

@connect(
  ({ dictionaryController, PHCLMOfClaimAssessmentController, formCommonController }: any) => ({
    dictsOfGender: dictionaryController.Gender,
    dictsOfOccupation: dictionaryController.Occupation,
    dictsOfIdentityType: dictionaryController.IdentityType,
    dictsOfCurrentState: dictionaryController.InsuredState,
    nationalityDropdown: lodash.get(dictionaryController, 'nationalityDropdown.list'),
    occupationDropdown: lodash.get(dictionaryController, 'occupationDropdown.list'),
    insured: lodash.get(PHCLMOfClaimAssessmentController, 'claimProcessData.insured'),
    validating: formCommonController.validating,
  })
)
// @ts-ignore
@Form.create<IFormProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating }: any = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'PHCLMOfClaimAssessmentController/saveEntry',
            target: 'saveInsured',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfClaimAssessmentController/saveFormData',
          target: 'saveInsured',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { insured } = props;
    return formUtils.mapObjectToFields(insured, {
      policyId: (value: string | object) => value,
      insuredId: (value: string | object) => value,
      firstName: (value: string | object) => value,
      surname: (value: string | object) => value,
      gender: (value: string | object) => value,
      identityType: (value: string | object) => value,
      identityNo: (value: string | object) => value,
      dateOfBirth: (value: string | object) => (value ? moment(value) : null),
      nationality: (value: string | object) => value,
      email: (value: string | object) => value,
      phoneNo: (value: string | object) => value,
      address: (value: string | object) => value,
      currentState: (value: string | object) => value,
      occupation: (value: string | object) => value,
      presentAge: (value: string | object) => value,
      issueAge: (value: string | object) => value,
      middleName: (value: string | object) => value,
      extName: (value: string | object) => value,
      companyRepresentative: (value: string | object) => value,
      companyAddress: (value: string | object) => value,
      position: (value: string | object) => value,
    });
  },
})
class InsuredInfo extends PureComponent<IProps> {
  // componentDidMount = () => {
  //   this.registeForm();
  // };

  // componentWillUnmount = () => {
  //   this.unRegisterForm();
  // };

  registeForm = () => {
    const { dispatch, form } = this.props;

    (dispatch as Dispatch)({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    (dispatch as Dispatch)({
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
      dictsOfCurrentState,
    } = this.props;

    return (
      <div className={styles.insured}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.insured-information',
          })}
        >
          <Form layout="vertical">
            <FormLayout json={insuredLayout}>
              <FormItemInput
                form={form}
                required
                disabled
                formName="policyId"
                labelId="PolicyNo"
                labelTypeCode="Label_BIZ_Policy"
              />
              <FormItemInput
                form={form}
                disabled
                formName="insuredId"
                maxLength={30}
                labelId={formatMessageApi({ Label_BIZ_Individual: 'ClientID' })}
              />
              <FormItemInput
                form={form}
                disabled
                required
                formName="firstName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.first-name"
              />
              <FormItemInput
                form={form}
                disabled
                formName="middleName"
                maxLength={30}
                labelId="MiddleName"
              />
              <FormItemInput
                form={form}
                disabled
                required
                formName="surname"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.surname"
              />
              <FormItemInput
                form={form}
                disabled
                formName="extName"
                maxLength={30}
                labelId="ExtName"
                labelTypeCode="Label_BIZ_Individual"
              />
              <FormItemSelect
                form={form}
                disabled
                required
                formName="gender"
                labelId="app.usermanagement.basicInfo.label.gender"
                dicts={dictsOfGender}
              />
              <FormItemSelect
                form={form}
                disabled
                required
                formName="identityType"
                labelId="app.usermanagement.basicInfo.label.id-entity-type"
                dicts={dictsOfIdentityType}
              />
              <FormItemInput
                form={form}
                disabled
                required
                formName="identityNo"
                maxLength={20}
                labelId="app.navigator.task-detail-of-data-capture.label.identity-no"
              />
              <FormItemDatePicker
                form={form}
                disabled
                required
                formName="dateOfBirth"
                labelId="app.navigator.task-detail-of-data-capture.label.date-of-birth"
                format="L"
              />
              <FormItemSelect
                form={form}
                disabled
                formName="nationality"
                labelId="app.navigator.task-detail-of-data-capture.label.nationality"
                dicts={nationalityDropdown}
                dictCode="nationalityCode"
                dictName="nationalityName"
              />
              <FormItemSelect
                form={form}
                disabled
                formName="occupation"
                labelId="app.usermanagement.basicInfo.label.occupation"
                dicts={occupationDropdown}
                dictCode="occupationCode"
                dictName="occupationName"
              />
              <FormItemInput
                form={form}
                disabled
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
                disabled
                formName="phoneNo"
                maxLength={20}
                labelId="app.usermanagement.basicInfo.label.phone-no"
              />
              <FormItemInput
                form={form}
                disabled
                formName="address"
                maxLength={240}
                labelId="app.navigator.task-detail-of-data-capture.label.address"
                name="address"
              />
              <FormItemInput
                form={form}
                disabled
                required
                formName="issueAge"
                labelId="IssueAge"
                labelTypeCode="Label_BIZ_Individual"
              />
              <FormItemInput
                form={form}
                disabled
                required
                formName="presentAge"
                labelId="PresentAge"
                labelTypeCode="Label_BIZ_Individual"
              />
              <FormItemSelect
                form={form}
                disabled
                required
                formName="currentState"
                labelId="app.navigator.task-detail-of-data-capture.label.current-state"
                dicts={dictsOfCurrentState}
              />
              <FormItemInput
                form={form}
                disabled
                formName="companyRepresentative"
                labelId="CompanyRepresentative"
                labelTypeCode="Label_BIZ_Policy"
              />
              <FormItemInput
                form={form}
                disabled
                formName="companyAddress"
                labelId="CompanyAddress"
                labelTypeCode="Label_BIZ_Policy"
              />
              <FormItemInput
                form={form}
                disabled
                formName="position"
                labelId="Position"
                labelTypeCode="Label_BIZ_Policy"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default InsuredInfo;
