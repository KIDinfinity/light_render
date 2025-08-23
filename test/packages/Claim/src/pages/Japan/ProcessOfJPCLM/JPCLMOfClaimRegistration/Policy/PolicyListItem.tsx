/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { Form, Icon } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import moment from 'moment';

import handleMessageModal from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { VLD_000036, VLD_000036Rule } from 'claim/pages/validators/fieldValidators';
import CardOfClaim from 'basic/components/Form/FormCard';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemInput,
  FormItemSelect,
  FormItemDatePicker,
  formUtils,
} from 'basic/components/Form';
import { PolicyCategory } from '../../utils/constant';

import layout from './Layout';

import styles from './PolicyListItem.less';

const FORMID_PRFIX = 'policyListItem';
const confirmList = [
  {
    dictCode: 1,
    dictName: formatMessageApi({
      Label_BIZ_Claim:
        'app.navigator.task-detail-of-claim-assessment.beneficiary.label.confirm-indicator-confirm',
    }),
  },
  {
    dictCode: 0,
    dictName: formatMessageApi({
      Label_BIZ_Claim:
        'app.navigator.task-detail-of-claim-assessment.beneficiary.label.confirm-indicator-reject',
    }),
  },
];

@connect(
  (
    {
      dictionaryController,
      JPCLMOfClaimRegistrationController,
      claimEditable,
      formCommonController,
    },
    { policyId }
  ) => ({
    policyStatusOptions: dictionaryController.policyStatus,
    dictsOfBenefitTypeJp: dictionaryController.benefitType,
    dictsOfBacicPlan: dictionaryController.basicPlan,
    policyItem: JPCLMOfClaimRegistrationController.claimEntities.policyListMap[policyId],
    taskNotEditable: claimEditable.taskNotEditable,
    listPolicy: JPCLMOfClaimRegistrationController.listPolicy,
    validating: formCommonController.validating,
  })
)
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating, policyId } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimRegistrationController/saveEntry',
            target: 'savePolicyListItem',
            payload: {
              changedFields,
              policyId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimRegistrationController/saveFormData',
          target: 'savePolicyListItem',
          payload: {
            changedFields,
            policyId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { policyItem } = props;
    return formUtils.mapObjectToFields(policyItem, {
      confirmed: (value: any) => value,
      policyNo: (value: any) => value,
      basicPlanCode: (value) => value,
      benefitTypeArray: (value) => value || [],
      beneficiaryName: (value: any) => value,
      policyOwnerNameSpelling: (value: any) => value,
      policyOwnerName: (value: any) => value,
      policyStatus: (value: any) => value,
      insuredNameSpelling: (value: any) => value,
      insuredName: (value: any) => value,
      insuredBirthDate: (value) => (value ? moment(value) : null),
      policyIssueDate: (value) => (value ? moment(value) : null),
      remake: (value: any) => value,
    });
  },
})
class PolicyListItem extends Component {
  registeForm = () => {
    const { dispatch, form, policyId }: any = this.props;
    if (policyId) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID_PRFIX}_${policyId}`,
        },
      });
    }
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, policyId }: any = this.props;

    if (policyId) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID_PRFIX}_${policyId}`,
        },
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  handleDelete = () => {
    const { dispatch, policyId }: any = this.props;

    dispatch({
      type: 'JPCLMOfClaimRegistrationController/removePolicyItem',
      payload: {
        policyId,
      },
    });
  };

  updatePolicy = async (value) => {
    const { dispatch, policyId }: any = this.props;
    // const value = form.getFieldValue('policyNo');
    const isCheckSuccess = value && VLD_000036Rule(value);

    if (isCheckSuccess) {
      const response = await dispatch({
        type: 'JPCLMOfClaimRegistrationController/updatePolicyItem',
        payload: {
          policyId,
          policyNo: value,
        },
      });
      if (!(response.success && response.resultData)) {
        const promptMessages = lodash.get(response, 'promptMessages', []);
        handleMessageModal(promptMessages);
      }
    } else {
      const changedFields = {
        basicPlanCode: '',
        beneficiaryName: '',
        benefitTypeArray: [],
        benefitTypeCodeList: [],
        insuredBirthDate: null,
        insuredName: '',
        insuredNameSpelling: '',
        policyIssueDate: null,
        policyOwnerName: '',
        policyOwnerNameSpelling: '',
        policyStatus: '',
      };
      dispatch({
        type: 'JPCLMOfClaimRegistrationController/savePolicyListItem',
        payload: {
          policyId,
          changedFields,
        },
      });
    }
  };

  mappingCategory = (policyCategory) => {
    let policyCategoryText;
    switch (policyCategory) {
      case PolicyCategory.SFDC:
        policyCategoryText = formatMessageApi({
          Label_BIZ_Claim: 'venus_cliam.label.policyCategory.SFDC',
        });
        break;
      case PolicyCategory.CR:
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
      dictsOfBacicPlan,
      dictsOfBenefitTypeJp,
      policyStatusOptions,
      parentClaimNo,
      policyItem,
      taskNotEditable,
      listPolicy,
    } = this.props;

    const confirmed = form.getFieldValue('confirmed');
    const editable = !!parentClaimNo || taskNotEditable;
    const { policyCategory, benefitTypeCodeList } = policyItem;

    const benefitTypeOptions = lodash.filter(dictsOfBenefitTypeJp, (item) =>
      lodash.includes(benefitTypeCodeList, item.dictCode)
    );

    const policyCategoryText = this.mappingCategory(policyCategory);

    return (
      <div className={styles.policyListItem}>
        <div className={styles.leftIcon}>
          <Icon type={confirmed ? 'check-circle' : 'close-circle'} className="check-icon" />
        </div>
        <div className={styles.main}>
          <CardOfClaim showButton={!editable} handleClick={this.handleDelete}>
            <Form layout="vertical">
              <div className={styles.content}>
                {!editable && (
                  <div className={styles.leftSelect}>
                    <FormItemSelect
                      form={form}
                      dicts={confirmList}
                      labelId="app.navigator.task-detail-of-data-capture.button.decision"
                      formName="confirmed"
                      name="confirmed"
                    />
                  </div>
                )}
                <div className={styles.mainContent}>
                  <FormLayout json={layout} name="policyItem">
                    <FormItemSelect
                      form={form}
                      disabled={editable}
                      formName="policyNo"
                      labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no"
                      required
                      onChange={this.updatePolicy}
                      // onBlur={this.updatePolicy}
                      // triggerEvent="onBlur"
                      rules={[{ validator: VLD_000036() }]}
                      dicts={listPolicy}
                      tagText={policyCategoryText}
                    />
                    <FormItemSelect
                      form={form}
                      disabled
                      formName="basicPlanCode"
                      labelId="app.navigator.task-detail-of-data-capture.label.basic-plan-name"
                      name="product"
                      dicts={dictsOfBacicPlan}
                    />
                    <FormItemSelect
                      form={form}
                      disabled={editable}
                      required
                      formName="benefitTypeArray"
                      labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-type"
                      name="benefitTypes"
                      mode="multiple"
                      dicts={benefitTypeOptions}
                    />
                    <FormItemInput
                      form={form}
                      disabled
                      formName="beneficiaryName"
                      labelId="app.navigator.task-detail-of-data-capture.label.beneficial-name"
                    />
                    <FormItemInput
                      form={form}
                      disabled
                      formName="policyOwnerNameSpelling"
                      labelId="app.navigator.task-detail-of-data-capture.label.policy-owner-name-spelling"
                    />
                    <FormItemInput
                      form={form}
                      disabled
                      formName="policyOwnerName"
                      labelId="app.navigator.task-detail-of-data-capture.label.policy-owner-name"
                    />
                    <FormItemSelect
                      form={form}
                      disabled
                      formName="policyStatus"
                      labelId="app.navigator.task-detail-of-data-capture.label.policy-status"
                      name="policyStatus"
                      dicts={policyStatusOptions}
                    />
                    <FormItemInput
                      form={form}
                      disabled
                      formName="insuredNameSpelling"
                      labelId="app.navigator.task-detail-of-data-capture.label.insured-name-spelling"
                    />
                    <FormItemInput
                      form={form}
                      disabled
                      formName="insuredName"
                      labelId="app.navigator.task-detail-of-data-capture.label.insured-name"
                    />
                    <FormItemDatePicker
                      form={form}
                      disabled
                      formName="insuredBirthDate"
                      labelId="app.navigator.task-detail-of-data-capture.label.insured-DOB"
                    />
                    <FormItemDatePicker
                      form={form}
                      disabled
                      formName="policyIssueDate"
                      labelId="app.navigator.task-detail-of-data-capture.label.policy-issue-date"
                    />
                    <FormItemInput
                      form={form}
                      disabled={editable}
                      formName="remake"
                      labelId="app.navigator.task-detail-of-data-capture.label.remake"
                    />
                  </FormLayout>
                </div>
              </div>
            </Form>
          </CardOfClaim>
        </div>
      </div>
    );
  }
}

export default PolicyListItem;
