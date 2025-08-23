import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Card, Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import Compare from 'claim/pages/AppealCase/ManualAssessment/_components/Compare';
import { withContextData } from '@/components/_store';
import { ESectionType } from 'claim/pages/AppealCase/ManualAssessment/_dto/Enums';
import { fnPrecisionFormatNegative } from '@/utils/precisionUtils';
import { eClaimDecision } from 'claim/enum/claimDecision';
import { AssessmentResultLayout } from '../FormLayout.json';
import styles from './AssessmentResult.less';

const FORMID = 'claimDecision';
@withContextData
@connect(
  (
    { dictionaryController, PHCLMOfAppealCaseController, formCommonController, claimEditable }: any,
    { withData: { caseType } }
  ) => ({
    dictsOfClaimDecision: dictionaryController.Dropdown_CLM_PHClaimDecision,
    claimDecision: caseType
      ? lodash.get(PHCLMOfAppealCaseController, `${caseType}.claimProcessData.claimDecision`)
      : lodash.get(PHCLMOfAppealCaseController, 'claimProcessData.claimDecision'),
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
            type: 'PHCLMOfAppealCaseController/saveEntry',
            target: 'saveClaimDecision',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfAppealCaseController/saveFormData',
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
    const isDeny = claimDecision?.assessmentDecision === eClaimDecision.deny;

    return formUtils.mapObjectToFields(claimDecision, {
      claimPayableAmount: (value: any) => (isDeny ? 0 : value),
      totalPayableAmount: (value: any) => (isDeny ? 0 : value),
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
    const { form, dictsOfClaimDecision, taskNotEditable: notEditable, withData }: any = this.props;
    const { appealNotEditable }: any = withData || {};
    const taskNotEditable = notEditable || appealNotEditable;

    return (
      <Form layout="vertical">
        <FormLayout json={AssessmentResultLayout}>
          <FormItemNumber
            form={form}
            disabled
            min={-Number.MAX_VALUE}
            pattern={
              /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
            }
            formatter={fnPrecisionFormatNegative}
            formName="claimPayableAmount"
            labelId="app.navigator.task-detail-of-claim-assessment.label.claim-payment-amount"
          />
          <FormItemNumber
            form={form}
            disabled
            min={-Number.MAX_VALUE}
            pattern={
              /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
            }
            formatter={fnPrecisionFormatNegative}
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
    );
  }
}

export default class AssessmentResultCompare extends PureComponent {
  state = {
    expandedAssessmentResult: false,
  };

  handleBtnClick = (open: boolean) => {
    this.setState((preState: any) => {
      return {
        ...preState,
        expandedAssessmentResult: lodash.isBoolean(open)
          ? open
          : !preState.expandedAssessmentResult,
      };
    });
  };

  render() {
    const { expandedAssessmentResult } = this.state;

    return (
      <Compare
        expandOrigin={expandedAssessmentResult}
        sectionType={ESectionType.AssessmentResult}
        handleBtnClick={this.handleBtnClick}
        horizontal
      >
        <div className={styles.result}>
          <Card
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.title.claim-result',
            })}
          >
            <AssessmentResult />
          </Card>
        </div>
      </Compare>
    );
  }
}
