import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import { some, chain } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EModuleName, EAllowActions, EMemoStatus } from 'bpm/pages/Envoy/enum';
import { safeParseUtil } from '@/utils/utils';

const checkMemoReceived = (reason: any, status: any) => {
  const sortModuleArr = getSortModuleArr(safeParseUtil(reason?.displayConfig));
  const hasMemo = some(
    sortModuleArr,
    (module: any) => module.moduleName === EModuleName.PendingMemo
  );
  if (status === EAllowActions.Resolve && hasMemo) {
    const hasNotReceived = (chain(reason) as any)
      .get('pendingMemoList')
      .some((item: any) => item.memoStatus === EMemoStatus.NOTRECEIVED)
      .value();

    return {
      pendingMemoList_received: hasNotReceived
        ? [formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000404' })]
        : [],
    };
  }

  return {};
};
export default checkMemoReceived;
