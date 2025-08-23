import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Card, Form } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormLayout from 'basic/components/Form/FormLayout';
import SectionTitle from 'claim/components/SectionTitle';
import { FormItemNumber, formUtils } from 'basic/components/Form';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import {
  VLD_000010HKApproveAndExGratia,
  // VLD_000400,
  // VLD_000401,
  VLD_000202,
  VLD_000182HK,
  // VLD_000283HK,
} from 'claim/pages/validators/fieldValidators';
import { handleWarnMessageModal } from '@/utils/commonMessage.tsx';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { AssessmentResultLayout } from '../FormLayout.json';
import styles from './AssessmentResult.less';
import { calPayoutAmount } from 'process/JPCLM/Functions';

const FORMID = 'claimDecision';

@connect(
  ({ dictionaryController, JPCLMOfClaimAssessment, formCommonController, claimEditable }: any) => ({
    dictsOfClaimDecision: dictionaryController.Dropdown_CLM_AssessmentDecision,
    claimDecision: lodash.get(JPCLMOfClaimAssessment, 'claimProcessData.claimDecision'),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    claimProcessData: JPCLMOfClaimAssessment.claimProcessData,
    claimEntities: JPCLMOfClaimAssessment?.claimEntities || {},
    exchangeRateList: JPCLMOfClaimAssessment?.exchangeRateList,
    incidentDecisionListMap:
      lodash.get(JPCLMOfClaimAssessment.claimEntities, 'claimPayableListMap') || {},
    listPolicy: JPCLMOfClaimAssessment.listPolicy,
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
            type: 'JPCLMOfClaimAssessment/saveEntry',
            target: 'saveClaimDecision',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessment/saveFormData',
          target: 'saveClaimDecision',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { claimDecision, claimEntities }: any = props;

    return formUtils.mapObjectToFields(
      {
        ...claimDecision,
        rateRecord: claimDecision?.exchangeRateRecord,
        payoutAmount: calPayoutAmount(claimEntities?.incidentListMap),
      },
      {
        totalPayableAmount: (value: any) => value,
        assessmentDecision: (value: any) => value,
        payoutAmount: (value: any) => value,
      }
    );
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

  changePayoutCurrency = async (selectCurrency: object) => {
    const { dispatch } = this.props;
    const payoutCurrency = selectCurrency.currencyCode;
    await dispatch({
      type: 'JPCLMOfClaimAssessment/saveClaimDecision',
      payload: {
        changedFields: { payoutCurrency },
      },
    });
    this.refreshRate();
  };

  refreshRate = async () => {
    const { dispatch, taskNotEditable }: any = this.props;

    if (taskNotEditable) return;
    await dispatch({
      type: 'JPCLMOfClaimAssessment/getExchangeRateForPolicy',
      payload: {},
    });
  };

  handleCancel = (value: any) => {
    const { dispatch }: any = this.props;
    if (value === ClaimDecision.deny) {
      handleWarnMessageModal(
        [
          {
            content: formatMessageApi({
              Label_COM_WarningMessage: 'MSG_000422',
            }),
          },
        ],
        {
          okFn: () => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/hideDecisionModalok',
            });
            dispatch({
              type: 'JPCLMOfClaimAssessment/hideDecisionModal',
            });
          },
          cancelFn: () => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/updateAssessDecision',
            });
            dispatch({
              type: 'JPCLMOfClaimAssessment/hideDecisionModal',
            });
          },
        }
      );
    }
  };

  render() {
    const {
      form,
      validating,
      dictsOfClaimDecision,
      taskNotEditable,
      // claimProcessData,
      incidentDecisionListMap,
    }: // listPolicy,
    any = this.props;
    // const payoutCurrency = claimDecision?.payoutCurrency;

    return (
      <>
        <SectionTitle
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
          })}
        />
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
                  formName="totalPayableAmount"
                  labelId="TotalPayoutAmount"
                  hiddenPrefix
                  precision={0}
                  pattern={
                    /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
                  }
                  min={Number.MIN_SAFE_INTEGER}
                />
                <FormItemNumber
                  form={form}
                  disabled={taskNotEditable}
                  formName="payoutAmount"
                  labelId="PolicyPayoutAmount"
                />
                <FormItemSelect
                  form={form}
                  disabled={taskNotEditable}
                  required
                  formName="assessmentDecision"
                  labelId="AssessmentDecision"
                  dicts={dictsOfClaimDecision}
                  onChange={this.handleCancel}
                  rules={[
                    {
                      // validator: VLD_000283HK(claimDecision, 'claim'),
                    },
                    {
                      validator: VLD_000010HKApproveAndExGratia(incidentDecisionListMap),
                    },
                    // {
                    //   validator: VLD_000401(incidentDecisionListMap),
                    // },
                    // {
                    //   validator: VLD_000400(incidentDecisionListMap),
                    // },
                    {
                      validator: VLD_000182HK(validating, incidentDecisionListMap),
                    },
                    {
                      validator: VLD_000202(),
                    },
                  ]}
                />
              </FormLayout>
            </Form>
          </Card>
        </div>
      </>
    );
  }
}

export default AssessmentResult;
