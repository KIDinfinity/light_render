import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Card, Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import { AssessmentResultLayout } from '../FormLayout.json';
import styles from './AssessmentResult.less';

const FORMID = 'claimDecision';

@connect(
  ({
    dictionaryController,
    PHCLMOfClaimAssessmentController,
    formCommonController,
    claimEditable,
  }: any) => ({
    dictsOfClaimDecision: dictionaryController.Dropdown_CLM_PHClaimDecision,
    claimDecision: lodash.get(PHCLMOfClaimAssessmentController, 'claimProcessData.claimDecision'),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating }: any = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'PHCLMOfClaimAssessmentController/saveEntry',
            target: 'saveClaimDecision',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfClaimAssessmentController/saveFormData',
          target: 'saveClaimDecision',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { claimDecision }: any = props;

    return formUtils.mapObjectToFields(claimDecision, {
      claimPayableAmount: (value: any) => value,
      totalPayableAmount: (value: any) => value,
      assessmentDecision: (value: any) => value,
    });
  },
})
class AssessmentResult extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form }: any = this.props;
    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form }: any = this.props;
    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  render() {
    const { form, dictsOfClaimDecision, taskNotEditable }: any = this.props;

    return (
      <div className={styles.result}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.title.claim-result',
          })}
        >
          <Form layout="vertical">
            <FormLayout json={AssessmentResultLayout}>
              <FormItemNumber
                form={form}
                disabled
                formName="claimPayableAmount"
                labelId="app.navigator.task-detail-of-claim-assessment.label.claim-payment-amount"
              />
              <FormItemNumber
                form={form}
                disabled
                formName="totalPayableAmount"
                labelId="app.navigator.task-detail-of-claim-assessment.label.total-payment-amount"
              />
              <FormItemSelect
                form={form}
                disabled={taskNotEditable}
                required
                formName="assessmentDecision"
                labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-decision"
                dicts={dictsOfClaimDecision}
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default AssessmentResult;
