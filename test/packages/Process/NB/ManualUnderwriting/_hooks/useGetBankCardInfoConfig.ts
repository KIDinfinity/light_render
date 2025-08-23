import { useMemo } from 'react';
import lodash from 'lodash';

export default ({ config }: any) => {
  return useMemo(() => {
    const bankCardInfoConfigList = [
      'nameOnCard',
      'cardType',
      'factoringHouse',
      'sbcaca',
      'creditCardNumber',
      'maskedNumber',
      'expiryDate',
    ];

    return lodash
      .filter(config, (item: any) =>
        lodash.chain(bankCardInfoConfigList).includes(item?.field).value()
      )
      .map((item: any) => {
        if (item.field === 'expiryDate' && item.section === 'RenewalPaymentInfo-Table') {
          item.format = 'YYYY-MM';
        }
        return item;
      });
  }, [config]);
};
