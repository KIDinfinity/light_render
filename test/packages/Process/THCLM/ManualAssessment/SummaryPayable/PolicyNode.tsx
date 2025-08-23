import React from 'react';
import PolicyComponent from './PolicyComponent';
import { SectionColumns } from './Section';

const PolicyNode = ({ children, policyNo, policyCurrency, showPolicy = true }: any) => (
  <>
    <SectionColumns
      showArrow={false}
      render={{
        claimDecision: {
          render: () =>
            showPolicy && <PolicyComponent policyNo={policyNo} policyCurrency={policyCurrency} />,
          'x-layout': {
            //  TODO: 动态layout
            // 480px
            xs: {
              span: 10,
              offset: 0,
              pull: 0,
              order: 1,
            },
            // 576px
            sm: {
              span: 10,
              offset: 0,
              pull: 0,
              order: 1,
            },
            // 768px
            md: {
              span: 10,
              offset: 0,
              pull: 0,
              order: 1,
            },
            // 992px
            lg: {
              span: 10,
              offset: 0,
              pull: 0,
              order: 1,
            },
            // 1000px
            xl: {
              span: 10,
              offset: 0,
              pull: 0,
              order: 1,
            },
            // 1600px
            xxl: {
              span: 10,
              offset: 0,
              pull: 0,
              order: 1,
            },
          },
        },
        benefitTypeCode: {
          visible: 'N',
        },
        boosterAmount: {
          visible: 'N',
        },
        boosterDays: {
          visible: 'N',
        },
        productCode: {
          visible: 'N',
        },
        billAmount: {
          visible: 'Y',
        },
        copayAmount: {
          visible: 'Y',
        },
        uncoverAmount: {
          visible: 'Y',
        },
        insurerCoInsuranceAmount: {
          visible: 'Y',
        },
        calculationAmount: {
          visible: 'Y',
        },
        policyYear: {
          visible: 'N',
        },
        remark: {
          visible: 'N',
        },
        deductibleNetExpense: {
          visible: 'N',
        },
        deductibleOtherInsurerDeduction: {
          visible: 'N',
        },
        amountBeforeDeductible: {
          visible: 'N',
        },
        assessorOverrideDeductibleNetExpense: {
          visible: 'N',
        },
        payableAmountBeforeDeductible: {
          visible: 'N',
        },
      }}
    />
    {children}
  </>
);
export default PolicyNode;
