import React, { Component } from 'react';
import lodash from 'lodash';
import type { Dispatch } from 'redux';
import { connect } from 'dva';
import { Form } from 'antd';
import memo from 'memoize-one';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemNumber, formUtils } from 'basic/components/Form';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import type { FormComponentProps } from 'antd/es/form';
import CardOfClaim from 'basic/components/Form/FormCard';
import { VLD_000246, VLD_000200, VLD_000201 } from 'claim/pages/validators/fieldValidators';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { AccidentBenefitPayableItemLayout } from '../FormLayout.json';
import findLimitByCode from '../_models/functions/findLimitByCode';
import { BenefitLimitCode } from '../_models/dto';

const FORMID = 'accidentBenefitPayableHeader';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  accidentBenefitId: string;
  treatmentPayableId: string;
  validating: boolean;
}
const memoFindLimitByCode = memo(findLimitByCode);
class AccidentBenefitPayableHeader extends Component<IProps> {
  fieldContrast = {
    payableDays: [BenefitLimitCode.AMOUNT_PER_WEEK, BenefitLimitCode.SA_PERCENTAGE_PER_WEEK],
    saPercentage: [BenefitLimitCode.SA_PERCENTAGE],
    saPercentageYear: [BenefitLimitCode.SA_PERCENTAGE_PER_YEAR],
    saPercentagePerDisability: [BenefitLimitCode.SA_PERCENTAGE_PER_DISABILITY],
  };

  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  get filterBenefitList() {
    return lodash.map(this.dictOfBenefitItemCode, (item) => {
      const target = lodash.get(item, 'accidentBenefit.availableUse') === 'Y';
      if (!target) {
        return item?.benefitItemCode;
      }
      return '';
    });
  }

  get dictOfBenefitItemCode() {
    const { listPolicy, policyNo, productCode, benefitTypeCode }: any = this.props;
    return lodash.filter(
      listPolicy,
      (item) =>
        item.coreProductCode === formUtils.queryValue(productCode) &&
        item.policyNo === formUtils.queryValue(policyNo) &&
        item.benefitTypeCode === formUtils.queryValue(benefitTypeCode)
    );
  }

  registeForm = () => {
    const { dispatch, form, accidentBenefitId } = this.props;
    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: `${FORMID}-${accidentBenefitId}`,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form, accidentBenefitId } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: `${FORMID}-${accidentBenefitId}`,
      },
    });
  };

  handleDelete = () => {
    const { dispatch, accidentBenefitId, accidentBenefitPayableItem }: any = this.props;
    const { treatmentPayableId }: any = accidentBenefitPayableItem;
    dispatch({
      type: 'PHCLMOfAppealCaseController/removeAccidentBenefitPayableItem',
      payload: {
        treatmentPayableId,
        id: accidentBenefitId,
      },
    });
  };

  render() {
    const {
      form,
      accidentBenefitPayableItem,
      limitItem,
      existCodes,
      taskNotEditable: notEditable,
      payableDaysList,
      withData,
    }: any = this.props;
    const benefitItemCode = form.getFieldValue('benefitItemCode');
    const { limitCode }: any = accidentBenefitPayableItem;

    const { appealNotEditable }: any = withData || {};
    const taskNotEditable = notEditable || appealNotEditable;

    return (
      <CardOfClaim
        showButton={!taskNotEditable && accidentBenefitPayableItem.manualAdd === SwitchEnum.YES}
        handleClick={() => {
          this.handleDelete();
        }}
        cardStyle={{
          background: 'none',
        }}
      >
        <Form layout="vertical">
          <FormLayout json={AccidentBenefitPayableItemLayout}>
            <FormItemSelect
              form={form}
              required
              disabled={taskNotEditable}
              dicts={this.dictOfBenefitItemCode}
              filterList={this.filterBenefitList}
              dictCode="benefitItemCode"
              dictName="benefitItemName"
              formName="benefitItemCode"
              rules={[
                { validator: VLD_000200(this.dictOfBenefitItemCode, payableDaysList) },
                { validator: VLD_000201(this.dictOfBenefitItemCode, payableDaysList) },
              ]}
              optionShowType="both"
              existCodes={existCodes}
              labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-item"
            />
            {lodash.includes(this.fieldContrast.payableDays, limitCode) && (
              <FormItemNumber
                form={form}
                required
                disabled={taskNotEditable}
                precision={0}
                formName="payableDays"
                labelId="app.navigator.task-detail-of-claim-assessment.label.payable-days"
              />
            )}
            {lodash.includes(this.fieldContrast.saPercentage, limitCode) && (
              <FormItemNumber
                form={form}
                required
                disabled={taskNotEditable}
                formName="saPercentage"
                labelId="venus-claim-label-sa-percentage"
              />
            )}
            {lodash.includes(this.fieldContrast.saPercentageYear, limitCode) && (
              <FormItemNumber
                form={form}
                required
                disabled={taskNotEditable}
                min={1}
                max={10}
                precision={0}
                rules={[{ validator: VLD_000246(limitItem) }]}
                formName="payableYears"
                labelId="venus_claim.label.payable-years"
              />
            )}
            {lodash.includes(this.fieldContrast.saPercentagePerDisability, limitCode) && (
              <FormItemNumber
                form={form}
                required
                disabled={taskNotEditable}
                max={100}
                formName="saPercentagePerDisability"
                labelId="venus_claim.label.saPercentagePerDisability"
              />
            )}
            {!!benefitItemCode && (
              <FormItemNumber
                form={form}
                required
                disabled
                formName="payableAmount"
                labelId="app.navigator.task-detail-of-claim-assessment.label.payable-amount"
              />
            )}
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

const FormWrap = Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, accidentBenefitId, treatmentPayableId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'PHCLMOfAppealCaseController/saveEntry',
            target: 'saveAccidentBenefitPayableItem',
            payload: {
              changedFields,
              id: accidentBenefitId,
              treatmentPayableId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfAppealCaseController/saveFormData',
          target: 'saveAccidentBenefitPayableItem',
          payload: {
            changedFields,
            id: accidentBenefitId,
            treatmentPayableId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { accidentBenefitPayableItem }: any = props;
    return formUtils.mapObjectToFields(accidentBenefitPayableItem, {
      benefitItemCode: (value: any) => value,
      payableDays: (value: any) => value,
      saPercentage: (value: any) => value,
      payableAmount: (value: any) => value,
      payableYears: (value: any) => value,
      saPercentagePerDisability: (value: any) => value,
    });
  },
})(AccidentBenefitPayableHeader);

export default connect(
  (
    { PHCLMOfAppealCaseController, formCommonController, claimEditable }: any,
    { accidentBenefitId, withData: { caseType } }: any
  ) => {
    const { listPolicy, claimEntities } = caseType
      ? PHCLMOfAppealCaseController[caseType]
      : PHCLMOfAppealCaseController;

    const accidentBenefitPayableItem =
      claimEntities.accidentBenefitPayableListMap[accidentBenefitId];

    const { treatmentPayableId, benefitItemCode } = accidentBenefitPayableItem;
    const treatmentPayableItem = claimEntities.treatmentPayableListMap[treatmentPayableId];
    const accidentBenefitPayableList = lodash.filter(
      treatmentPayableItem?.accidentBenefitPayableList,
      (item) => item !== accidentBenefitId
    );
    const payableDaysList = lodash.map(accidentBenefitPayableList, (item) => {
      const temp = claimEntities.accidentBenefitPayableListMap[item];
      return {
        benefitItemCode: temp.benefitItemCode,
        payableDays: temp.payableDays,
      };
    });

    const { policyNo, productCode, id, benefitTypeCode } = treatmentPayableItem;
    return {
      accidentBenefitPayableItem,
      listPolicy,
      policyNo,
      productCode,
      benefitTypeCode,
      payableDaysList,
      treatmentPayableId: id,
      validating: formCommonController.validating,
      taskNotEditable: claimEditable.taskNotEditable,
      limitItem: memoFindLimitByCode(
        listPolicy,
        { ...treatmentPayableItem, benefitItemCode },
        BenefitLimitCode.YEAR_PER_LIFETIME_LIMIT
      ),
    };
  }
)(FormWrap);
