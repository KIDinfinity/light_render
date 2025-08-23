import React, { useMemo } from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import CalculateByPolicyYear from 'basic/enum/CalculateByPolicyYear';
import { connect, useSelector, useDispatch } from 'dva';
import Button from './Button';
import Section, { PayableFields as Fields } from '../Section';
import styles from './Adjustment/index.less';

const TreatmentPayableListItem = ({
  form,
  claimPayable,
  treatmentPayable,
  treatmentPayableItemId,
  curTreatmentPayableList,
  treatmentId,
  incidentId,
  isAdjustment,
}: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const listPolicy = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.listPolicy
  );
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );

  const { calculateByPolicyYear } = claimPayable;

  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/removeTreatmentPayableItem',
      payload: {
        claimPayableItemId: treatmentPayable.payableId,
        treatmentPayableItemId,
      },
    });
  };
  const policyNo = form.getFieldValue('policyNo');
  const productCode = form.getFieldValue('productCode');
  const benefitTypeCode = form.getFieldValue('benefitTypeCode');
  const policyYear = form.getFieldValue('policyYear');

  const policyNoList = useMemo(() => {
    const fn = (target: any) => {
      const {
        policyNo,
        coreProductCode,
        benefitTypeCode,
        benefitCategory,
        policyYear,
      }: any = lodash.pick(formUtils.cleanValidateData(target), [
        'policyNo',
        'coreProductCode',
        'benefitTypeCode',
        'benefitCategory',
        'policyYear',
      ]);
      const filterTarget = `${policyNo}${coreProductCode}${benefitTypeCode}${benefitCategory}`;
      const filterTargetWithpolicyYear =
        calculateByPolicyYear === CalculateByPolicyYear.F ||
        calculateByPolicyYear === CalculateByPolicyYear.Y
          ? `${filterTarget}${policyYear}`
          : filterTarget;
      return filterTargetWithpolicyYear;
    };

    const policyList = lodash.filter(
      listPolicy,
      (item) =>
        fn(item) ===
        fn({
          policyNo,
          coreProductCode: productCode,
          benefitTypeCode,
          benefitCategory: claimPayable.benefitCategory,
          policyYear,
        })
    );

    return policyList;
  }, [listPolicy, policyNo, productCode, benefitTypeCode]);

  return (
    <CardOfClaim
      className="TreatmentPayableItem"
      showButton={!!editable}
      extraButton={
        <Button
          treatmentId={treatmentId}
          incidentId={incidentId}
          treatmentPayableId={treatmentPayable.id}
        />
      }
      handleClick={handleDelete}
      cardStyle={
        policyBackgrounds && form.getFieldValue('policyNo')
          ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
          : {}
      }
    >
      {isAdjustment && (
        <>
          <span className={styles.flag} />
          <span className={styles.flagTitle}> 調整 </span>
        </>
      )}
      <Section form={form} editable={editable} section="Treatment.Payable">
        <Fields.AssessorOverrideAmount treatmentPayableItem={treatmentPayable} />
        <Fields.AssessorOverrideDays treatmentPayableItem={treatmentPayable} />
        <Fields.BenefitItemCode
          policyNoList={policyNoList}
          curTreatmentPayableList={curTreatmentPayableList}
          treatmentPayableItem={treatmentPayable}
          calculateByPolicyYear={calculateByPolicyYear}
        />
        <Fields.BenefitTypeCode policyNoList={policyNoList} />
        <Fields.PayableDays />
        <Fields.PolicyNo policyNoList={policyNoList} />
        <Fields.ProductCode policyNoList={policyNoList} />
        <Fields.Remark />
        <Fields.SystemCalculationAmount treatmentPayableItem={treatmentPayable} />
        <Fields.PolicyYear
          calculateByPolicyYear={calculateByPolicyYear}
          curTreatmentPayableList={curTreatmentPayableList}
          treatmentPayableItem={treatmentPayable}
        />
        <Fields.HospitalizationFlg />
        <Fields.HospitalizationSequentialNo />
        <Fields.DiagnosisCode />
      </Section>
    </CardOfClaim>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields) {
      const { dispatch, treatmentPayableItemId, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveTreatmentPayableItem',
              payload: {
                changedFields,
                treatmentPayableItemId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveTreatmentPayableItem',
            payload: {
              changedFields,
              treatmentPayableItemId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { treatmentPayable, claimPayable } = props;
      const { claimDecision, claimType, benefitCategory } = claimPayable || {};

      return formUtils.mapObjectToFields({
        ...treatmentPayable,
        claimDecision,
        benefitCategory,
        claimType,
        policyYear: formUtils.queryValue(claimPayable.policyYear),
      });
    },
  })(TreatmentPayableListItem)
);
