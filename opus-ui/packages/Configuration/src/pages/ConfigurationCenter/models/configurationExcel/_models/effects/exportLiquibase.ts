import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { handlerSearchParams } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import { FuncHistoryCode } from 'configuration/pages/ConfigurationCenter/Utils/Constant';
import { isEmpty, toLower, chain } from 'lodash';
import {
  downloadByData,
  downloadByQueryPage,
} from '@/services/ccLiquibaseDownloadControllerService';
import { showErrors } from 'configuration/pages/ConfigurationCenter/Utils/Common';
import { notification } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';


export default function* ({ payload }: PayProps, { put,call, select }: SagaProps) {
  const { context,lineNumber,type } = payload;
  const { searchParams, currentMenu, functionData, rows } = yield select((state: any) => ({
    searchParams: state.configurationCenter.searchParams,
    currentMenu: state.configurationMenu.currentMenu,
    functionData: state.configurationCenter.functionData,
    rows: state.configurationExcel.rows,
  }));
  const { id: functionId, functionCode } = currentMenu;
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

  const newContext = chain(context)
    .map((item: string) => toLower(item))
    .join(',')
    .value();
  const response = !isEmpty(rows)
    ? yield call(downloadByData, {
        context: newContext,
        data: rows,
        functionCode,
        functionId,
        lineNumber,
        type
      })
    : yield call(downloadByQueryPage, {
        context: newContext,
        lineNumber,
        type,
        ...Options,
      });

  if (response && !response?.success && response?.promptMessages) {
    showErrors(response?.promptMessages);
    return;
  }
  yield put({
    type: 'configurationExcel/hideLiquibaseModal',
  });
  notification.success({
    message: formatMessageApi({
      Label_COM_WarningMessage: 'configurationcenter.message.exportLiquibase.success',
    }),
  });
}
