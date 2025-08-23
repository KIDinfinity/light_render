import { useDispatch, useSelector } from 'dva';
import { useMemo } from 'react';
import lodash from 'lodash';

enum PrintDestinationSelected {
  // MS = 'manualStatement',
  RDA = 'returnToAgent',
  RDC = 'returnToClient',
}

enum disabledMap {
  RDA = 'RDC',
  RDC = 'RDA',
}

export default ({ payeeItem }: any) => {
  const dispatch = useDispatch();
  const Label_CLM_printingDestination = useSelector(
    ({ dictionaryController }: any) => dictionaryController.Label_CLM_printingDestination
  );
  return useMemo(() => {
    const disabledSet = new Set();
    lodash.forEach(Label_CLM_printingDestination, (item: any) => {
      if (lodash.get(payeeItem, PrintDestinationSelected[item.dictCode]) === 'Y') {
        disabledSet.add(disabledMap[item.dictCode]);
      }
    });
    const printDestinationSelectedDicts = lodash.map(Label_CLM_printingDestination, (item) => {
      return {
        ...item,
        disabled: disabledSet.has(item.dictCode),
      };
    });
    dispatch({
      type: 'paymentAllocation/setPrintDestinationSelectedDicts',
      payload: {
        printDestinationSelectedDicts: printDestinationSelectedDicts,
      },
    });
    return printDestinationSelectedDicts || [];
  }, [payeeItem, Label_CLM_printingDestination]);
};
