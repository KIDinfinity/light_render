import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import titleConfig from '../title.config';
import json from '../FormLayout.json';
import styles from './InsuredInfo.less';

const FORMID = 'insured';

@connect(
  ({
    dictionaryController,
    JPCLMOfClaimAssessmentController,
    formCommonController,
    claimEditable,
  }) => ({
    dictsOfGender: dictionaryController.Gender,
    dictsOfOccupation: dictionaryController.Occupation,
    dictsOfCurrentState: dictionaryController.InsuredState,
    insured: lodash.get(JPCLMOfClaimAssessmentController, 'claimProcessData.insured'),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimAssessmentController/saveEntry',
            target: 'saveInsured',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
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
      dateOfBirth: (value) => (value ? moment(value) : null),
      dateTimeOfDeath: (value) => (value ? moment(value) : null),
    });
  },
})
class InsuredInfo extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form } = this.props;

    setTimeout(() => {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: FORMID,
        },
      });
    });
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    setTimeout(() => {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: FORMID,
        },
      });
    });
  };

  render() {
    const { form, dictsOfGender, taskNotEditable, insured } = this.props;
    // const dateTimeOfDeathRequired = form.getFieldValue('currentState') === 'D';
    const insuredId = lodash.get(insured, 'insuredId');
    return (
      <div className={styles.insured}>
        <Card title={titleConfig().insured.title}>
          <Form layout="vertical">
            <FormLayout json={json}>
              <FormItemInput
                form={form}
                disabled={taskNotEditable || !!insuredId}
                required
                formName="firstName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.first-name"
              />
              <FormItemDatePicker
                form={form}
                disabled={taskNotEditable || !!insuredId}
                required
                formName="dateOfBirth"
                labelId="app.navigator.task-detail-of-data-capture.label.date-of-birth"
              />
              <FormItemSelect
                form={form}
                disabled={taskNotEditable || !!insuredId}
                required
                formName="gender"
                labelId="app.usermanagement.basicInfo.label.gender"
                dicts={dictsOfGender}
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable || !!insuredId}
                formName="postCode"
                maxLength={20}
                labelId="app.navigator.task-detail-of-data-capture.label.post-code"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable || !!insuredId}
                formName="phoneNo"
                maxLength={20}
                labelId="app.usermanagement.basicInfo.label.phone-no"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable || !!insuredId}
                required
                formName="address"
                maxLength={240}
                labelId="app.navigator.task-detail-of-data-capture.label.address"
                name="row24"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default InsuredInfo;
