import { centerRequest, retryTriggerPost } from '@/services/monitorCenterControllerService';
import { MonitorItemCode } from '../../enum';
import { filterEmptyValue, monitorParams } from '../../utils';
import { safeParseUtil } from '@/utils/utils';
import lodash from 'lodash';

interface IPagination {
  page: number;
  total: number;
  pageSize: number;
}

export const queryDataList = async ({ page, pageSize }: IPagination, queryParams: any) => {
  const response = await centerRequest(
    ...monitorParams(MonitorItemCode.tools_post_qc_trigger, {
      params: filterEmptyValue(queryParams),
      currentPage: page,
      pageSize,
    })
  );
  const { success, responseData, messageList } = response;
  if (!success || !lodash.isEmpty(responseData.exceptionMsg)) {
    const exceptionMsg = lodash.map(safeParseUtil(responseData.exceptionMsg), (msg) => ({
      code: '000',
      content: msg,
    }));
    return Promise.reject(lodash.concat(messageList || [], exceptionMsg));
  }
  const resultData = await safeParseUtil(responseData?.resultData);
  if (!resultData?.success) {
    return Promise.reject(resultData?.promptMessages);
  }
  return Promise.resolve(resultData?.resultData || []);
};

export const mapListData = (listData: any[]) => {
  return lodash.map(listData, (data, index) => ({ ...data, key: data.id || index }));
};

export const reGenerate = async (list: any[]) => {
  const res = await retryTriggerPost(list);
  if (!res?.success) {
    return Promise.reject();
  }
  return Promise.resolve();
};
