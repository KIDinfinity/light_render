import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import lodash, { get } from 'lodash';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { PolicyCategory } from '../../utils/constant';
import { filterPolicyByIncident } from '../../utils';
import json from '../FormLayout.json';

const FORMID = 'groupPayableItemInfo';

class IncidentItemOfGroupPayableItemInfo extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, incidentPayableInfo } = this.props;
    setTimeout(() => {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID}-${incidentPayableInfo.id}`,
        },
      });
    });
  };

  unRegisterForm = () => {
    const { dispatch, form, incidentPayableInfo } = this.props;

    setTimeout(() => {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID}-${incidentPayableInfo.id}`,
        },
      });
    });
  };

  getPolicyList = () => {
    const { listPolicy, expectPolicyList, incidentPayableInfo } = this.props;
    const policyNoList = lodash.uniqBy(listPolicy, 'policyNo');

    return filterPolicyByIncident(policyNoList, expectPolicyList, incidentPayableInfo.incidentId);
  };

  getMainProductList = () => {
    const { listPolicy, form } = this.props;
    const policyNo = form.getFieldValue('policyNo');
    const mainProductCode = form.getFieldValue('mainProductCode');
    const policy = lodash.find(
      listPolicy,
      (item) => item.policyNo === policyNo && item.mainProductCode === mainProductCode
    );

    return policy ? [policy] : [];
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

  render() {
    const {
      form,
      taskNotEditable,
      incidentPayableInfo,
      dictsOfPaymentAssessmentResult,
    } = this.props;
    const policyNoList = this.getPolicyList();
    const policyCategoryText = this.mappingCategory(incidentPayableInfo.policyCategory);
    const mainProductList = this.getMainProductList();

    return (
      <Form layout="vertical">
        <FormLayout json={json}>
          <FormItemSelect
            form={form}
            disabled
            dicts={policyNoList}
            dictCode="policyNo"
            dictName="policyNo"
            formName="policyNo"
            labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no"
            tagText={policyCategoryText}
          />
          <FormItemSelect
            form={form}
            disabled
            dicts={mainProductList}
            dictName="mainProductName"
            dictCode="mainProductCode"
            formName="mainProductCode"
            optionShowType="name"
            labelId="venus_claim.label.mainProductCode"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            dicts={dictsOfPaymentAssessmentResult}
            required
            formName="paymentAssessmentResult"
            labelId="venus_claim.label.paymentAssessmentCode"
          />
        </FormLayout>
      </Form>
    );
  }
}

const FormWrapped = Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentPayableInfo, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimAssessmentController/saveEntry',
            target: 'saveIncidentPayableGroupItem',
            payload: {
              changedFields,
              incidentPayableId: incidentPayableInfo.id,
              incidentPayableList: incidentPayableInfo.payableList,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
          target: 'saveIncidentPayableGroupItem',
          payload: {
            changedFields,
            incidentPayableId: incidentPayableInfo.id,
            incidentPayableList: incidentPayableInfo.payableList,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { incidentPayableInfo } = props;
    return formUtils.mapObjectToFields(incidentPayableInfo);
  },
})(IncidentItemOfGroupPayableItemInfo);

export default connect(
  ({
    JPCLMOfClaimAssessmentController,
    dictionaryController,
    claimEditable,
    formCommonController,
  }) => ({
    policyBackgrounds: JPCLMOfClaimAssessmentController?.policyBackgrounds,
    taskNotEditable: claimEditable.taskNotEditable,
    listPolicy: JPCLMOfClaimAssessmentController.listPolicy,
    expectPolicyList: get(JPCLMOfClaimAssessmentController, 'claimProcessData.expectPolicyList'),
    dictsOfPaymentAssessmentResult: dictionaryController.paymentAssessmentResult,
    validating: formCommonController.validating,
  })
)(FormWrapped);
