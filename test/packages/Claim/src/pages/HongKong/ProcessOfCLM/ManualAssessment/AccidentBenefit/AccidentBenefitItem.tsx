import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import FormSection, { FormItemSelect, FormItemNumber } from 'basic/components/Form/FormSection';
import { ClaimDecision } from 'claim/pages/utils/claim';
import styles from './styles.less';

const Layout = {
  fieldLayout: {
    xs: { span: 8 },
    sm: { span: 8 },
    md: { span: 8 },
    lg: { span: 8 },
  },
};

const AccidentBenefitItem = ({
  form,
  accidentBenefitItem,
  dispatch,
  accidentBenefitId,
  existCodes,
  treatmentPayableItemId,
}: any) => {
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable?.taskNotEditable);

  const listPolicy = useSelector(
    ({ HKCLMOfClaimAssessmentController }: any) => HKCLMOfClaimAssessmentController?.listPolicy
  );
  const treatmentPayableItem = useSelector(
    ({ HKCLMOfClaimAssessmentController }: any) =>
      HKCLMOfClaimAssessmentController.claimEntities.treatmentPayableListMap[treatmentPayableItemId]
  );
  const incidentPayableItem = useSelector(
    ({ HKCLMOfClaimAssessmentController }: any) =>
      HKCLMOfClaimAssessmentController.claimEntities.claimPayableListMap[
        treatmentPayableItem.payableId
      ]
  );
  const isDeclined =
    formUtils.queryValue(incidentPayableItem?.claimDecision) === ClaimDecision.deny;

  const { productCode, policyNo, benefitTypeCode } = accidentBenefitItem;

  const dicts = lodash.filter(
    listPolicy,
    (item) =>
      item.coreProductCode === formUtils.queryValue(productCode) &&
      item.policyNo === formUtils.queryValue(policyNo) &&
      item.benefitTypeCode === formUtils.queryValue(benefitTypeCode) &&
      item.benefitCategory === 'A'
  );

  const handleDelete = () => {
    const { treatmentPayableId }: any = accidentBenefitItem;
    dispatch({
      type: 'HKCLMOfClaimAssessmentController/accidentBenefitPayableItemDelete',
      payload: {
        treatmentPayableId,
        id: accidentBenefitId,
      },
    });
  };

  return (
    <CardOfClaim
      showButton={!taskNotEditable}
      handleClick={handleDelete}
      disabledClick={!isDeclined}
      cardStyle={{
        display: 'none',
      }}
      className={styles.accidentBenefitCard}
    >
      <FormSection
        form={form}
        formId={`AccidentBenefitItem_${accidentBenefitId}`}
        layout={Layout}
        isMargin={false}
        isPadding={false}
        isHideBgColor
      >
        <FormItemSelect
          form={form}
          required
          disabled={taskNotEditable || isDeclined}
          dicts={dicts}
          dictCode="benefitItemCode"
          dictName="benefitItemName"
          formName="benefitItemCode"
          optionShowType="both"
          existCodes={existCodes}
          labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-item"
        />
        <FormItemNumber
          form={form}
          required
          disabled={taskNotEditable || isDeclined}
          precision={0}
          formName="payableDays"
          labelId="app.navigator.task-detail-of-claim-assessment.label.payable-days"
        />
        <FormItemNumber
          form={form}
          required
          disabled={taskNotEditable || isDeclined}
          formName="payableAmount"
          labelId="app.navigator.task-detail-of-claim-assessment.label.payable-amount"
        />
      </FormSection>
    </CardOfClaim>
  );
};

export default connect(
  (
    { HKCLMOfClaimAssessmentController, formCommonController }: any,
    { accidentBenefitId }: any
  ) => ({
    validating: formCommonController?.validating,
    accidentBenefitItem:
      HKCLMOfClaimAssessmentController?.claimEntities?.accidentBenefitPayableListMap?.[
        accidentBenefitId
      ],
  })
)(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch, accidentBenefitId, validating }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'HKCLMOfClaimAssessmentController/saveEntry',
              target: 'accidentBenefitPayableItemUpdate',
              payload: {
                changedFields,
                id: accidentBenefitId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'HKCLMOfClaimAssessmentController/saveFormData',
            target: 'accidentBenefitPayableItemUpdate',
            payload: {
              changedFields,
              id: accidentBenefitId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { accidentBenefitItem }: any = props;
      return formUtils.mapObjectToFields(accidentBenefitItem);
    },
  })(AccidentBenefitItem)
);
