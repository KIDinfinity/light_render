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
  taskNotEditable: any;
}

interface IFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  insured?: IInsured;
  validating: any;
}

// @ts-ignore
@connect(
  ({ dictionaryController, JPCLMProcessCreate, formCommonController, claimEditable }: any) => ({
    dictsOfGender: dictionaryController.Gender,
    dictsOfOccupation: dictionaryController.Occupation,
    dictsOfIdentityType: dictionaryController.IdentityType,
    dictsOfCurrentState: dictionaryController.InsuredState,
    nationalityDropdown: lodash.get(dictionaryController, 'nationalityDropdown.list'),
    occupationDropdown: lodash.get(dictionaryController, 'occupationDropdown.list'),
    insured: lodash.get(JPCLMProcessCreate, 'claimProcessData.insured'),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create<IFormProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;

    let finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['dateOfBirth']);
    finalChangedFields = formUtils.onFieldsChangeOfDateOrgin(finalChangedFields, [
      'dateTimeOfDeath',
    ]);
    if (!formUtils.shouldUpdateState(changedFields)) return;
    dispatch({
      type: 'JPCLMProcessCreate/saveInsured',
      payload: {
        finalChangedFields,
      },
    });
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
      occupation: (value: string | object) => value,
      dateTimeOfDeath: (value: string | object) => (value ? moment(value) : null),
    });
  },
})
class InsuredInfo extends PureComponent<IProps> {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

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
                formName="policyId"
                labelId="PolicyNo"
                labelTypeCode="Label_BIZ_Policy"
              />
              <FormItemInput
                form={form}
                required
                formName="insuredId"
                labelId="ClientID"
                labelTypeCode="Label_BIZ_Individual"
              />
              <FormItemInput
                form={form}
                required
                formName="firstName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.first-name"
              />
              <FormItemInput
                form={form}
                required
                formName="surname"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.surname"
              />
              <FormItemSelect
                form={form}
                required
                formName="gender"
                labelId="app.usermanagement.basicInfo.label.gender"
                dicts={dictsOfGender}
              />
              <FormItemSelect
                form={form}
                required
                formName="identityType"
                labelId="app.usermanagement.basicInfo.label.id-entity-type"
                dicts={dictsOfIdentityType}
              />
              <FormItemInput
                form={form}
                required
                formName="identityNo"
                maxLength={20}
                labelId="app.navigator.task-detail-of-data-capture.label.identity-no"
              />
              <FormItemDatePicker
                form={form}
                required
                formName="dateOfBirth"
                labelId="app.navigator.task-detail-of-data-capture.label.date-of-birth"
                format="L"
              />
              <FormItemSelect
                form={form}
                formName="nationality"
                labelId="app.navigator.task-detail-of-data-capture.label.nationality"
                dicts={nationalityDropdown}
                dictCode="nationalityCode"
                dictName="nationalityName"
              />
              <FormItemSelect
                form={form}
                formName="occupation"
                labelId="app.usermanagement.basicInfo.label.occupation"
                dicts={occupationDropdown}
                dictCode="occupationCode"
                dictName="occupationName"
              />
              <FormItemInput
                form={form}
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
                formName="phoneNo"
                maxLength={20}
                labelId="app.usermanagement.basicInfo.label.phone-no"
              />
              <FormItemInput
                form={form}
                formName="address"
                maxLength={240}
                labelId="app.navigator.task-detail-of-data-capture.label.address"
                name="address"
              />
              <FormItemDatePicker
                form={form}
                formName="dateTimeOfDeath"
                labelId="app.navigator.task-detail-of-data-capture.label.datetime-of-death"
                showTime
                format="L LTS"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default InsuredInfo;
