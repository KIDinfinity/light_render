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
  validating: any;
}

@connect(
  ({
    dictionaryController,
    bpOfDataCaptureController,
    formCommonController,
    claimEditable,
  }: any) => ({
    dictsOfGender: dictionaryController.Gender,
    dictsOfOccupation: dictionaryController.Occupation,
    dictsOfIdentityType: dictionaryController.IdentityType,
    dictsOfCurrentState: dictionaryController.InsuredState,
    nationalityDropdown: lodash.get(dictionaryController, 'nationalityDropdown.list'),
    occupationDropdown: lodash.get(dictionaryController, 'occupationDropdown.list'),
    insured: lodash.get(bpOfDataCaptureController, 'claimProcessData.insured'),
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

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'bpOfDataCaptureController/saveEntry',
            target: 'saveInsured',
            payload: {
              changedFields: finalChangedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'bpOfDataCaptureController/saveFormData',
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
      dictsOfCurrentState,
      taskNotEditable,
    } = this.props;
    const dateTimeOfDeathRequired = form.getFieldValue('currentState') === 'D';

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
                disabled={taskNotEditable}
                required
                formName="firstName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.first-name"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                required
                formName="surname"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.surname"
              />
              <FormItemSelect
                form={form}
                disabled={taskNotEditable}
                required
                formName="gender"
                labelId="app.usermanagement.basicInfo.label.gender"
                dicts={dictsOfGender}
              />
              <FormItemSelect
                form={form}
                disabled={taskNotEditable}
                required
                formName="identityType"
                labelId="app.usermanagement.basicInfo.label.id-entity-type"
                dicts={dictsOfIdentityType}
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                required
                formName="identityNo"
                maxLength={20}
                labelId="app.navigator.task-detail-of-data-capture.label.identity-no"
              />
              <FormItemDatePicker
                form={form}
                disabled={taskNotEditable}
                required
                formName="dateOfBirth"
                labelId="app.navigator.task-detail-of-data-capture.label.date-of-birth"
                format="L"
              />
              <FormItemSelect
                form={form}
                disabled={taskNotEditable}
                formName="nationality"
                labelId="app.navigator.task-detail-of-data-capture.label.nationality"
                dicts={nationalityDropdown}
                dictCode="nationalityCode"
                dictName="nationalityName"
              />
              <FormItemSelect
                form={form}
                disabled={taskNotEditable}
                formName="occupation"
                labelId="app.usermanagement.basicInfo.label.occupation"
                dicts={occupationDropdown}
                dictCode="occupationCode"
                dictName="occupationName"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
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
                disabled={taskNotEditable}
                formName="phoneNo"
                maxLength={20}
                labelId="app.usermanagement.basicInfo.label.phone-no"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                formName="address"
                maxLength={240}
                labelId="app.navigator.task-detail-of-data-capture.label.address"
                name="address"
              />
              <FormItemSelect
                form={form}
                disabled={taskNotEditable}
                required
                formName="currentState"
                labelId="app.navigator.task-detail-of-data-capture.label.current-state"
                dicts={dictsOfCurrentState}
              />
              <FormItemDatePicker
                form={form}
                disabled={taskNotEditable || !dateTimeOfDeathRequired}
                required={dateTimeOfDeathRequired}
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
