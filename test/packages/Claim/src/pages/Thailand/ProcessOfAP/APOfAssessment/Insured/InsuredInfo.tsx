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

@connect(
  ({
    dictionaryController,
    loading,
    apOfClaimAssessmentController,
    formCommonController,
  }: any) => ({
    dictsOfGender: dictionaryController.Gender,
    dictsOfIdentityType: dictionaryController.IdentityType,
    loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    insured: lodash.get(apOfClaimAssessmentController, 'claimProcessData.insured') || {},
    validating: formCommonController.validating,
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
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'apOfClaimAssessmentController/saveEntry',
            target: 'saveInsured',
            payload: {
              changedFields: finalChangedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'apOfClaimAssessmentController/saveFormData',
          target: 'saveInsured',
          payload: {
            changedFields: finalChangedFields,
          },
        });
      }
    }
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
                disabled
                formName="firstName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.first-name"
              />
              <FormItemInput
                form={form}
                disabled
                formName="middleName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.middle-name"
              />
              <FormItemInput
                form={form}
                disabled
                required
                formName="surname"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.surname"
              />
              <FormItemSelect
                form={form}
                disabled
                formName="gender"
                labelId="app.usermanagement.basicInfo.label.gender"
                dicts={dictsOfGender}
                loading={loadingOfFindDictionary}
              />
              <FormItemSelect
                form={form}
                disabled
                required
                formName="identityType"
                labelId="app.usermanagement.basicInfo.label.id-entity-type"
                dicts={dictsOfIdentityType}
                loading={loadingOfFindDictionary}
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
              <FormItemInput
                form={form}
                disabled
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
