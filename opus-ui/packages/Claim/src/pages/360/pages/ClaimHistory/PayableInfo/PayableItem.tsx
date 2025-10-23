import type { FunctionComponent } from 'react';
import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';
import DataLayout from '@/components/DataLayout';
import { formatCurrency } from '../../../_functions';
import ProductList from './ProductList';
import TextWrap from '../../../_component/TextWrap';
import { ReferenceModel } from 'claim/pages/360/enum';
import styles from './style.less';
import useGetReferenceModel from 'claim/components/ReferenceModelProvider/hooks/useGetReferenceModel';

interface IProps {
  payableItem: any;
}

const PayableItem: FunctionComponent<IProps> = ({ payableItem }) => {
  const policyPaymentDecision = payableItem?.policyPaymentDecision
    ? `${payableItem?.policyPaymentDecision} - ${formatMessageApi({
        paymentAcceptedResult: payableItem?.policyPaymentDecision,
      })}`
    : '';
  const decisionVal = tenant.region({
    [Region.JP]: policyPaymentDecision,
  });
  const referenceModel = useGetReferenceModel();
  const isSummaryPageModel = referenceModel === ReferenceModel.SummaryPage;

  return (
    <div className={styles.payableItem}>
      <DataLayout span={12}>
        {isSummaryPageModel ? (
          <TextWrap.White>
            {formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.policyNo' })}
            {payableItem?.policyId}
          </TextWrap.White>
        ) : (
          <TextWrap.Grey>
            {formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.policyNo' })}
          </TextWrap.Grey>
        )}

        <TextWrap.White style={{ textAlign: 'right' }}>
          {lodash.isNumber(payableItem?.sumPayableAmount) &&
            formatCurrency({
              currency: payableItem?.policyCurrency,
              value: payableItem?.sumPayableAmount,
            })}
        </TextWrap.White>
      </DataLayout>
      <DataLayout span={24}>
        <TextWrap.White>
          {!isSummaryPageModel && payableItem?.policyId}
          {decisionVal && (
            <TextWrap.Grey style={{ marginLeft: '8px' }} hasBorder>
              {decisionVal}
            </TextWrap.Grey>
          )}
        </TextWrap.White>
      </DataLayout>
      <DataLayout span={24}>
        <TextWrap.White>
          {formatMessageApi({ Dropdown_PRD_Product: payableItem?.mainProductCode })}
        </TextWrap.White>
      </DataLayout>
      <ProductList productList={payableItem?.productPayableList} />
    </div>
  );
};

export default PayableItem;
