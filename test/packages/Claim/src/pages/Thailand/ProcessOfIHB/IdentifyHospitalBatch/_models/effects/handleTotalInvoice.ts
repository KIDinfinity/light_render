import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const validateKeys = ['invoiceNo', 'firstName', 'lastName', 'visitDate', 'type', 'amount'];

export default function* handleTotalInvoice(_: any, { put, select }: any) {
  const { invoiceInforData, basicInforData, taskDetail } = yield select((state: any) => ({
    basicInforData: state.IdentifyHospitalBatchController.claimProcessData.basicInforData,
    invoiceInforData: state.IdentifyHospitalBatchController.claimProcessData.invoiceInforData,
    taskDetail: state.processTask.getTask,
  }));
  const invoiceInforLength = lodash.size(invoiceInforData);
  const totalNoOfInvoice = formUtils.queryValue(basicInforData.totalNoOfInvoice);
  const someValueArr = [];
  const removeInvoiceInfoList: any = [];
  const updateTotalInvoiceNo = 1;
  if (lodash.isEmpty(invoiceInforData) || lodash.isEqual(totalNoOfInvoice, invoiceInforLength))
    return;

  if (totalNoOfInvoice > invoiceInforLength) {
    // 清空删除行数时存的submissionIdList
    yield put({
      type: 'saveData',
      payload: {
        discardedSubmissionIdList: [],
      },
    });
    yield put({
      type: 'addInvoiceItem',
      payload: {},
    });
    const updateResponse = yield put.resolve({
      type: 'updateChangeFn',
      payload: { isUpdateTotalInvoiceNo: { updateTotalInvoiceNo }, taskId: taskDetail?.taskId },
    });
    if (updateResponse?.success) {
      yield put({
        type: 'refreshInformation',
        payload: {
          taskId: taskDetail?.taskId,
        },
      });
    }
  } else {
    for (let i = invoiceInforLength - 1, len = totalNoOfInvoice; i >= len; i -= 1) {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      const someOfValInvoiceData = lodash.some(invoiceInforData[i], (item, key) => {
        if (lodash.includes(validateKeys, key)) {
          return !!formUtils.queryValue(item);
        }
      });
      removeInvoiceInfoList.push(invoiceInforData[i]);
      someValueArr.push(someOfValInvoiceData);
    }
    yield put({
      type: 'saveData',
      payload: {
        removeInvoiceInfoList,
      },
    });
    // 判断删除的记录中是否存在至少有一条有值
    const existValueInfo = lodash.some(someValueArr, Boolean);
    if (existValueInfo) {
      yield put({
        type: 'saveData',
        payload: {
          showRemoveInvoiceModal: existValueInfo,
        },
      });
    } else {
      yield put({
        type: 'removeInvoiceItem',
        payload: {},
      });
      const updateResponse = yield put.resolve({
        type: 'updateChangeFn',
        payload: { isUpdateTotalInvoiceNo: { updateTotalInvoiceNo }, taskId: taskDetail?.taskId },
      });
      if (updateResponse?.success) {
        yield put({
          type: 'refreshInformation',
          payload: {
            taskId: taskDetail?.taskId,
          },
        });
      }
    }
  }
}
