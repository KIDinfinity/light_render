/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/lib/form';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import type { IDictionary } from '@/dtos/dicts';
import { VLD_000202 } from 'claim/pages/validators/fieldValidators';
import type { IPolicy } from '@/dtos/claim';
import FormLayout from 'basic/components/Form/FormLayout';
import CardOfClaim from 'basic/components/Form/FormCard';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import { incidentDecisionLayout } from '../FormLayout.json';

const FORMID = 'IncidentDecisionsItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  dictsOfAssessmentDecision: IDictionary[];
  loadingOfAssessmentDecision: boolean;
  incidentDecisionItem: any;
  incidentDecisionListMap: any;
  incidentDecisionId: string;
  listPolicy: IPolicy[];
  validating: boolean;
}

@connect(
  (
    {
      dictionaryController,
      formCommonController,
      apOfClaimAssessmentController,
      loading,
      claimEditable,
    }: any,
    { incidentDecisionId }: any
  ) => ({
    dictsOfAssessmentDecision: dictionaryController.AssessmentDecision,
    listPolicy: apOfClaimAssessmentController.listPolicy,
    dictsOfDenyReason: dictionaryController.Deny_Reason,
    dictsOfDenyReasonManaulAssessment:
      dictionaryController.findDictionaryByTypeCode_Deny_Reason_ManaulAssessment,
    incidentDecisionItem:
      apOfClaimAssessmentController.claimEntities.incidentDecisionListMap[incidentDecisionId],
    loadingOfPolicy: loading.effects['apOfClaimAssessmentController/queryListPolicy'],
    loadingOfClaimDecision: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    policyBackgrounds: formCommonController.policyBackgrounds,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentDecisionId, listPolicy, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'apOfClaimAssessmentController/saveEntry',
            target: 'saveIncidentDecisionItem',
            payload: {
              changedFields,
              listPolicy,
              incidentDecisionId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'apOfClaimAssessmentController/saveFormData',
          target: 'saveIncidentDecisionItem',
          payload: {
            changedFields,
            listPolicy,
            incidentDecisionId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { incidentDecisionItem } = props;

    return formUtils.mapObjectToFields(incidentDecisionItem, {
      decision: (value: any) => value,
      policyId: (value: any) => value,
      benefitTypeCode: (value: any) => value,
      denyCode: (value: any) => value,
      remark: (value: any) => transRemarkCodeToMsg(value, true),
    });
  },
})
class IncidentDecisionListItem extends Component<IProps> {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, incidentDecisionItem } = this.props;

    if (incidentDecisionItem.id) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID}-${incidentDecisionItem.id}`,
        },
      });
    }
  };

  unRegisterForm = () => {
    const { dispatch, form, incidentDecisionItem } = this.props;

    if (incidentDecisionItem.id) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID}-${incidentDecisionItem.id}`,
        },
      });
    }
  };

  handleDelete = () => {
    const { incidentDecisionId, dispatch } = this.props;
    dispatch({
      type: 'apOfClaimAssessmentController/removeIncidentDecisionItem',
      payload: {
        incidentDecisionId,
      },
    });
  };

  getPolicyList = () => {
    const { listPolicy } = this.props;
    return lodash.uniqBy(listPolicy, 'policyNo');
  };

  getProductList = () => {
    const { listPolicy, form } = this.props;
    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyId')];

    return lodash.uniqBy(filteredList, 'benefitTypeCode');
  };

  getExistCodes = () => {
    const { curincidentDecisionList, form } = this.props;
    const policyId = form.getFieldValue('policyId');
    const existCodes = lodash.map(curincidentDecisionList, (item) => {
      if (item.policyId === policyId) return item.benefitTypeCode;
    });
    return existCodes;
  };

  render() {
    const {
      policyBackgrounds = {},
      form,
      loadingOfPolicy,
      dictsOfAssessmentDecision,
      dictsOfDenyReason,
      dictsOfDenyReasonManaulAssessment,
      loadingOfClaimDecision,
      taskNotEditable,
      incidentDecisionItem,
    }: any = this.props;
    const policyNoList = this.getPolicyList();
    const productList = this.getProductList();
    const policyId = form.getFieldValue('policyId');
    const existCodes = this.getExistCodes();
    const isDeclined = formUtils.queryValue(incidentDecisionItem.decision) === 'D';

    return (
      <CardOfClaim
        showButton={!taskNotEditable}
        handleClick={this.handleDelete}
        cardStyle={{
          background:
            policyId && lodash.isPlainObject(policyBackgrounds)
              ? policyBackgrounds[policyId]
              : null,
        }}
      >
        <Form layout="vertical">
          <FormLayout json={incidentDecisionLayout}>
            <FormItemSelect
              form={form}
              required
              disabled={taskNotEditable}
              dicts={dictsOfAssessmentDecision}
              loading={loadingOfClaimDecision}
              rules={[
                {
                  validator: VLD_000202(),
                },
              ]}
              formName="decision"
              labelId="app.navigator.task-detail-of-claim-assessment.label.claim-decision"
            />
            <FormItemSelect
              form={form}
              required
              disabled={taskNotEditable}
              dicts={policyNoList}
              loading={loadingOfPolicy}
              formName="policyId"
              dictName="policyNo"
              dictCode="policyNo"
              labelId="app.navigator.task-detail-of-claim-assessment.label.plicy-no"
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              requiredTriggerValidate
              required={!isDeclined}
              existCodes={lodash.compact(existCodes)}
              dicts={productList}
              loading={loadingOfPolicy}
              dictCode="benefitTypeCode"
              dictName="benefitTypeName"
              formName="benefitTypeCode"
              dictTypeCode="Dropdown_PRD_BenefitType"
              labelId="venus.claim.product-name"
              name="fieldOne"
            />
            <FormItemSelect
              form={form}
              requiredTriggerValidate
              required={isDeclined}
              disabled={taskNotEditable}
              loading={loadingOfClaimDecision}
              dicts={taskNotEditable ? dictsOfDenyReason : dictsOfDenyReasonManaulAssessment}
              formName="denyCode"
              labelId="venus.claim.deny-reason"
            />
            <FormItemInput
              formName="remark"
              form={form}
              cusTitle
              disabled={taskNotEditable}
              loading={loadingOfClaimDecision}
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default IncidentDecisionListItem;
