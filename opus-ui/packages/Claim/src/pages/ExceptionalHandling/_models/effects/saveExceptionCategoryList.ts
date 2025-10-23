import { getErrorCodeByCategory } from '@/services/integrationExceptionHandlingControllerService';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export default function* (_: any, { call, put, select }: any) {
  const Dropdown_CFG_ExceptionCategory = getDrowDownList('Dropdown_CFG_ExceptionCategory');

  const { resultData } = yield call(
    getErrorCodeByCategory,
    Dropdown_CFG_ExceptionCategory.map((item) => item?.dictCode).filter((item) => item)
  );

  yield put({
    type: 'saveErrorMapMessage',
    payload: {
      list: resultData,
    },
  });
}
