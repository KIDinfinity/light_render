import React, { PureComponent } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash, { get } from 'lodash';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import { BenefitCategory } from 'claim/pages/utils/claim';
import {
  isNoBelongPolicy,
  isNoImplementPolicy,
} from 'claim/pages/Japan/ProcessOfJPCLM/utils/expectDecisionUtils';
import {
  VLD_000011PolicyNo,
  VLD_000011ProductCode,
  VLD_000011BenefitTypeCode,
} from 'claim/pages/validators/fieldValidators';
import { filterPolicyByIncident } from '../../utils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { PolicyCategory } from '../../utils/constant';
import json from '../FormLayout.json';

const FORMID = 'incidentPayableListItemAdd';

@connect(
  ({
    dictionaryController,
    JPCLMOfClaimAssessmentController,
    formCommonController,
    claimEditable,
  }) => ({
    dictsOfClaimDecision: dictionaryController.EligibileCheck,
    listPolicy: JPCLMOfClaimAssessmentController.listPolicy,
    policyBackgrounds: JPCLMOfClaimAssessmentController?.policyBackgrounds,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    expectPolicyList: get(JPCLMOfClaimAssessmentController, 'claimProcessData.expectPolicyList'),
    claimPayableListMap: JPCLMOfClaimAssessmentController.claimEntities.claimPayableListMap,
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
            target: 'saveIncidentPayableAddItem',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
          target: 'saveIncidentPayableAddItem',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { incidentPayableAddItemDetail } = props;
    return formUtils.mapObjectToFields(incidentPayableAddItemDetail, {
      remark: (value) => transRemarkCodeToMsg(value),
    });
  },
})
class IncidentListItemOfPayableListItemOfBasicInfo extends PureComponent {
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

  getPolicyList = () => {
    const { listPolicy, expectPolicyList, incidentPayableAddItemDetail } = this.props;

    const policyNoList = lodash.uniqBy(listPolicy, 'policyNo');
    return filterPolicyByIncident(
      policyNoList,
      expectPolicyList,
      incidentPayableAddItemDetail.incidentId
    );
  };

  getProductList = () => {
    const { listPolicy, form } = this.props;

    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyNo')];
    const productNoList = lodash.uniqBy(filteredList, 'coreProductCode');

    return productNoList;
  };

  getBenefitTypeList = () => {
    const { listPolicy, form } = this.props;

    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyNo')];
    const productGrouped = lodash.groupBy(filteredList, 'coreProductCode');
    const productFilteredList = productGrouped[form.getFieldValue('productCode')];
    const benefitTypeList = lodash.uniqBy(productFilteredList, 'benefitTypeCode');

    return benefitTypeList;
  };

  mappingCategory = (policyCategory) => {
    let policyCategoryText;
    switch (policyCategory) {
      case PolicyCategory.BPO:
        policyCategoryText = formatMessageApi({
          Label_BIZ_Claim: 'venus_cliam.label.policyCategory.bpo',
        });
        break;
      case PolicyCategory.OTHER:
        policyCategoryText = formatMessageApi({
          Label_BIZ_Claim: 'venus_cliam.label.policyCategory.registration',
        });
        break;
      default:
        break;
    }
    return policyCategoryText;
  };

  handleDelete = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'JPCLMOfClaimAssessmentController/deleteIncidentPayableAddItem',
    });
  };

  render() {
    const {
      policyBackgrounds,
      form,
      dictsOfClaimDecision,
      incidentPayableAddItemDetail,
      taskNotEditable,
      claimPayableListMap,
      listPolicy,
    } = this.props;
    const policyNoList = this.getPolicyList();
    const productList = this.getProductList();
    const benefitTypeList = this.getBenefitTypeList();
    const { benefitCategory, policyCategory, policySetupStatus } = incidentPayableAddItemDetail;
    const benefitCategoryIsL = benefitCategory === BenefitCategory.life;
    const policyCategoryText = this.mappingCategory(policyCategory);
    const isNoBelong = isNoBelongPolicy(policySetupStatus);
    const isNoImplement = isNoImplementPolicy(policySetupStatus);
    const isStandard = !isNoBelong && !isNoImplement;

    return (
      <CardOfClaim
        showButton={!taskNotEditable}
        handleClick={() => {
          this.handleDelete();
        }}
        cardStyle={
          form.getFieldValue('policyNo')
            ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
            : {}
        }
      >
        <Form layout="vertical">
          <FormLayout json={json}>
            <FormItemNumber
              form={form}
              disabled
              precision={0}
              formName="systemCalculationAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.system-calculation-amount"
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable || (!benefitCategoryIsL && isStandard) || isNoBelong}
              precision={0}
              formName="assessorOverrideAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.assessor-override-amount"
              name="row16"
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable || isNoBelong}
              required
              dicts={dictsOfClaimDecision}
              formName="claimDecision"
              labelId="app.navigator.task-detail-of-claim-assessment.label.claim-decision"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable || isNoBelong}
              name="row16"
              formName="remark"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable || isNoBelong}
              required
              dicts={policyNoList}
              dictCode="policyNo"
              dictName="policyNo"
              formName="policyNo"
              labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no"
              tagText={policyCategoryText}
              rules={[
                {
                  validator: VLD_000011PolicyNo(claimPayableListMap, incidentPayableAddItemDetail),
                },
              ]}
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable || isNoBelong}
              dicts={productList}
              dictCode="coreProductCode"
              dictName="productName"
              optionShowType="name"
              formName="productCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.product"
              rules={[
                {
                  validator: VLD_000011ProductCode(
                    claimPayableListMap,
                    incidentPayableAddItemDetail,
                    listPolicy
                  ),
                },
              ]}
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable || isNoBelong}
              dicts={benefitTypeList}
              dictCode="benefitTypeCode"
              dictName="benefitTypeName"
              optionShowType="name"
              formName="benefitTypeCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-type"
              rules={[
                {
                  validator: VLD_000011BenefitTypeCode(
                    claimPayableListMap,
                    incidentPayableAddItemDetail
                  ),
                },
              ]}
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default IncidentListItemOfPayableListItemOfBasicInfo;
