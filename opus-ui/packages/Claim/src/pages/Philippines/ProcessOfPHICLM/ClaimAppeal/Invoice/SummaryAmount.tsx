import React from 'react';
import { connect } from 'dva';
import SummaryPayableAmount from 'claim/components/SummaryPayableAmount';
import {
  calculatPayableAmountInvoiceLevel,
  calculatClaimAdjustmentInvoiceLevel,
} from 'claim/pages/utils/calculatPayableAmount';
import { withContextData } from '@/components/_store';

const SummaryAmount = ({
  totalPayableAmount,
  percentValue,
  totalClaimAdjustment,
  percentValueAdjustment,
}: any) => {
  const summaryParams = {
    totalPayableAmount,
    percentValue,
    totalClaimAdjustment,
    percentValueAdjustment,
  };

  return <SummaryPayableAmount params={summaryParams} />;
};

export default withContextData(
  connect(({ PHCLMOfAppealCaseController }: any, { invoiceId, withData: { caseType } }: any) => {
    const { claimEntities } = caseType
      ? PHCLMOfAppealCaseController[caseType]
      : PHCLMOfAppealCaseController;

    const totalPayableAmount = calculatPayableAmountInvoiceLevel(claimEntities, invoiceId);
    const totalClaimAdjustment = calculatClaimAdjustmentInvoiceLevel(claimEntities, invoiceId);
    const percentValue = totalPayableAmount > 0 ? 100 : 0;
    const percentValueAdjustment = totalClaimAdjustment > 0 ? 100 : 0;

    return {
      totalPayableAmount,
      percentValue,
      totalClaimAdjustment,
      percentValueAdjustment,
    };
  })(SummaryAmount)
);
