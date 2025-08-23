import React, { useState, useMemo, useEffect } from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import CalculateByPolicyYear from 'basic/enum/CalculateByPolicyYear';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import Section, { AdjPayableFields as Fields } from '../../Section';
import ShowHideButton from 'basic/components/Form/FormLayout/ShowHideButton';
import List from './List';
import styles from './index.less';

const Adjustment = ({ form, treatmentPayableItem, curTreatmentPayableList }: any) => {
  const dispatch = useDispatch();

  const { id: treatmentPayableItemId, treatmentId, incidentId } = treatmentPayableItem || {};

  const [expand, setExpand] = useState(false);
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const listPolicy = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.listPolicy
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

  useEffect(() => {
    dispatch({
      type: 'formCommonController/addPayableItemBGColor',
      payload: { policyNo: formUtils.queryValue(treatmentPayableItem.policyNo) },
    });
  }, [treatmentPayableItem.policyNo]);

  return (
    <CardOfClaim showButton={!!editable} handleClick={handleDelete}>
      <span className={styles.flag} />
      <span className={styles.flagTitle}> 調整 </span>
      <Section
        form={form}
        editable={editable}
        layoutName={layoutName}
        section="Treatment.AdjPayable"
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
        <Fields.ChangeObjectAmount />
      </Section>
      <div className={styles.expand}>
        <ShowHideButton
          show={expand}
          onChange={() => {
            setExpand(!expand);
          }}
        />
      </div>
      <List
        treatmentPayableItem={treatmentPayableItem}
        incidentId={incidentId}
        treatmentId={treatmentId}
        treatmentPayableItemId={treatmentPayableItemId}
        expand={expand}
      />
    </CardOfClaim>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields) {
      const { dispatch, treatmentPayableItem, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveTreatmentPayableItem',
              payload: {
                changedFields,
                treatmentPayableItemId: treatmentPayableItem?.id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveTreatmentPayableItem',
            payload: {
              changedFields,
              treatmentPayableItemId: treatmentPayableItem?.id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { treatmentPayableItem, policyYear } = props;
      return formUtils.mapObjectToFields({ ...treatmentPayableItem, policyYear });
    },
  })(Adjustment)
);
