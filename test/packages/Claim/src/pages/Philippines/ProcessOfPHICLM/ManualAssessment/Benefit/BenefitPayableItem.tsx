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
import { ClaimDecision } from 'claim/pages/utils/claim';
import { BenefitPayableItemLayout } from '../FormLayout.json';
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
  { PHCLMOfClaimAssessmentController, formCommonController, claimEditable }: any,
  { benefitPayableId }: any
) => {
  return {
    benefitPayableItem:
      PHCLMOfClaimAssessmentController.claimEntities.benefitItemPayableListMap?.[benefitPayableId],
    claimPayableListMap: PHCLMOfClaimAssessmentController.claimEntities.claimPayableListMap,
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
            type: 'PHCLMOfClaimAssessmentController/saveEntry',
            target: 'saveBenefitPayableItem',
            payload: {
              changedFields,
              benefitPayableId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfClaimAssessmentController/saveFormData',
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
      calculationAmount: (value: any) => value,
      systemCalculationAmount: (value: any) => value,
      uncoverAmount: (value: any) => value,
      benefitItemCode: (value: any) => value,
      payableDays: (value: any) => value,
      insurerCoInsuranceAmount: (value: any) => value,
      assessorOverrideAmount: (value: any) => value,
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
      type: 'PHCLMOfClaimAssessmentController/removeBenefitPayableItem',
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
      taskNotEditable,
      benefitItemCodeAdded,
      policyList,
    } = this.props;
    const isDeny = this.claimDecision === ClaimDecision.deny;
    return (
      <div className={styles.benefit_item_wrap}>
        <Form layout="vertical">
          <FormLayout json={BenefitPayableItemLayout}>
            <FormItemSelect
              form={form}
              disabled={taskNotEditable || isDeny || !!benefitPayableItem?.registered}
              formName="benefitItemCode"
              dictCode="benefitItemCode"
              dictName="benefitItemName"
              existCodes={benefitItemCodeAdded}
              dicts={policyList}
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable || isDeny}
              formName="expenseAmount"
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable}
              formName="assessorOverrideAmount"
              min={0}
              max={999999999.99}
            />
          </FormLayout>
        </Form>
        {!taskNotEditable &&
          benefitPayableItem?.isAdd &&
          !isDeny &&
          !benefitPayableItem?.registered && (
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

export default BenefitPayableItem;
