import {
  addOnlineCheckList,
  updateOnlineCheckList,
  deleteOnlineCheck,
  backupFromOnlineData,
  backupFromExcelData,
} from '@/services/ccInspectionControllerService';
import { OPERATION_TYPE } from 'sql/enum';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* ({ payload }: any, { call, put }: any): any {
  const { type, data } = payload;
  let services = addOnlineCheckList;
  let formData = data;
  switch (type) {
    case OPERATION_TYPE.ADD: {
      services = addOnlineCheckList;
      break;
    }
    case OPERATION_TYPE.UPDATE: {
      services = updateOnlineCheckList;
      break;
    }
    case OPERATION_TYPE.DELETE: {
      services = deleteOnlineCheck;
      formData = formData.map((item) => ({ id: item.id }));
      break;
    }
    case OPERATION_TYPE.BACKUP: {
      services = backupFromOnlineData;
      break;
    }
    case OPERATION_TYPE.UPLOAD: {
      services = backupFromExcelData;
      formData = objectToFormData({
        ...data,
        file: data.file,
      });
      break;
    }
  }
  const response = yield call(services, formData);

  if (response && response.success) {
    if ([OPERATION_TYPE.ADD, OPERATION_TYPE.UPDATE, OPERATION_TYPE.DELETE].includes(type)) {
      yield put({ type: 'checkSearch' });
    }
    yield put({ type: 'checkSetSelectedRow', payload: { list: [] } });
  }
  return response && response.success;
}
