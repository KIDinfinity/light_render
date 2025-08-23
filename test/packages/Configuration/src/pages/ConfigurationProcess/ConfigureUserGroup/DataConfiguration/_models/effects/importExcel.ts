import { importExcel } from '@/services/ccJpDataControllerService';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getColumns } from 'configuration/pages/NavigatorConfiguration/Utils/getFormatField';
import {
  getErrorMessage,
  hanldeRowData,
} from 'configuration/pages/ConfigurationCenter/Utils/ExcelUtils';
import ErrorCode from 'claim/enum/ErrorCode';
import ErrorType from 'configuration/pages/ConfigurationCenter/Enum/ErrorType';
import { notification } from 'antd';

const checkError = (errorMessage: any[], errorType: string) =>
  lodash.some(errorMessage, (el) => el.type === errorType);

export default function* ({ payload }: any, { call, put, select }: any) {
  const dataFieldList = yield select(
    (state: any) => state.configureUserGroupController?.functionData?.dataFieldList
  );
  const response = yield call(importExcel, payload);

  if (response?.success) {
    const excelData = response?.resultData || [];
    const header = lodash.chain(excelData).head().keys().value();
    const newRowData = hanldeRowData(excelData, dataFieldList);
    const errorMessage = getErrorMessage(header, dataFieldList, newRowData);
    const columns = lodash.map(header, (item: string) => getColumns(item));

    if (checkError(errorMessage, ErrorType.errField)) {
      notification.error({
        message: formatMessageApi({ Label_COM_WarningMessage: ErrorCode.ERR_000245 }),
      });
      return;
    }

    yield put({
      type: 'saveExcelData',
      payload: {
        excelData: {
          errorMessage, // 错误信息
          columns, // 表格头
          rowData: newRowData, // 表数据
        },
      },
    });

    yield put({
      type: 'showExcelModal',
    });
  }
}
