import { useMemo } from 'react';
import lodash from 'lodash';

export default ({ bankChannelList }: any) => {
  return useMemo(() => {
    const bankBranchSet = new Set();
    lodash.map(bankChannelList, (item: any) => {
      bankBranchSet.add({
        dictCode: lodash.get(item, 'bankCode'),
        dictName: lodash.get(item, 'bankName'),
      });
    });
    return (
      lodash.filter(
        Array.from(bankBranchSet),
        (item: any) => !lodash.chain(item).get('dictName').isEmpty().value()
      ) || []
    );
  }, [bankChannelList]);
};
