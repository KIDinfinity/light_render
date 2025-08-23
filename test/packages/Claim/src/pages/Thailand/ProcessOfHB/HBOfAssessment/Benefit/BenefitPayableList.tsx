import { formatMessageApi } from '@/utils/dictFormatMessage';
import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import FormLayout from 'basic/components/Form/FormLayout';
import BenefitPayableItem from './BenefitPayableItem';
import { formUtils } from 'basic/components/Form';
import { BenefitPayableItemLayout } from '../FormLayout.json';
import { BENEFITITEMPAYABLEITEM } from '@/utils/claimConstant';
import type { IInvoicePayable, IPolicy } from '@/dtos/claim';
import styles from './BenefitPayableItem.less';

const mapStateToProps = ({ hbOfClaimAssessmentController }: any, { invoicePayableId }: any) => {
  const { claimEntities } = hbOfClaimAssessmentController;
  const benefitItemPayableListMapEntries = Object.entries(claimEntities.benefitItemPayableListMap);

  const payableId = lodash.get(
    hbOfClaimAssessmentController,
    `claimEntities.invoicePayableListMap.${invoicePayableId}.payableId`
  );
  const claimDecision = lodash.get(
    hbOfClaimAssessmentController,
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
    claimNo: hbOfClaimAssessmentController.claimProcessData.claimNo,
    benefitItemCodeAdded,
    claimDecision,
    invoicePayableItem: claimEntities.invoicePayableListMap[invoicePayableId],
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
      type: 'hbOfClaimAssessmentController/addBenefitPayableItem',
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
    } = this.props;

    return (
      <div>
        <div className={styles.benefit_payable_bg}>
          <FormLayout json={BenefitPayableItemLayout}>
            <FormHeader name="benefitItemCode">Benefit Item</FormHeader>
            <FormHeader>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.payable-days',
              })}
            </FormHeader>
            <FormHeader>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.claim.label.bill-amount',
              })}
            </FormHeader>
            <FormHeader>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.claim.label.copay-amount',
              })}
            </FormHeader>
            <FormHeader>
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
              claimDecision={claimDecision}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BenefitPayableList;
