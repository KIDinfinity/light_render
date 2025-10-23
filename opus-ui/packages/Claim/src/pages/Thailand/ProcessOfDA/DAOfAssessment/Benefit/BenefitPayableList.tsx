import { formatMessageApi } from '@/utils/dictFormatMessage';
import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import FormLayout from 'basic/components/Form/FormLayout';
import BenefitPayableItem from './BenefitPayableItem';
import { formUtils } from 'basic/components/Form';
import { BenefitPayableItemLayout } from '../FormLayout.json';
import { BENEFITITEMPAYABLEITEM } from '@/utils/claimConstant';
import type { IInvoicePayable, IPolicy } from '@/dtos/claim';
import styles from './BenefitPayableItem.less';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { ClaimDecision as enumClaimDecision } from '../_models/dto';

const mapStateToProps = (
  { daOfClaimAssessmentController, claimEditable }: any,
  { invoicePayableId }: any
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
}

const { FormHeader } = BenefitPayableItem;

@connect(mapStateToProps)
class BenefitPayableList extends Component<IProps> {
  handleAdd = () => {
    const {
      dispatch,
      incidentId,
      treatmentId,
      invoiceId,
      invoicePayableId,
      invoicePayableItem,
    } = this.props;
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

  render() {
    const {
      curBenefitItemPayableList,
      listPolicy,
      benefitItemCodeAdded,
      invoicePayableItemNextId,
      claimDecision,
      taskNotEditable,
      invoicePayableId,
    } = this.props;
    const claimDecisionValue = formUtils.queryValue(claimDecision);

    return (
      <div>
        <div className={styles.benefit_payable_bg}>
          <div className={styles.table}>
            <FormLayout json={BenefitPayableItemLayout}>
              <FormHeader name="benefitItemCode">Benefit Item</FormHeader>
              <FormHeader>
                {formatMessageApi({
                  Label_BIZ_Claim:
                    'app.navigator.task-detail-of-claim-assessment.label.payable-days',
                })}
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
              <FormHeader>
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.claim.label.override-amount',
                })}
              </FormHeader>
              <FormHeader>
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.claim.label.uncover-amount',
                })}
              </FormHeader>
            </FormLayout>
            {lodash.map(lodash.compact(curBenefitItemPayableList), (item) => (
              <BenefitPayableItem
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
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BPM_Button: 'app.claim.button.benefit-payable',
            })}
          />
        )}
      </div>
    );
  }
}

export default BenefitPayableList;
