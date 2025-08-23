import React, { useMemo } from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import CalculateByPolicyYear from 'basic/enum/CalculateByPolicyYear';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import Section, { OutpatientPayableFields as Fields } from '../../Section';
import OutpatientList from './List';

const OutpatientPayableItem = ({
  form,
  treatmentPayableItemId,
  curTreatmentPayableList,
  treatmentId,
  incidentId,
}: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const listPolicy = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.listPolicy
  );
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );

  const treatmentPayableItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment?.claimEntities?.treatmentPayableListMap?.[treatmentPayableItemId]
  );
  const claimPayableItem =
    useSelector(
      ({ JPCLMOfClaimAssessment }: any) =>
        JPCLMOfClaimAssessment?.claimEntities?.claimPayableListMap?.[
          treatmentPayableItem?.payableId
        ]
    ) || {};

  const incidentItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities?.incidentListMap?.[incidentId]
  );

  const treatmentListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.claimEntities?.treatmentListMap
  );

  const layoutName = 'treatment-no-invoice-layout';

  const { benefitCategory, calculateByPolicyYear } = claimPayableItem;

  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/removeTreatmentPayableItem',
      payload: {
        claimPayableItemId: treatmentPayableItem.payableId,
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
          benefitCategory: eBenefitCategory.Cashless,
          policyYear,
        })
    );

    return policyList;
  }, [listPolicy, policyNo, productCode, benefitTypeCode]);
  const benefitCategoryIsCashBenefit = benefitCategory === 'C';

  const cardStyle =
    policyBackgrounds && form.getFieldValue('policyNo')
      ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
      : {};

  return (
    <CardOfClaim
      className="TreatmentPayableItem"
      showButton={!!editable}
      handleClick={handleDelete}
      cardStyle={cardStyle}
    >
      <Section
        form={form}
        editable={editable}
        layoutName={layoutName}
        section="Treatment.OutPatientPayable"
      >
        <Fields.PolicyNo policyNoList={policyNoList} />
        <Fields.ProductCode policyNoList={policyNoList} />
        <Fields.BenefitItemCode
          policyNoList={policyNoList}
          benefitCategoryIsCashBenefit={benefitCategoryIsCashBenefit}
          curTreatmentPayableList={curTreatmentPayableList}
          treatmentPayableItem={treatmentPayableItem}
          calculateByPolicyYear={calculateByPolicyYear}
        />
        <Fields.BenefitTypeCode policyNoList={policyNoList} />
        <Fields.PayableDays benefitCategoryIsCashBenefit={benefitCategoryIsCashBenefit} />
        <Fields.PayableAmount />
      </Section>
      <OutpatientList
        incidentId={incidentId}
        layoutName={layoutName}
        treatmentId={treatmentId}
        treatmentPayableItemId={treatmentPayableItemId}
        curTreatmentPayableList={curTreatmentPayableList}
        cardStyle={cardStyle}
      />
    </CardOfClaim>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfClaimAssessment }: any, { treatmentPayableItemId }: any) => ({
    validating: formCommonController.validating,
    treatmentPayableItem:
      JPCLMOfClaimAssessment?.claimEntities?.treatmentPayableListMap?.[treatmentPayableItemId],
  })
)(
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
      const { treatmentPayableItem, policyYear } = props;
      return formUtils.mapObjectToFields({ ...treatmentPayableItem, policyYear });
    },
  })(OutpatientPayableItem)
);
