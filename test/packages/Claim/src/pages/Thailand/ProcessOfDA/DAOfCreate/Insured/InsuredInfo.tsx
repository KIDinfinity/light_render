import React, { Component } from 'react';
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
import { VLD_000425 } from 'claim/pages/validators/fieldValidators';
import { insuredLayout } from '../FormLayout.json';
import styles from './InsuredInfo.less';

const FORMID = 'insured';

interface IProps {
  dispatch?: Dispatch<any>;
  insured?: IInsured;
  form?: any;
  loadingOfFindDictionary?: boolean;
  dictsOfGender?: IDictionary[];
  occupationDropdown?: IDictionary[];
  dictsOfIdentityType?: IDictionary[];
  nationalityDropdown?: INationality[];
  dictsOfCurrentState?: IDictionary[];
}

interface IFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  insured?: IInsured;
  validating: boolean;
}

@connect(({ dictionaryController, loading, daProcessController, formCommonController }: any) => ({
  dictsOfGender: dictionaryController.Gender,
  dictsOfIdentityType: dictionaryController.IdentityType,
  loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
  insured: lodash.get(daProcessController, 'claimProcessData.insured'),
  validating: formCommonController.validating,
}))
// @ts-ignore
@Form.create<IFormProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;
    if (!formUtils.shouldUpdateState(changedFields)) return;
    let finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['dateOfBirth']);
    finalChangedFields = formUtils.onFieldsChangeOfDateOrgin(finalChangedFields, [
      'dateTimeOfDeath',
    ]);

    dispatch({
      type: 'daProcessController/saveInsured',
      payload: {
        changedFields: finalChangedFields,
      },
    });
  },
  mapPropsToFields(props) {
    const { insured } = props;
    return formUtils.mapObjectToFields(insured, {
      firstName: (value: string | object) => value,
      middleName: (value: string | object) => value,
      surname: (value: string | object) => value,
      gender: (value: string | object) => value,
      identityType: (value: string | object) => value,
      identityNo: (value: string | object) => value,
      dateOfBirth: (value: string | object) => (value ? moment(value) : null),
      age: (value: string | object) => value,
    });
  },
})
class InsuredInfo extends Component<IProps> {
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
    const { form, loadingOfFindDictionary, dictsOfGender, dictsOfIdentityType } = this.props;

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
                formName="firstName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.first-name"
              />
              <FormItemInput
                form={form}
                formName="middleName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.middle-name"
              />
              <FormItemInput
                form={form}
                formName="surname"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.surname"
              />
              <FormItemSelect
                form={form}
                formName="gender"
                labelId="app.usermanagement.basicInfo.label.gender"
                dicts={dictsOfGender}
                loading={loadingOfFindDictionary}
              />
              <FormItemSelect
                form={form}
                formName="identityType"
                labelId="app.usermanagement.basicInfo.label.id-entity-type"
                dicts={dictsOfIdentityType}
                loading={loadingOfFindDictionary}
              />
              <FormItemInput
                form={form}
                formName="identityNo"
                rules={[VLD_000425]}
                maxLength={20}
                labelId="app.navigator.task-detail-of-data-capture.label.identity-no"
              />
              <FormItemDatePicker
                form={form}
                formName="dateOfBirth"
                labelId="app.navigator.task-detail-of-data-capture.label.date-of-birth"
                format="L"
              />
              <FormItemInput
                form={form}
                formName="age"
                maxLength={200}
                labelId="app.usermanagement.basicInfo.label.age"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default InsuredInfo;
