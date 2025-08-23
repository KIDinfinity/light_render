import { formatMessageApi, formatMessageEnhanced } from '@/utils/dictFormatMessage';
import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import FormLayout from 'basic/components/Form/FormLayout';
import BenefitPayableItem from './BenefitPayableItem';
import { formUtils } from 'basic/components/Form';
import { BenefitPayableItemLayout, SimpleDiseaseLayout } from '../FormLayout.json';
import { BENEFITITEMPAYABLEITEM } from '@/utils/claimConstant';
import type { IInvoicePayable, IPolicy } from '@/dtos/claim';
import styles from './BenefitPayableItem.less';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { ClaimDecision as enumClaimDecision } from '../_models/dto';
import classNames from 'classnames';
import ErrorTip from '@/components/ErrorTooltip/ErrorTip';

const mapStateToProps = (
  { daOfClaimAssessmentController, claimEditable }: any,
  { invoicePayableId, incidentId }: any
) => {
  const { claimEntities } = daOfClaimAssessmentController;
  const benefitItemPayableListMapEntries = Object.entries(claimEntities.benefitItemPayableListMap);

  const payableId = lodash.get(
    daOfClaimAssessmentController,
    `claimEntities.invoicePayableListMap.${invoicePayableId}.payableId`
  );
  const claimDecision = lodash.get(
    daOfClaimAssessmentController,
    `claimEntities.claimPayableListMap.${payableId}.claimDecision`
  );
  const simpleDiseaseFlag =
    lodash.get(daOfClaimAssessmentController, 'claimProcessData.simpleDiseaseFlag') || false;
  const fwaRuleFlag =
    lodash.get(daOfClaimAssessmentController, 'claimProcessData.fwaRuleFlag') || 0;

  const benefitItemPayableList: string[] = [];
  const benefitItemCodeAdded: string[] = [];
  lodash.forEach(benefitItemPayableListMapEntries, (item: any) => {
    if (item[1].invoicePayableId === invoicePayableId) {
      benefitItemPayableList.push(item[0]);
      benefitItemCodeAdded.push(formUtils.queryValue(item[1].benefitItemCode));
    }
  });

  return {
    curBenefitItemPayableList: benefitItemPayableList,
    claimNo: daOfClaimAssessmentController.claimProcessData.claimNo,
    benefitItemCodeAdded,
    claimDecision,
    invoicePayableItem: claimEntities.invoicePayableListMap[invoicePayableId],
    taskNotEditable: claimEditable.taskNotEditable,
    simpleDiseaseFlag,
    benefitItemPayableListMap: claimEntities.benefitItemPayableListMap,
    fwaRuleFlag,
    caseCategory: daOfClaimAssessmentController.claimProcessData?.caseCategory,
  };
};

interface IProps {
  curBenefitItemPayableList: string[];
  benefitItemCodeAdded: string[];
  dispatch: Dispatch<any>;
  incidentId: string;
  treatmentId: string;
  invoiceId: string;
  invoicePayableId: string;
  invoicePayableItemNextId: string;
  listPolicy: IPolicy[];
  invoicePayableItem: IInvoicePayable;
  claimDecision: string;
  simpleDiseaseFlag: boolean;
}

const { FormHeader } = BenefitPayableItem;

const BenefitPayableList = (props: IProps) => {
  const handleAdd = () => {
    const { dispatch, incidentId, treatmentId, invoiceId, invoicePayableId, invoicePayableItem } =
      props;
    const { policyNo, productCode, benefitTypeCode } = invoicePayableItem;
    dispatch({
      type: 'daOfClaimAssessmentController/addBenefitPayableItem',
      payload: {
        addBenefitPayableItem: {
          ...BENEFITITEMPAYABLEITEM,
          id: uuidv4(),
          incidentId,
          treatmentId,
          invoiceId,
          invoicePayableId,
          policyNo,
          productCode,
          benefitTypeCode,
          manualAdd: SwitchEnum.YES,
          isAdd: true,
          payableId: invoicePayableItem.payableId,
        },
      },
    });
  };
  const {
    curBenefitItemPayableList,
    listPolicy,
    benefitItemCodeAdded,
    invoicePayableItemNextId,
    claimDecision,
    taskNotEditable,
    invoicePayableId,
    simpleDiseaseFlag,
    benefitItemPayableListMap,
    dispatch,
    fwaRuleFlag,
  } = props;
  const [simpleDiseasePayableDaysError, setSimpleDiseasePayableDaysError] = useState<any[]>([]);

  const claimDecisionValue = formUtils.queryValue(claimDecision);

  const showSavingAmount = simpleDiseaseFlag || fwaRuleFlag === 1;

  useEffect(() => {
    const fetchErrors = async () => {
      const errors = await dispatch({
        type: 'daOfClaimAssessmentController/getSimpleDiseasePayableDaysError',
      });
      setSimpleDiseasePayableDaysError(errors);
    };

    fetchErrors();
  }, [benefitItemPayableListMap, showSavingAmount, dispatch]);

  return (
    <div>
      <div className={styles.benefit_payable_bg}>
        <div className={classNames({ [styles.simpleDiseaseTable]: showSavingAmount })}>
          <FormLayout json={!!showSavingAmount ? SimpleDiseaseLayout : BenefitPayableItemLayout}>
            <FormHeader name="benefitItemCode">Benefit Item</FormHeader>
            <FormHeader name="payableDays">
              <div>
                {formatMessageApi({
                  Label_BIZ_Claim:
                    'app.navigator.task-detail-of-claim-assessment.label.payable-days',
                })}
                {!lodash.isEmpty(simpleDiseasePayableDaysError) && (
                  <ErrorTip
                    className={styles.errorTip}
                    noForm={true}
                    title={formatMessageEnhanced(
                      { Label_COM_WarningMessage: 'MSG_001262' },
                      simpleDiseasePayableDaysError.map((item) => item).join(', ')
                    )}
                  />
                )}
              </div>
            </FormHeader>
            <FormHeader name="calculationAmount">
              {formatMessageApi({
                Label_BIZ_Claim: 'app.claim.label.bill-amount',
              })}
            </FormHeader>
            <FormHeader name="insurerCoInsuranceAmount">
              {formatMessageApi({
                Label_BIZ_Claim: 'app.claim.label.copay-amount',
              })}
            </FormHeader>
            <FormHeader name="systemCalculationAmount">
              {formatMessageApi({
                Label_BIZ_Claim: 'app.claim.label.calculation-amount',
              })}
            </FormHeader>
            <FormHeader name="assessorOverrideAmount">
              {formatMessageApi({
                Label_BIZ_Claim: 'app.claim.label.override-amount',
              })}
            </FormHeader>
            <FormHeader name="uncoverAmount">
              {formatMessageApi({
                Label_BIZ_Claim: 'app.claim.label.uncover-amount',
              })}
            </FormHeader>
            {showSavingAmount && (
              <FormHeader name="savingAmount">
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.claim.label.save-amount',
                })}
              </FormHeader>
            )}
          </FormLayout>
          {lodash.map(lodash.compact(curBenefitItemPayableList), (item) => (
            <BenefitPayableItem
              showSavingAmount={showSavingAmount}
              benefitPayableItemId={item}
              invoicePayableItemNextId={invoicePayableItemNextId}
              listPolicy={listPolicy}
              benefitItemCodeAdded={benefitItemCodeAdded}
              key={item}
              claimDecision={claimDecisionValue}
              invoicePayableId={invoicePayableId}
            />
          ))}
        </div>
      </div>
      {!taskNotEditable && claimDecisionValue !== enumClaimDecision.deny && (
        <ButtonOfClaim
          handleClick={handleAdd}
          buttonText={formatMessageApi({
            Label_BPM_Button: 'app.claim.button.benefit-payable',
          })}
        />
      )}
    </div>
  );
};

export default connect(mapStateToProps)(BenefitPayableList);
