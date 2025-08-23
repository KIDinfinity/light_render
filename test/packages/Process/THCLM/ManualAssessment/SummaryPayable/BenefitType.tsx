import React, { useEffect, useMemo } from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector, connect, useDispatch } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { subtract } from '@/utils/precisionUtils';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { getDeductPolicy } from 'process/THCLM/ManualAssessment/_models/functions/getDeductPolicy';
import BenefitItem from './BenefitItem';
import { eClaimDecision } from 'claim/enum/claimDecision';
import { mapToBenefitItem } from '../_models/functions/utils';
import Section, { BenefitTypeFields } from './Section';
import styles from './BenefitType.less';

const BenefitType = ({ form, benefitTypeData, expand, existBenefitType }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );

  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );

  const deductPolicy = useMemo(() => {
    return getDeductPolicy(listPolicy, benefitTypeData);
  }, [listPolicy, benefitTypeData]);

  useEffect(() => {
    if (
      deductPolicy === 'N' &&
      lodash.isNumber(formUtils.queryValue(benefitTypeData?.deductibleNetExpense))
    ) {
      dispatch({
        type: `${NAMESPACE}/benefitTypeGroupUpdate`,
        payload: {
          changedFields: {
            deductibleNetExpense: '',
            deductibleOtherInsurerDeduction: '',
          },
          benefitTypeData,
          validating: false,
        },
      });
    }
  }, [deductPolicy, benefitTypeData]);

  const data: any = useMemo(() => {
    const booster = benefitTypeData?.boosters;
    const benefitCategory = benefitTypeData?.benefitCategory;
    const source = formUtils.cleanValidateData(benefitTypeData?.children);
    const adj = lodash.filter(source, (item) => item?.isAdjustment === IsAdjustment.Yes);
    const basic = lodash.filter(source, (item) => item?.isAdjustment !== IsAdjustment.Yes);
    const adjBooster = lodash.filter(booster, (item) => item?.isAdjustment === IsAdjustment.Yes);
    const basicBooster = lodash.filter(booster, (item) => item?.isAdjustment !== IsAdjustment.Yes);
    const adjGroupBy = mapToBenefitItem(adj, benefitCategory, adjBooster);
    const basicGroupBy = mapToBenefitItem(basic, benefitCategory, basicBooster);
    return lodash.chain(basicGroupBy).concat(adjGroupBy).orderBy('benefitItemCode').value();
  }, [benefitTypeData]);

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/benefitTypeGroupDelete`,
      payload: {
        groupBy: benefitTypeData?.groupBy,
        boosters: benefitTypeData?.boosters,
        benefitCategory: benefitTypeData?.benefitCategory,
        isDel: true,
      },
    });
  };
  return (
    <>
      <div className={styles.benefitTypeTest}>
        <FormBorderCard
          button={{
            visiable: editable && !benefitTypeData?.hasCallExternalSystem,
            callback: handleDelete,
          }}
          className={styles.benefitType}
        >
          <Section form={form} editable={editable} section="SummaryPayable">
            <BenefitTypeFields.ClaimDecision
              incidentId={benefitTypeData?.incidentId}
              policyNo={benefitTypeData.policyNo}
              payableId={benefitTypeData?.id}
            />
            <BenefitTypeFields.BenefitTypeCode
              incidentId={benefitTypeData?.incidentId}
              policyNo={benefitTypeData.policyNo}
              existBenefitType={existBenefitType}
            />
            <BenefitTypeFields.ProductCode />
            <BenefitTypeFields.PayableAmount
              originAmount={benefitTypeData?.systemCalculationAmount}
            />
            <BenefitTypeFields.PayableDays originDays={benefitTypeData?.systemPayableDays} />
            <BenefitTypeFields.BooterAmount originAmount={benefitTypeData?.boosterSystemAmount} />
            <BenefitTypeFields.BooterDays originDays={benefitTypeData?.boosterSystemDays} />
            <BenefitTypeFields.BillAmount />
            <BenefitTypeFields.CopayAmount />
            <BenefitTypeFields.UncoverAmount />
            <BenefitTypeFields.AmountBeforeDeductible />
            <BenefitTypeFields.DeductibleAmount benefitTypeData={benefitTypeData} />
            <BenefitTypeFields.DeductibleOtherInsurerDeduction />
          </Section>
        </FormBorderCard>
        {(formUtils.queryValue(benefitTypeData?.claimDecision) !== eClaimDecision.approve ||
          (formUtils.queryValue(benefitTypeData?.claimDecision) === eClaimDecision.approve &&
            benefitTypeData?.policyYear)) && (
          <div className={styles.extraField}>
            <Section form={form} editable={editable} section="SummaryPayable">
              <BenefitTypeFields.Remark />

              <BenefitTypeFields.DenyCode />
              <BenefitTypeFields.DenyReason />
              <BenefitTypeFields.ExGratiaCode />
              <BenefitTypeFields.ExGratiaReason />
              <BenefitTypeFields.PolicyYear />
            </Section>
          </div>
        )}
      </div>
      {lodash.size(data) > 0 &&
        expand &&
        formUtils.queryValue(benefitTypeData?.claimDecision) !== eClaimDecision.deny &&
        formUtils.queryValue(benefitTypeData?.claimDecision) !== eClaimDecision.na && (
          <div className={styles.benefitTypeWeight}>
            <FormBorderCard
              type="weight"
              borderColor={policyBackgrounds?.[benefitTypeData?.policyNo]}
            >
              {lodash.map(data, (item) => (
                <BenefitItem
                  benefitItemData={item}
                  key={`${item?.benefitItemCode}${item?.isAdjustment}`}
                />
              ))}
            </FormBorderCard>
          </div>
        )}
    </>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  validating: formCommonController.validating,
  listPolicy: modelnamepsace.listPolicy,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, benefitTypeData } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'benefitTypeGroupUpdate',
              payload: {
                changedFields,
                benefitTypeData,
                validating,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'benefitTypeGroupUpdate',
            payload: {
              changedFields,
              benefitTypeData,
              validating,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { benefitTypeData, listPolicy } = props;
      return formUtils.mapObjectToFields({
        ...benefitTypeData,
        item: benefitTypeData,
        uncoverAmount:
          benefitTypeData?.benefitCategory === eBenefitCategory.Reimbursement
            ? subtract(
                formUtils.queryValue(benefitTypeData?.calculationAmount),
                formUtils.queryValue(benefitTypeData?.payableAmount)
              )
            : 0,
        deductPolicy: getDeductPolicy(listPolicy, benefitTypeData),
      });
    },
  })(BenefitType)
);
