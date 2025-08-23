import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import{ v4 as  uuidv4 } from 'uuid';
import type { FormComponentProps } from 'antd/lib/form';
import { Card, Form } from 'antd';
import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemInput, FormItemSelect, formUtils } from 'basic/components/Form';
import type { IDictionary } from '@/dtos/dicts';
import {
  VLD_000010,
  VLD_000202,
  VLD_000182,
} from 'claim/pages/validators/fieldValidators';

import { claimResult } from '../FormLayout.json';
import styles from './AssessmentResult.less';

const FORMID = `${uuidv4()}-claimDecision`;

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  dictsOfAssessmentDecision: IDictionary[];
  loadingOfAssessmentDecision: boolean;
  claimDecision: any;
  incidentDecisionListMap: any;
  validating: boolean;
  taskNotEditable: boolean;
  caseCategory: string;
}

@connect(
  ({
    dictionaryController,
    loading,
    apOfClaimAssessmentController,
    formCommonController,
    claimEditable,
  }: any) => ({
    dictsOfAssessmentDecision: dictionaryController.AssessmentDecision,
    loadingOfAssessmentDecision: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    caseCategory: lodash.get(apOfClaimAssessmentController, 'claimProcessData.caseCategory'),
    claimDecision:
      lodash.get(apOfClaimAssessmentController.claimProcessData, 'claimDecision') || {},
    incidentDecisionListMap:
      lodash.get(apOfClaimAssessmentController.claimEntities, 'incidentDecisionListMap') || {},
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'apOfClaimAssessmentController/saveEntry',
            target: 'saveClaimDecision',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'apOfClaimAssessmentController/saveFormData',
          target: 'saveClaimDecision',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { claimDecision } = props;
    return formUtils.mapObjectToFields(claimDecision, {
      assessmentDecision: (value: any) => value,
      assessmentRemark: (value: any) => value,
    });
  },
})
class AssessmentResult extends Component<IProps> {
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
      dictsOfAssessmentDecision,
      loadingOfAssessmentDecision,
      incidentDecisionListMap,
      taskNotEditable,
      validating,
    } = this.props;
    return (
      <div className={styles.result}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.title.claim-result',
          })}
        >
          <Form layout="vertical">
            <FormLayout json={claimResult}>
              <FormItemSelect
                form={form}
                disabled={taskNotEditable}
                required
                formName="assessmentDecision"
                labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-decision"
                dicts={dictsOfAssessmentDecision}
                loading={loadingOfAssessmentDecision}
                rules={[
                  {
                    validator: VLD_000010(incidentDecisionListMap, 'decision'),
                  },
                  {
                    validator: VLD_000182(validating, incidentDecisionListMap, 'decision'),
                  },
                  {
                    validator: VLD_000202(),
                  },
                ]}
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                cusTitle
                maxLength={240}
                formName="assessmentRemark"
                labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
                name="remark"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default AssessmentResult;
