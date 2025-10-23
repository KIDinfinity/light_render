import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Form, Button, Tooltip } from 'antd';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/es/form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import Empty from '@/components/Empty';
import { formUtils, Validator } from 'basic/components/Form';
import type { IBenefitItemPayable, IPolicy } from '@/dtos/claim';
import { shouldUpdateState, filterBenefitList } from 'claim/pages/utils/formUtils';
import { ClaimDecision } from 'claim/pages/utils/claim';
import ErrorTip from '@/components/ErrorTooltip/ErrorTip';
import { BenefitPayableItemLayout } from '../FormLayout.json';
import styles from './BenefitPayableItem.less';

const FORMID = 'BenefitPayableItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  benefitPayableItemId: string;
  invoicePayableItemNextId: string;
  benefitPayableItem: IBenefitItemPayable;
  listPolicy: IPolicy[];
  benefitItemCodeAdded: string[];
  loadingOfPolicy: boolean;
  policyBackgrounds: object;
  claimDecision: string;
  validating: boolean;
  benefitItemPayableListMap: object;
  listPerConfinementLimit: any[];
  invoicePayableId: string;
}

interface IState {
  serviceNames: string[];
  didMount: boolean;
}

const FormItem = (props: any) => (
  <span className={styles.benefit_item_field}>{props.children}</span>
);

const mapStateToProps = (
  { daOfClaimAssessmentController, loading, formCommonController, claimEditable }: any,
  { benefitPayableItemId, claimDecision }: any
) => {
  return {
    loadingOfPolicy: loading.effects['daOfClaimAssessmentController/queryListPolicy'],
    benefitPayableItem:
      daOfClaimAssessmentController.claimEntities.benefitItemPayableListMap[benefitPayableItemId],
    benefitItemPayableListMap:
      daOfClaimAssessmentController.claimEntities.benefitItemPayableListMap,
    listPerConfinementLimit: daOfClaimAssessmentController.listPerConfinementLimit,
    claimDecision,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  };
};

@connect(mapStateToProps)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const {
      dispatch,
      benefitPayableItemId,
      invoicePayableItemNextId,
      validating,
      invoicePayableId,
    } = props;
    if (shouldUpdateState(validating, changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
            target: 'saveBenefitPayableItem',
            payload: {
              changedFields,
              benefitPayableItemId,
              invoicePayableItemNextId,
              invoicePayableId,
              id: benefitPayableItemId,
              sectionName: 'benefitItemPayableListMap'
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'daOfClaimAssessmentController/saveFormData',
          target: 'saveBenefitPayableItem',
          payload: {
            changedFields,
            benefitPayableItemId,
            invoicePayableItemNextId,
            invoicePayableId,
            id: benefitPayableItemId,
            sectionName: 'benefitItemPayableListMap'
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
      payableAmountBeforeDeductible: (value: any) => value,
    });
  },
})
class BenefitPayableItem extends Component<IProps, IState> {
  static FormHeader = FormItem;

  state = {
    serviceNames: [],
    didMount: false,
  };

  componentDidMount = async () => {
    this.registeForm();
    this.setState({ didMount: true });
    await this.getServiceNames();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, benefitPayableItem }: any = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: `${FORMID}-${benefitPayableItem.id}`,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form, benefitPayableItem } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: `${FORMID}-${benefitPayableItem.id}`,
      },
    });
  };

  handleDelete = () => {
    const { dispatch, benefitPayableItem, benefitPayableItemId } = this.props;
    dispatch({
      type: 'daOfClaimAssessmentController/deleteBenefitPayableItem',
      payload: {
        invoicePayableId: benefitPayableItem.invoicePayableId,
        benefitPayableItemId,
      },
    });
  };

  getServiceNames = async () => {
    const {
      dispatch,
      benefitPayableItem: { serviceItems },
    } = this.props;

    if (serviceItems) {
      const serviceNames = await dispatch({
        type: 'daOfClaimAssessmentController/getSearchName',
        payload: {
          searchCodes: lodash.compact(serviceItems.split(',')),
        },
      });
      if (serviceNames) {
        this.setState({
          serviceNames,
        });
      }
    }
  };

  getServiceItems = () => {
    const { serviceNames } = this.state;
    if (serviceNames) {
      return lodash.map(serviceNames, (item: string, index: number) => (
        <div key={`${item}-${index}`}>{`${item.dictCode}-${item.dictName}`}</div>
      ));
    }
    return null;
  };

  render() {
    const {
      form,
      loadingOfPolicy,
      benefitPayableItem,
      claimDecision,
      taskNotEditable,
      listPolicy,
      benefitItemCodeAdded,
      benefitItemPayableListMap,
      listPerConfinementLimit,
      invoicePayableId,
    } = this.props;
    const serviceItems = this.getServiceItems();
    const tooltipContent = lodash.isEmpty(serviceItems) ? <Empty /> : serviceItems;
    const tooltipTitle = !benefitPayableItem.isAdd ? tooltipContent : '';
    const isDeny = claimDecision === ClaimDecision.deny;
    const listPerConfinementLimitfiler = lodash.filter(
      listPerConfinementLimit,
      (item) =>
        item?.rolloverBenefitTypeCode === formUtils.queryValue(benefitPayableItem?.benefitTypeCode)
    );

    return (
      <div className={styles.benefit_item_wrap}>
        <Form layout="vertical">
          <FormLayout json={BenefitPayableItemLayout}>
            <FormItem name="benefitItemCode">
              <Tooltip title={tooltipTitle} overlayStyle={{ maxWidth: 500 }}>
                <span className={styles.error_box}>
                  <ErrorTip form={form} formName="benefitItemCode" />
                  <FormItemSelect
                    form={form}
                    required
                    disabled={taskNotEditable || !benefitPayableItem.isAdd}
                    formName="benefitItemCode"
                    dicts={listPolicy}
                    filterList={filterBenefitList(listPolicy)}
                    existCodes={benefitItemCodeAdded}
                    dictCode="benefitItemCode"
                    dictTypeCode="Dropdown_PRD_BenefitItem"
                    dictName="benefitItemName"
                    optionShowType="both"
                    loading={loadingOfPolicy}
                    rules={[
                      {
                        validator: Validator.VLD_000721({
                          listPerConfinementLimit: listPerConfinementLimitfiler,
                          parentPayableId: invoicePayableId,
                          childPayableListMap: benefitItemPayableListMap,
                        }),
                      },
                    ]}
                  />
                </span>
              </Tooltip>
            </FormItem>
            <FormItemNumber
              form={form}
              disabled={taskNotEditable || isDeny}
              formName="payableDays"
              precision={0}
              min={0}
              max={999}
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable || isDeny}
              formName="calculationAmount"
              name="calculationAmount"
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable || isDeny}
              formName="insurerCoInsuranceAmount"
              name="insurerCoInsuranceAmount"
              min={0}
              max={999999999.99}
            />
            <FormItemNumber
              form={form}
              disabled
              name="systemCalculationAmount"
              formName="systemCalculationAmount"
            />
            <FormItem name="assessorOverrideAmount">
              <span className={styles.error_box}>
                <ErrorTip form={form} formName="assessorOverrideAmount" />
                <FormItemNumber
                  form={form}
                  disabled={taskNotEditable || isDeny}
                  required={!lodash.isNumber(form.getFieldValue('systemCalculationAmount'))}
                  formName="assessorOverrideAmount"
                  min={0}
                  max={999999999.99}
                />
              </span>
            </FormItem>
            <FormItemNumber
              form={form}
              disabled
              formName="uncoverAmount"
              min={0}
              max={999999999.99}
            />
          </FormLayout>
        </Form>
        {!taskNotEditable && benefitPayableItem.isAdd && claimDecision !== 'D' && (
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
