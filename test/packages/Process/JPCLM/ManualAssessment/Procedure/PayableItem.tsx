import React from 'react';
import { Form } from 'antd';

import { connect, useSelector, useDispatch } from 'dva';
import { FormCard, formUtils } from 'basic/components/Form';
import Section, { PayableFields as Fields } from './Section';
import styles from './List.less';

const ProcedurePayableItem = ({ form, procedurePayableItem, curProcedurePayableItemList }: any) => {
  const dispatch = useDispatch();

  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/removeProcedurePayableItem',
      payload: {
        treatmentPayableId: procedurePayableItem.treatmentPayableId,
        id: procedurePayableItem?.id,
      },
    });
  };

  return (
    <FormCard
      className="procedurePayableItem"
      showButton={!!editable}
      handleClick={handleDelete}
      cardStyle={
        policyBackgrounds && form.getFieldValue('policyNo')
          ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
          : {}
      }
    >
      {procedurePayableItem.isAdjustment && (
        <>
          <span className={styles.flag} />
          <span className={styles.flagTitle}> 調整 </span>
        </>
      )}
      <Section form={form} editable={editable} section="Procedure.Payable">
        <Fields.AssessorOverrideAmount procedurePayableItem={procedurePayableItem} />
        <Fields.AssessorOverrideMultiple procedurePayableItem={procedurePayableItem} />
        <Fields.BenefitItemCode
          procedurePayableItem={procedurePayableItem}
          curProcedurePayableItemList={curProcedurePayableItemList}
        />
        <Fields.BenefitTypeCode />
        <Fields.PolicyNo />
        <Fields.ProductCode />
        <Fields.ReimbursementMultiple />
        <Fields.Remark />
        <Fields.SystemCalculationAmount procedurePayableItem={procedurePayableItem} />
        <Fields.ReversalFlag />
        <Fields.ChangeObjectAmount />
      </Section>
    </FormCard>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, procedurePayableItem, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveProcedurePayableItem',
              payload: {
                changedFields,
                id: procedurePayableItem?.id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveProcedurePayableItem',
            payload: {
              changedFields,
              id: procedurePayableItem?.id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { procedurePayableItem }: any = props;

      return formUtils.mapObjectToFields(procedurePayableItem);
    },
  })(ProcedurePayableItem)
);
