import type { FunctionComponent } from 'react';
import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DataLayout from '@/components/DataLayout';
import TextWrap from '../../../_component/TextWrap';
import { formatAmount } from '../../../_functions';

interface IProps {
  benefitItem: any;
}

const BenefitItem: FunctionComponent<IProps> = ({ benefitItem }) => {
  const { referenceCode, hospitalizationFlg, hospitalizationSequentialNo } = benefitItem;

  const hospitalizationText = `${
    hospitalizationFlg
      ? formatMessageApi({ Dropdown_CLM_hospitalizationflg: hospitalizationFlg }) + ' '
      : ''
  }${hospitalizationSequentialNo ? hospitalizationSequentialNo : ''}`;

  return (
    <>
      <DataLayout span={12}>
        <TextWrap.Grey nowrap>
          {formatMessageApi({ Dropdown_PRD_BenefitItem: benefitItem?.benefitItemCode })}
        </TextWrap.Grey>
        <TextWrap.Grey style={{ textAlign: 'right' }}>
          {benefitItem?.payableDays
            ? `${benefitItem.payableDays}${formatMessageApi({
                Label_BIZ_Claim: 'days',
              })} & ${formatAmount(benefitItem?.payableAmount)}`
            : formatAmount(benefitItem?.payableAmount)}
        </TextWrap.Grey>
      </DataLayout>
      <div>
        {!!referenceCode && (
          <TextWrap.White nowrap blackBg>
            {`(${referenceCode} ${formatMessageApi({
              Dropdown_COM_KLIPBeneInfo: referenceCode,
            })})`}
          </TextWrap.White>
        )}
        {!!hospitalizationText && (
          <TextWrap.White nowrap blackBg>
            {hospitalizationText}
          </TextWrap.White>
        )}
      </div>
    </>
  );
};

export default BenefitItem;
