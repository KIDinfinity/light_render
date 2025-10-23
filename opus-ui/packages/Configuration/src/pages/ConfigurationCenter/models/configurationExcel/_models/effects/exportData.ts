import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { handlerSearchParams } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import { FuncHistoryCode } from 'configuration/pages/ConfigurationCenter/Utils/Constant';
import {
  exportData,
} from '@/services/ccBusinessDataControllerService';

export default function* ({ payload }: PayProps, { call }: SagaProps) {
  const {
    searchParams,
    currentMenu: { id: functionId, functionCode },
    functionData,
  } = payload;

  let Options = searchParams;
  if (functionCode === FuncHistoryCode) {
    const { orderConditions = [], ...res } = handlerSearchParams(
      searchParams,
      functionData,
      true
    );
    const newOrder = orderConditions.concat([
      {
        fieldName: 'batch_no',
        orderType: 'asc',
      },
      {
        fieldName: 'sequence',
        orderType: 'asc',
      },
    ]);
    Options = {
      ...res,
      orderConditions: newOrder,
    };
  }

  const response = yield call(exportData, {
    functionId,
    ...Options,
  });
  return response;
}
