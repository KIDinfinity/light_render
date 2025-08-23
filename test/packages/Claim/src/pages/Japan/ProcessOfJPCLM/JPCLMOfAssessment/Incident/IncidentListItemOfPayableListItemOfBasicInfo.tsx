/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import { Form, Icon } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import { BenefitCategory, ClaimDecision } from 'claim/pages/utils/claim';
import {
  isNoBelongPolicy,
  isNoImplementPolicy,
  judgeClaimDecision,
} from 'claim/pages/Japan/ProcessOfJPCLM/utils/expectDecisionUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import {
  VLD_000011ProductCode,
  VLD_000011BenefitTypeCode,
} from 'claim/pages/validators/fieldValidators';
import { PolicyCategory } from '../../utils/constant';
import json from '../FormLayout.json';
import styles from './IncidentListItem.less';

const FORMID = 'claimPayableListItemOfBasicInfo';

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
    claimPayableListMap: JPCLMOfClaimAssessmentController.claimEntities.claimPayableListMap,
    settingMap: lodash.get(JPCLMOfClaimAssessmentController, 'claimProcessData.settingMap'),
  })
)
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentPayableItem, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimAssessmentController/saveEntry',
            target: 'saveIncidentPayableItem',
            payload: {
              changedFields,
              incidentPayableId: incidentPayableItem.id,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
          target: 'saveIncidentPayableItem',
          payload: {
            changedFields,
            incidentPayableId: incidentPayableItem.id,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { incidentPayableItem } = props;
    return formUtils.mapObjectToFields(incidentPayableItem, {
      remark: (value) => transRemarkCodeToMsg(value),
      claimDecision: (value) => (value === 'none' ? '' : value),
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
    const { dispatch, form, incidentPayableItem } = this.props;

    if (incidentPayableItem.id) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/registerForm',
            payload: {
              form,
              formId: `${FORMID}-${incidentPayableItem.id}`,
            },
          },
          0
        );
      });
    }
  };

  unRegisterForm = () => {
    const { dispatch, form, incidentPayableItem } = this.props;

    if (incidentPayableItem.id) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/unRegisterForm',
            payload: {
              form,
              formId: `${FORMID}-${incidentPayableItem.id}`,
            },
          },
          0
        );
      });
    }
  };

  getPolicyList = () => {
    const { listPolicy } = this.props;

    const policyNoList = lodash.uniqBy(listPolicy, 'policyNo');
    return policyNoList;
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

  render() {
    const {
      form,
      dictsOfClaimDecision,
      incidentPayableItem,
      taskNotEditable,
      claimPayableListMap,
      listPolicy,
    } = this.props;
    const claimDecision = form.getFieldValue('claimDecision');
    const comfirmClaimDecision = judgeClaimDecision(claimDecision);
    const productList = this.getProductList();
    const benefitTypeList = this.getBenefitTypeList();
    const { benefitCategory, policySetupStatus } = incidentPayableItem;
    const benefitCategoryIsL = benefitCategory === BenefitCategory.life;
    const isNoBelong = isNoBelongPolicy(policySetupStatus);
    const isNoImplement = isNoImplementPolicy(policySetupStatus);
    const isStandard = !isNoBelong && !isNoImplement;
    const isDeclined =
      formUtils.queryValue(incidentPayableItem.claimDecision) === ClaimDecision.deny;
    return (
      <div className={styles.incidentItem}>
        <div className={styles.leftIcon}>
          <Icon type={comfirmClaimDecision} className="check-icon" />
        </div>
        <Form layout="vertical">
          <FormLayout json={json}>
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
                    incidentPayableItem,
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
                  validator: VLD_000011BenefitTypeCode(claimPayableListMap, incidentPayableItem),
                },
              ]}
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable || isNoBelong}
              required
              dicts={dictsOfClaimDecision}
              formName="claimDecision"
              labelId="app.navigator.task-detail-of-claim-assessment.label.claim-decision"
            />
            <FormItemNumber
              form={form}
              disabled
              precision={0}
              formName="systemCalculationAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.system-calculation-amount"
            />
            <FormItemNumber
              form={form}
              disabled={
                taskNotEditable || (!benefitCategoryIsL && isStandard) || isNoBelong || isDeclined
              }
              precision={0}
              formName="assessorOverrideAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.assessor-override-amount"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable || isNoBelong}
              name="row16"
              formName="remark"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
            />
          </FormLayout>
        </Form>
      </div>
    );
  }
}

export default IncidentListItemOfPayableListItemOfBasicInfo;
