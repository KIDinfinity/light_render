import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Form, Button } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { FormComponentProps } from 'antd/es/form';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemNumber, FormItemSelect } from 'basic/components/Form/FormItem';
import type { IBenefitItemPayable, IPolicy } from '@/dtos/claim';
import { eClaimDecisionPH } from 'claim/pages/utils/claim';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { withContextData } from '@/components/_store';
import { ECaseType } from 'claim/pages/AppealCase/ManualAssessment/_dto/Enums';
import CaseCategory from 'enum/CaseCategory';
import { fnPrecisionFormatNegative } from '@/utils/precisionUtils';

import { BenefitPayableItemLayout, AccidentBenefitPayableItemLayout } from '../FormLayout.json';
import styles from './BenefitPayableItem.less';

const FORMID = 'BenefitPayableItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  benefitPayableId: string;
  invoicePayableItemNextId: string;
  benefitPayableItem: IBenefitItemPayable;
  policyList: IPolicy[];
  benefitItemCodeAdded: string[];
  loadingOfPolicy: boolean;
  policyBackgrounds: object;
  invoicePayableId: string;
  validating: boolean;
}

interface IState {
  serviceNames: string[];
  didMount: boolean;
}

const FormItem = (props: any) => (
  <span className={styles.benefit_item_field}>{props.children}</span>
);

const mapStateToProps = (
  { PHCLMOfAppealCaseController, formCommonController, claimEditable }: any,
  { benefitPayableId, withData: { caseType } }: any
) => {
  const { claimEntities } = caseType
    ? PHCLMOfAppealCaseController[caseType]
    : PHCLMOfAppealCaseController;

  return {
    benefitPayableItem: claimEntities.benefitItemPayableListMap?.[benefitPayableId],
    claimPayableListMap: claimEntities.claimPayableListMap,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  };
};

@connect(mapStateToProps)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, benefitPayableId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'PHCLMOfAppealCaseController/saveEntry',
            target: 'saveBenefitPayableItem',
            payload: {
              changedFields,
              benefitPayableId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfAppealCaseController/saveFormData',
          target: 'saveBenefitPayableItem',
          payload: {
            changedFields,
            benefitPayableId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { benefitPayableItem }: any = props;

    return formUtils.mapObjectToFields(benefitPayableItem, {
      benefitItemCode: (value: any) => value,
      assessorOverrideAmount: (value: any) => value,
      expenseAmount: (value: any) => value,
    });
  },
})
class BenefitPayableItem extends Component<IProps, IState> {
  static FormHeader = FormItem;

  componentDidMount = async () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, benefitPayableId }: any = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: `${FORMID}-${benefitPayableId}`,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form, benefitPayableId } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: `${FORMID}-${benefitPayableId}`,
      },
    });
  };

  get claimDecision() {
    const { benefitPayableItem, claimPayableListMap } = this.props;
    const payableId = lodash.get(benefitPayableItem, 'payableId');
    const claimDecision = lodash.get(claimPayableListMap, `${payableId}.claimDecision`);
    return formUtils.queryValue(claimDecision);
  }

  handleDelete = () => {
    const { dispatch, benefitPayableId, invoicePayableId } = this.props;
    dispatch({
      type: 'PHCLMOfAppealCaseController/removeBenefitPayableItem',
      payload: {
        invoicePayableId,
        benefitPayableId,
      },
    });
  };

  render() {
    const {
      form,
      benefitPayableItem,
      taskNotEditable: notEditable,
      benefitItemCodeAdded,
      policyList,
      withData,
    } = this.props;

    const { caseType, appealNotEditable, originalCaseCategory }: any = withData || {};
    const taskNotEditable = notEditable || appealNotEditable;
    const isClaimAdjust =
      ECaseType.originCase !== caseType || CaseCategory.PH_AP_CTG01 === originalCaseCategory;

    const isDeny = this.claimDecision === eClaimDecisionPH.Deny;

    return (
      <div className={styles.benefit_item_wrap}>
        <Form layout="vertical">
          <FormLayout
            json={isClaimAdjust ? BenefitPayableItemLayout : AccidentBenefitPayableItemLayout}
          >
            {isClaimAdjust && (
              <FormItemNumber
                form={form}
                formName="claimAdjustment"
                name="claimAdjustment"
                min={-Number.MAX_VALUE}
                pattern={
                  /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
                }
                formatter={fnPrecisionFormatNegative}
                disabled={taskNotEditable || CaseCategory.PH_AP_CTG01 === originalCaseCategory}
                required
              />
            )}
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              formName="benefitItemCode"
              dictCode="benefitItemCode"
              dictName="benefitItemName"
              existCodes={benefitItemCodeAdded}
              dicts={policyList}
            />
            <FormItemNumber form={form} disabled={taskNotEditable} formName="expenseAmount" />
            <FormItemNumber
              form={form}
              disabled
              formName="assessorOverrideAmount"
              min={0}
              max={999999999.99}
            />
          </FormLayout>
        </Form>
        {!taskNotEditable && benefitPayableItem?.manualAdd === SwitchEnum.YES && !isDeny && (
          <Button
            className={styles.btn_delete}
            icon="close"
            size="small"
            type="primary"
            shape="circle"
            onClick={this.handleDelete}
          />
        )}
      </div>
    );
  }
}

export default withContextData(BenefitPayableItem);
