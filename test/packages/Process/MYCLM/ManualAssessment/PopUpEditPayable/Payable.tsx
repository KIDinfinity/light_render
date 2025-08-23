import React from 'react';
import { NAMESPACE } from '../activity.config';
import lodash from 'lodash';
import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import classNames from 'classnames';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import getPolicyYearValue from 'process/MYCLM/ManualAssessment/_models/functions/getPolicyYearValue';
import Section, { PayableFields } from './Section';
import styles from './index.less';

const Payable = ({ form, item }: any) => {
  const editable = useSelector(({ claimEditable }: any) => !claimEditable.taskNotEditable);
  const isAppeal = useSelector(
    ({ [NAMESPACE]: modelnamespace }) => modelnamespace.claimProcessData?.appeal
  );

  const dispatch = useDispatch();
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );
  const register = item?.benefitCategory !== eBenefitCategory.Reimbursement;

  const claimPayableListItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap[item?.payableId]
  );

  const handleRecover = (fieldName: string) => {
    dispatch({
      type: `${NAMESPACE}/benefitItemRecover`,
      payload: {
        benefitCategory: item?.benefitCategory,
        payableId: item?.id,
        fieldName,
      },
    });
  };

  const isAdjustMent = item?.isAdjustment === IsAdjustment.Yes;
  return (
    <FormBorderCard
      borderColor={
        policyBackgrounds?.[`${item?.policyNo}${getPolicyYearValue(claimPayableListItem)}`]
      }
      type="weight"
      className={classNames(isAdjustMent && styles.isAdjustment, styles.benefitItem)}
    >
      <Section
        form={form}
        editable={editable && (!isAppeal || item.isPayableAdjusted || item.isNewPayable)}
        section="PopUpEditPayable.Payable"
        register={register}
        name="benefitItem"
      >
        <PayableFields.BenefitItemCode />
        <PayableFields.PayableAmount
          OnRecover={() => handleRecover('payableAmount')}
          id={item?.id}
          coverageKey={claimPayableListItem?.coverageKey}
          benefitCategory={claimPayableListItem?.benefitCategory}
        />
        <PayableFields.PayableDays OnRecover={() => handleRecover('payableDays')} />
        <PayableFields.BooterAmount originAmount={item?.boosterCalculationAmount} />
        <PayableFields.BooterDays originDays={item?.boosterSystemPayableDays} />
        <PayableFields.DeductibleAmount
          onRecover={() => handleRecover('deductibleAmount')}
          id={item?.id}
          coverageKey={claimPayableListItem?.coverageKey}
        />
        <PayableFields.DeductibleWaived onRecover={() => handleRecover('deductibleWaived')} />
        <PayableFields.DeductibleOtherInsurerDeduction
          onRecover={() => handleRecover('deductibleOtherInsurerDeduction')}
        />
      </Section>
    </FormBorderCard>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    async onFieldsChange(props: any, changedFields: any) {
      const { dispatch, item, policyBooster } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        const config = () => {
          let options = {};
          switch (item?.benefitCategory) {
            case eBenefitCategory.Reimbursement:
              options = {
                type: 'saveServicePayableItem',
                params: {
                  serviceItemPayableId: item?.id,
                  hasBooster: policyBooster,
                  boosterId: item?.boosterId,
                },
              };
              break;
            case eBenefitCategory.S:
              options = {
                type: 'saveProcedurePayableItem',
                params: {
                  procedurePayableId: item?.id,
                },
              };
              break;

            default:
              options = {
                type: 'saveSummaryTreatmentPayable',
                params: {
                  id: item.id,
                  benefitCategory: item?.benefitCategory,
                },
              };
              break;
          }
          return options;
        };
        const options: any = config();
        if (!lodash.isEmpty(options)) {
          await dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: `${NAMESPACE}/${options?.type}`,
            payload: {
              changedFields,
              ...options?.params,
            },
          });
        }
        await dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePopUpEditItemUpdate',
          payload: {
            changedFields,
            id: item?.id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      const emptyAmount =
        item?.isStandaloneBooster === 'Y'
          ? {
              payableAmount: '',
              payableDays: '',
            }
          : {};
      return formUtils.mapObjectToFields({
        ...item,
        ...emptyAmount,
      });
    },
  })(Payable)
);
