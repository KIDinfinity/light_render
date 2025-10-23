import React from 'react';
import lodash from 'lodash';
import BenefitType from './BenefitType';
import SharedBenifits from './SharedBenifits';

export default ({ benefitTypeInfoList, shareLimitInfoList }: any) => {
  return (
    <>
      {lodash.map(lodash.orderBy(benefitTypeInfoList, ['benefitTypeCode']), (item) => (
        <BenefitType benefitTypeInfo={item} />
      ))}
      {!lodash.isEmpty(shareLimitInfoList) && (
        <SharedBenifits shareLimitInfoList={shareLimitInfoList} />
      )}
    </>
  );
};
