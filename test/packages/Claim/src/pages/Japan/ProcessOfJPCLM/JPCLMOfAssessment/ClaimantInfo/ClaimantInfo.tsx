import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Form } from 'antd';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import json from '../FormLayout.json';
import styles from './ClaimantInfo.less';
import { VLD_000080 } from '@/utils/validations';

const formId = uuidv4();

@connect(
  ({
    dictionaryController,
    JPCLMOfClaimAssessmentController,
    formCommonController,
    claimEditable,
  }) => ({
    dictsOfClaimantType: dictionaryController.ClaimantType,
    dictsOfRelationship: dictionaryController.Relationship,
    claimant: lodash.get(JPCLMOfClaimAssessmentController, 'claimProcessData.claimant'),
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
            target: 'saveClaimant',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
          target: 'saveClaimant',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { claimant } = props;

    return formUtils.mapObjectToFields(claimant, {
      dateOfBirth: (value) => (value ? moment(value) : null),
      dateTimeOfDeath: (value) => (value ? moment(value) : null),
    });
  },
})
class ClaimantInfo extends PureComponent {
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
          formId,
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
          formId,
        },
      });
    });
  };

  render() {
    const { form, dictsOfClaimantType, dictsOfRelationship, taskNotEditable } = this.props;
    const claimantIsInsured = form.getFieldValue('claimant') === '02';
    const VLD000080 = VLD_000080(form);

    return (
      <div className={styles.claimant}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim:
              'app.navigator.task-detail-of-claim-assessment.title.claimant-information',
          })}
        >
          <Form layout="vertical">
            <FormLayout json={json}>
              <FormItemSelect
                form={form}
                disabled={taskNotEditable}
                required
                formName="claimant"
                labelId="app.navigator.task-detail-of-data-capture.label.claimant"
                dicts={dictsOfClaimantType}
              />
              <FormItemSelect
                form={form}
                disabled={taskNotEditable || !VLD000080}
                required={VLD000080}
                formName="relationshipWithInsured"
                labelId="app.navigator.task-detail-of-data-capture.label.relationship-with-insured"
                dicts={dictsOfRelationship}
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable || claimantIsInsured}
                formName="firstName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.first-name"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default ClaimantInfo;
