import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import BenifitsItemLayout from './BenifitsItemLayout';

export default function SharedBenifitsItem({ shareBenefitList }: any) {
  return (
    <>
      <BenifitsItemLayout>
        <BenifitsItemLayout.Title>
          {formatMessageApi({ Label_BIZ_Claim: 'ShareBeneType' })}
          {formatMessageApi({ Label_BIZ_Claim: 'ShareBeneItem' })}
        </BenifitsItemLayout.Title>
        {lodash.map(lodash.orderBy(shareBenefitList, ['benefitTypeCode', 'benefitItemCode']), (item, key, List) => (
          <BenifitsItemLayout.Item key={key}>
            {List[key - 1]?.benefitTypeCode !== item?.benefitTypeCode ? formatMessageApi({ Dropdown_PRD_BenefitType: item?.benefitTypeCode }) : ''}
            {`${item?.benefitItemCode} ${formatMessageApi({ Dropdown_PRD_BenefitItem: item?.benefitItemCode })}` || ''}
          </BenifitsItemLayout.Item>
        ))}
      </BenifitsItemLayout>
    </>
  );
}
